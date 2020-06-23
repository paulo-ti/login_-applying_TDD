const routes = require("express").Router();
const { User } = require("./app/models");

User.create({ name: "Paulo", email: "paulo-ti@hotmail.com" , password_hash: "123456" });

module.exports = routes;
