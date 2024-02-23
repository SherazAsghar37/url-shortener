//session

// const userModel = require("../models/user.js");
// const { setUser, getUser, removeUser } = require("../services/authentication");
// const { v4: uuidv4 } = require("uuid");

// async function handlerUserSignup(req, res) {
//   const body = req.body;

//   try {
//     const signUp = await userModel.create({
//       name: body.name,
//       email: body.email,
//       password: body.password,
//     });
//     const sessionId = uuidv4();
//     setUser(sessionId, signUp);
//     res.cookie("sessionId", sessionId, {
//       httpOnly: true,
//       maxAge: 1000 * 60 * 60 * 24,
//     });
//     return res.redirect("/");
//   } catch (error) {
//     return res.render("signup", {
//       response: `Unable to create user\nError : ${error}`,
//     });
//   }
// }

// async function handlerUserLogin(req, res) {
//   const body = req.body;
//   try {
//     const login = await userModel.findOne({
//       email: body.email,
//       password: body.password,
//     });
//     if (login) {
//       const sessionId = uuidv4();
//       setUser(sessionId, login);
//       res.cookie("sessionId", sessionId, {
//         httpOnly: true,
//         maxAge: 1000 * 60 * 60 * 24,
//       });
//       return res.redirect("/");
//     } else {
//       return res.render("login", {
//         response: "Unable to login user",
//       });
//     }
//   } catch (error) {
//     return res.render("login", {
//       response: `Unable to login user\nError : ${error}`,
//     });
//   }
// }

// async function handlerUserSignupApi(req, res) {
//   const body = req.body;

//   try {
//     const signUp = await userModel.create({
//       name: body.name,
//       email: body.email,
//       password: body.password,
//     });
//     const sessionId = uuidv4();
//     setUser(sessionId, signUp);
//     res.cookie("sessionId", sessionId, {
//       httpOnly: true,
//       maxAge: 1000 * 60 * 60 * 24,
//     });
//     return res.json({ message: "user created sucessfully", sessionId });
//   } catch (error) {
//     return res.status(500).json({
//       message: `Unable to create user\nError : ${error}`,
//     });
//   }
// }

// async function handlerUserLoginApi(req, res) {
//   const body = req.body;
//   console.log(body);
//   try {
//     const login = await userModel.findOne({
//       email: body.email,
//       password: body.password,
//     });
//     if (login) {
//       const sessionId = uuidv4();
//       setUser(sessionId, login);
//       res.cookie("sessionId", sessionId, {
//         httpOnly: true,
//         maxAge: 1000 * 60 * 60 * 24,
//       });
//       return res.json({ message: "user loggedIn sucessfully", sessionId });
//     } else {
//       return res.status(500).json({
//         message: "Unable to create user",
//       });
//     }
//   } catch (error) {
//     return res.status(500).json({
//       message: `Unable to login user`,
//       error,
//     });
//   }
// }

// module.exports = {
//   handlerUserSignup,
//   handlerUserLogin,
//   handlerUserSignupApi,
//   handlerUserLoginApi,
// };

//token
const userModel = require("../models/user.js");
const { setUser, getUser, removeUser } = require("../services/authentication");
const { v4: uuidv4 } = require("uuid");

async function handlerUserSignup(req, res) {
  const body = req.body;

  try {
    const signUp = await userModel.create({
      name: body.name,
      email: body.email,
      password: body.password,
      role: body.role,
    });

    const token = setUser(signUp);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    });
    return res.redirect("/");
  } catch (error) {
    return res.render("signup", {
      response: `Unable to create user\nError : ${error}`,
    });
  }
}

async function handlerUserLogin(req, res) {
  const body = req.body;
  try {
    const login = await userModel.findOne({
      email: body.email,
      password: body.password,
    });
    if (login) {
      const token = setUser(login);
      console.log(token);
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
      });
      return res.redirect("/");
    } else {
      return res.render("login", {
        response: "Unable to login user",
      });
    }
  } catch (error) {
    return res.render("login", {
      response: `Unable to login user\nError : ${error}`,
    });
  }
}

async function handlerUserSignupApi(req, res) {
  const body = req.body;

  try {
    const signUp = await userModel.create({
      name: body.name,
      email: body.email,
      password: body.password,
      role: body.role,
    });
    const token = setUser(signUp);

    return res.json({ message: "user created sucessfully", token });
  } catch (error) {
    return res.status(500).json({
      message: `Unable to create user\nError : ${error}`,
    });
  }
}

async function handlerUserLoginApi(req, res) {
  const body = req.body;
  try {
    const login = await userModel.findOne({
      email: body.email,
      password: body.password,
    });
    console.log("login : ", body);
    if (login) {
      // console.log(token);

      const token = setUser(login);

      return res.json({ message: "user loggedIn sucessfully", token });
    } else {
      console.log(token);
      return res.status(500).json({
        message: "Unable to create user",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: `Unable to login user`,
      error,
    });
  }
}

module.exports = {
  handlerUserSignup,
  handlerUserLogin,
  handlerUserSignupApi,
  handlerUserLoginApi,
};
