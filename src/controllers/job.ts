import { NextFunction, Request, Response } from 'express';
import { ICreateJob, IGetJob, IUpdateJob } from '../types/job';
import { jobFactory } from '../services/factories';


export const getAllJobsController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const response = await jobFactory().getAllJobs()
    return res.status(response.code).json(response);
}

export const getJobController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const input: IGetJob = {
        jobId: req.params.id,
        employerId: req.body.employerId
    }

    const response = await jobFactory().getJob(input)
    return res.status(response.code).json(response);
}

export const createJobController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const input: ICreateJob = {
        position: req.body.position,
        salary: req.body.salary,
        yearsOfExperience: req.body.yearsOfExperience,
        employerId: req.body.employerId
    }

    const response = await jobFactory().createJob(input)
    return res.status(response.code).json(response);
}

export const updateJobController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const input: IUpdateJob = {
        position: req.body.position,
        salary: req.body.salary,
        yearsOfExperience: req.body.yearsOfExperience,
        employerId: req.body.employerId,
        jobId: req.params.id
    }

    const response = await jobFactory().updateJob(input)
    return res.status(response.code).json(response);
}

export const deleteJobController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const input: IGetJob = {
        jobId: req.params.id,
        employerId: req.body.employerId
    }

    const response = await jobFactory().deleteJob(input)
    return res.status(response.code).json(response);
}