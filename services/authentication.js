// const sessionMap = new Map();

// function setUser(id, user) {
//   return sessionMap.set(id, user);
// }

// function getUser(id) {
//   return sessionMap.get(id);
// }

// function removeUser(id) {
//   return sessionMap.delete(id);
// }

// module.exports = {
//   setUser,
//   getUser,
//   removeUser,
// };
const jsonwebtoken = require("jsonwebtoken");
const secret = "$Sheraz@$";
function setUser(user) {
  try {
    return jsonwebtoken.sign({ user }, secret);
  } catch (error) {
    console.console.log("set user error:", error);
  }
}

function getUser(token) {
  if (!token) return null;
  try {
    return jsonwebtoken.verify(token, secret);
  } catch (error) {
    console.log(error);
    return null;
  }
}

function removeUser(id) {
  return sessionMap.delete(id);
}

module.exports = {
  setUser,
  getUser,
  removeUser,
};
