import { Router } from "express";
import { createJobController, getAllJobsController, getJobController, updateJobController, deleteJobController, feedController, searchController } from "../controllers/job";
import authMiddleWare, { checkAdmin } from "../middlewares/authMiddleware";
import joiMiddleware from "../middlewares/joiMiddleware";
import { createJobValidator, getJobValidator, updateJobValidator } from "../validators/job";


const jobRouter = Router()

jobRouter.get("/search", authMiddleWare, joiMiddleware(createJobValidator), searchController)
jobRouter.get("/feed", authMiddleWare, joiMiddleware(createJobValidator), feedController)
jobRouter.get("/", authMiddleWare, getAllJobsController)
jobRouter.get("/:id", authMiddleWare, getJobController)
jobRouter.post("/", authMiddleWare, checkAdmin, joiMiddleware(createJobValidator), createJobController)
jobRouter.put("/:id", authMiddleWare, checkAdmin, joiMiddleware(updateJobValidator), updateJobController)
jobRouter.delete("/:id", authMiddleWare, checkAdmin, joiMiddleware(getJobValidator), deleteJobController)


export default jobRouter