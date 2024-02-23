// //session auth

// const { getUser } = require("../services/authentication");

// async function restrictToLoginUserOnly(req, res, next) {
//   const userUid = req.cookies?.sessionId;
//   if (!userUid) {
//     return res.redirect("/login");
//   }
//   const user = getUser(userUid);
//   if (!user) {
//     return res.redirect("/login");
//   }
//   req.user = user;
//   next();
// }

// module.exports = {
//   restrictToLoginUserOnly,
// };

// async function restrictToLoginUserOnlyApi(req, res, next) {
//   const userUid = !req.body.sessionId
//     ? req.query.sessionId
//     : req.body.sessionId;

//   if (!userUid) {
//     return res.status(400).json({
//       message: "Need session id to proceed further, Kindly login",
//       loginUrl: "http://127.0.0.1:8000/user/api/login",
//       signupUrl: "http://127.0.0.1:8000/user/api/",
//     });
//   }
//   const user = getUser(userUid);
//   if (!user) {
//     return res.status(404).json({
//       message: "User not found, Kindly login again",
//       loginUrl: "http://127.0.0.1:8000/user/api/login",
//       signupUrl: "http://127.0.0.1:8000/user/api/",
//     });
//   }
//   req.user = user;
//   next();
// }
// module.exports = {
//   restrictToLoginUserOnly,
//   restrictToLoginUserOnlyApi,
// };

//token auth

const { getUser } = require("../services/authentication");

function checkForAuthentication(req, res, next) {
  const token =
    req.cookies?.token || req.headers.authorization?.slice("Bearer ".length);
  if (!token) {
    next();
  } else {
    const user = getUser(token);
    if (!user) {
      next();
    } else {
      console.log(user);
      req.user = user.user;
      next();
    }
  }
}

function restrictToWebUser(roles) {
  return (req, res, next) => {
    const user = req.user;
    if (!user) {
      return res.redirect("/login");
    }
    if (roles.includes(user.role)) {
      req.user = user;
      next();
    } else {
      return res.end("You don't have acess to this.");
    }
  };
}

function restrictToApiUser(roles) {
  return (req, res, next) => {
    const user = req.user;
    console.log(user.role);
    if (!user) {
      return res.status(404).json({
        message: "User not found kindly login",
        loginUrl: "http://127.0.0.1:8000/user/api/login",
        signupUrl: "http://127.0.0.1:8000/user/api/",
      });
    } else if (roles.includes(user.role)) {
      req.user = user;
      next();
    } else {
      return res.status(403).json({
        message: "You dont have access to perform this action",
        loginUrl: "http://127.0.0.1:8000/user/api/login",
        signupUrl: "http://127.0.0.1:8000/user/api/",
      });
    }
  };
}

// async function restrictToLoginUserOnlyApi(req, res, next) {
//   return (req, res, next) => {
//     const user = req.user;
//     if (!user) {
//       return res.status(400).json({
//         message: "User not found kinlfu login",
//         loginUrl: "http://127.0.0.1:8000/user/api/login",
//         signupUrl: "http://127.0.0.1:8000/user/api/",
//       });
//     }
//     if (roles.includes(user)) {
//       next();
//     } else {
//       res.end("You don't have acess to this.");
//     }
//   };
//   const { error, user } = checkForAuthentication(req);
//   if (error) {
//     return res.status(400).json({
//       message: error,
//       loginUrl: "http://127.0.0.1:8000/user/api/login",
//       signupUrl: "http://127.0.0.1:8000/user/api/",
//     });
//   }
//   req.user = user;
//   next();

// const token = req.headers.authorization;
// if (!token) {
//   return res.status(400).json({
//     message: "Need token to proceed further, Kindly login",
//     loginUrl: "http://127.0.0.1:8000/user/api/login",
//     signupUrl: "http://127.0.0.1:8000/user/api/",
//   });
// }
// const newtoken = token.slice("Bearer ".length);
// console.log(newtoken);
// const user = getUser(newtoken);
// if (!user) {
//   return res.status(404).json({
//     message: "User not found, Kindly login again",
//     loginUrl: "http://127.0.0.1:8000/user/api/login",
//     signupUrl: "http://127.0.0.1:8000/user/api/",
//   });
// }
// req.user = user;
// next();
// }

module.exports = {
  checkForAuthentication,
  restrictToWebUser,
  restrictToApiUser,
};
