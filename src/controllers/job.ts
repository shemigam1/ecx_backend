import { NextFunction, Request, Response } from 'express';
import { ICreateJob, IGetJob, ISearch, IUpdateJob } from '../types/job';
import { jobFactory } from '../services/factories';
import { ReturnStatus } from '../types/generic';
import { ResultFunction } from '../helpers/utils';


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
        jobType: req.body.jobType,
        minSalary: req.body.minSalary,
        maxSalary: req.body.maxSalary,
        location: req.body.location,
        yearsOfExperience: req.body.yearsOfExperience,
        employerId: req.body.employerId
    }

    const response = await jobFactory().createJob(input)
    return res.status(response.code).json(response);
}

export const searchController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const input: ISearch = {
        sortBy: req.params.sortBy || "date",
        sortOrder: req.params.sortOrder || "desc",
        page: parseInt(req.params.page) || 1,
        limit: parseInt(req.params.limit) || 15
    }

    if (isNaN(input.page) || isNaN(input.limit)) {
        return res.status(400).json({
            success: false,
            message: 'invalid query params',
            statusCode: 401,
            status: "NOT_OK",
            data: null
        });
    }

    if (!(['asc', 'desc'].includes(input.sortOrder)) || !(['date', 'maxSalary', 'jobType', 'location'].includes(input.sortBy))) {
        return res.status(400).json({
            success: false,
            message: 'invalid query params',
            statusCode: 401,
            status: "NOT_OK",
            data: null
        });
    }

    const response = await jobFactory().searchJobs(input)
    return res.status(response.code).json(response);
}

export const feedController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const response = await jobFactory().jobFeed()
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