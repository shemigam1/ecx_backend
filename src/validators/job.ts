import Joi from "joi";
import { ICreateJob, IGetJob, ISearch, IUpdateJob } from "../types/job";

export const createJobValidator = Joi.object<ICreateJob>({
    position: Joi.string().required(),
    jobType: Joi.string().required(),
    minSalary: Joi.number().required(),
    maxSalary: Joi.number().required(),
    location: Joi.string().required(),
    yearsOfExperience: Joi.number().required(),
    employerId: Joi.string().alphanum().required()
})



export const updateJobValidator = Joi.object<IUpdateJob>({
    position: Joi.string(),
    salary: Joi.number(),
    yearsOfExperience: Joi.number(),
    employerId: Joi.string().alphanum().required(),
    jobId: Joi.string().alphanum()
})

export const getJobValidator = Joi.object<IGetJob>({
    employerId: Joi.string().alphanum().required(),
    jobId: Joi.string().alphanum()
})