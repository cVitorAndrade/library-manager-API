const { Router } = require("express");
const workRoutes = Router();

const WorksController = require("../controllers/WorksControlller");
const worksController = new WorksController();

workRoutes.post("/", worksController.create)
workRoutes.get("/", worksController.index)
workRoutes.put("/", worksController.update)
workRoutes.delete("/", worksController.delete)


module.exports = workRoutes