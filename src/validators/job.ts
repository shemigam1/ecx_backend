import Joi from "joi";
import { ICreateJob, IGetJob, IUpdateJob } from "../types/job";

export const createJobValidator = Joi.object<ICreateJob>({
    position: Joi.string().required(),
    salary: Joi.number().required(),
    yearsOfExperience: Joi.number().required(),
    employerId: Joi.string().alphanum().required()
})

export const updateJobValidator = Joi.object<IUpdateJob>({
    position: Joi.string(),
    salary: Joi.number(),
    yearsOfExperience: Joi.number(),
    employerId: Joi.string().alphanum().required(),
    jobId: Joi.string().alphanum().required()
})

export const getJobValidator = Joi.object<IGetJob>({
    employerId: Joi.string().alphanum().required(),
    jobId: Joi.string().alphanum().required()
})