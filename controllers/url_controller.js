const shortId = require("shortid");
const urlModel = require("../models/urls.js");
const { getUser } = require("../services/authentication");
const discordToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJEaXNjb3JkIiwiZW1haWwiOiJkaXNjb3JkQGRpc2NvcmQuY29tIiwicGFzc3dvcmQiOiJkaXNjb3JkIiwicm9sZSI6IkFkbWluIiwiX2lkIjoiNjU4ZDc0YWM0ZmYzMzgxMTM4NjE2MzJjIiwiY3JlYXRlZEF0IjoiMjAyMy0xMi0yOFQxMzoxNDoyMC4zNDhaIiwidXBkYXRlZEF0IjoiMjAyMy0xMi0yOFQxMzoxNDoyMC4zNDhaIiwiX192IjowfSwiaWF0IjoxNzAzNzY5MjYwfQ.OS0N9srXqUxNP8NOivUd39w2FhUu5SGIbtv87YRu3UE";
async function urlShortner(redirectUrl, user) {
  const uid = shortId();
  try {
    const searchResult = await urlModel.findOne({
      redirectUrl: redirectUrl,
    });
    if (searchResult) {
      return { response: searchResult.shortId };
    } else {
      await urlModel.create({
        shortId: uid,
        redirectUrl: redirectUrl,
        generatedBy: user,
      });
      return { response: uid };
    }
  } catch (error) {
    return { error };
  }
}
async function handlerUrlDiscord(redirectUrl) {
  const user = getUser(discordToken);
  const { response, error } = await urlShortner(redirectUrl, user.user);

  if (response) {
    return `http://127.0.0.1:8000/${response}`;
  }
  return error;
}

async function handlerUrlShortener(req, res) {
  if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
    return res.status(400).json({ message: "Bad Request, URL is required" });
  }
  const { response, error } = await urlShortner(req.body.redirectUrl, req.user);

  if (response) {
    return res.status(201).json({
      message: "Url created sucessfully",
      shortUrl: `http://127.0.0.1:8000/${response}`,
    });
  }
  return res.status(500).send({ message: "Url did not created", error: error });
}

async function handlerUrlShortenerHTML(req, res) {
  if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
    return res.status(400).json({ message: "Bad Request, URL is required" });
  }

  const { response, error } = await urlShortner(req.body.redirectUrl, req.user);

  if (response) {
    return res.render("home", {
      response: `http://127.0.0.1:8000/${response}`,
    });
  } else {
    return res.render("home", { response: "Failed to shorten URL" });
  }
}

async function handlerRedirect(req, res) {
  console.log("short id :" + req.params.shortId);
  try {
    const response = await urlModel.findOneAndUpdate(
      {
        shortId: req.params.shortId,
      },
      {
        $push: {
          visitHistory: { timestamps: Date.now() },
        },
      }
    );
    if (response) {
      let redirectUrl = response.redirectUrl.trim();

      if (redirectUrl.startsWith("http")) {
        return res.redirect(redirectUrl);
      } else {
        redirectUrl = "https://" + redirectUrl;
        console.log("redirectUrl:" + redirectUrl);
        return res.redirect(redirectUrl);
        return res.json({ messgae: "da" });
      }
    }
  } catch (error) {
    return res
      .status(500)
      .send({ message: "failed to redirect", error: error });
  }
}
async function handlerGetUrls(req, res) {
  const result = await urlModel
    .find({ generatedBy: req.user })
    .then((result) => {
      return res.json(result);
    })
    .catch((error) => {
      // const message = error.;
      return res
        .status(500)
        .send({ message: "failed to get data", error: error });
    });
  // return res.json({ message: "sucess" });
}
async function handlerAnalytics(req, res) {
  const result = await urlModel
    .findOne({ shortId: req.params.shortId })
    .then((result) => {
      return res.json({
        totalVisits: result.visitHistory.length,
        visitsHistory: result.visitHistory,
      });
    })
    .catch((error) => {
      // const message = error.;
      return res
        .status(500)
        .send({ message: "failed to get data", error: error });
    });
  // return res.json({ message: "sucess" });
}
module.exports = {
  handlerUrlShortener,
  handlerRedirect,
  handlerGetUrls,
  handlerAnalytics,
  handlerUrlShortenerHTML,
  handlerUrlDiscord,
};
