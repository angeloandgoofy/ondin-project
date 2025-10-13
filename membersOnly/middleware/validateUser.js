const { body } = require("express-validator");

const alphaErr = "must only contain letters.";
const passStrengthErr = "not strong enough";

const validateUser = [
  body("firstname").trim()
  .isAlpha().withMessage(`First name ${alphaErr}`),
  body("lastname").trim()
  .isAlpha().withMessage(`Last name ${alphaErr}`),
  body("password").trim()
  .isStrongPassword().withMessage(`Password ${passStrengthErr}`),
  body("email").trim()
  .isEmail().withMessage("Email not valid"),
];

module.exports = validateUser;