const { Router } = require("express");
const routes = Router();

const workRoutes = require("./works.routes");
routes.use("/works", workRoutes);

module.exports = routes;