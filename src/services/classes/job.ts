import { application } from "express"
import { ResultFunction } from "../../helpers/utils"
import Application from "../../models/application"
import ApplicationSchema from "../../models/application"
import JobSchema from "../../models/job"
import { ReturnStatus } from "../../types/generic"
import { ApplicationData, ICreateJob, IGetJob, ISearch, IUpdateJob, JobData } from "../../types/job"

class Job {

    public async jobFeed() {
        try {
            const jobs = await JobSchema.aggregate([
                // { $match: { deleted: false } },
                // this is for when i implement soft delete
                { $sample: { size: 2 } }])

            return ResultFunction(
                true,
                'Job feed!',
                200,
                ReturnStatus.OK,
                jobs
            )
        } catch (error) {
            return ResultFunction(
                false,
                'couldnt get jobs',
                422,
                ReturnStatus.NOT_OK,
                null
            );
        }
    }

    public async searchJobs(input: ISearch) {
        try {
            const { sortBy, sortOrder, page, limit } = input
            let sort = -1
            if (sortOrder === 'asc') {
                sort = 1
            }
            const totalJobs = await JobSchema.countDocuments()
            let jobs
            if (sortBy === 'location') {
                jobs = await JobSchema.find({ location: sortBy }).limit(limit * 1).skip((page - 1) * limit)
            } else if (sortBy === 'jobType') {
                jobs = await JobSchema.find({ jobType: sortBy }).limit(limit * 1).skip((page - 1) * limit)
            }

            jobs = await JobSchema.find({}).limit(limit * 1).skip((page - 1) * limit).sort({ sortBy: sort as 1 | -1 })
            if (jobs.length === 0) {
                return ResultFunction(
                    false,
                    'no jobs found',
                    404,
                    ReturnStatus.NOT_OK,
                    null
                );
            }

            const data = {
                ...jobs,
                currentPage: page,
                totalPages: Math.ceil(totalJobs / limit),
                totalJobs: totalJobs,
                sortBy: sortBy,
                sortOrder: sortOrder
            }

            return ResultFunction(
                true,
                'Job returned sucessfully!',
                200,
                ReturnStatus.OK,
                data
            )

        } catch (error) {
            return ResultFunction(
                false,
                'couldnt get jobs',
                422,
                ReturnStatus.NOT_OK,
                null
            );
        }
    }
    public async getAllJobs() {
        try {
            // implement filter system and pagination
            const jobs = await JobSchema.find({})
            return ResultFunction(
                true,
                'Job returned sucessfully!',
                200,
                ReturnStatus.OK,
                jobs
            )
        } catch (error) {
            return ResultFunction(
                false,
                'couldnt get jobs',
                422,
                ReturnStatus.NOT_OK,
                null
            );
        }
    }
    public async getJob({ jobId, employerId }: IGetJob) {
        try {
            const job = await JobSchema.findById(jobId)

            return ResultFunction(
                true,
                'Job returned successful',
                200,
                ReturnStatus.OK,
                job
            )
        } catch (error) {
            return ResultFunction(
                false,
                'couldnt get job',
                422,
                ReturnStatus.NOT_OK,
                null
            );
        }
    }
    public async createJob(input: JobData) {
        try {
            const newJob = await JobSchema.create(input)

            return ResultFunction(
                true,
                'job created successful',
                200,
                ReturnStatus.OK,
                newJob
            )
        } catch (error) {
            return ResultFunction(
                false,
                'something went wrong with creating Job',
                422,
                ReturnStatus.NOT_OK,
                null
            );
        }
    }
    public async updateJob(input: IUpdateJob) {
        try {
            const { jobId, employerId, ...data } = input

            const job = await JobSchema.findById(jobId)
            if (job?.employerId.toString() !== employerId) {

                return ResultFunction(
                    false,
                    'unauthorized request',
                    401,
                    ReturnStatus.UNAUTHORIZED,
                    null
                );
            }

            const updatedJob = await JobSchema.findByIdAndUpdate(jobId, data)

            return ResultFunction(
                true,
                'job updated successful',
                200,
                ReturnStatus.OK,
                data
            )


        } catch (error) {
            return ResultFunction(
                false,
                'something went wrong',
                422,
                ReturnStatus.NOT_OK,
                null
            );
        }
    }
    public async deleteJob(input: IGetJob) {
        try {
            const { jobId, employerId } = input

            const job = await JobSchema.findById(jobId)
            if (job?.employerId.toString() !== employerId) {

                return ResultFunction(
                    false,
                    'unauthorized request',
                    401,
                    ReturnStatus.UNAUTHORIZED,
                    null
                );
            }

            await JobSchema.findByIdAndDelete(jobId)

            return ResultFunction(
                true,
                'job deleted successful',
                200,
                ReturnStatus.OK,
                null
            )


        } catch (error) {
            return ResultFunction(
                false,
                'something went wrong',
                422,
                ReturnStatus.NOT_OK,
                null
            );
        }
    }

    public async apply(input: ApplicationData) {
        try {
            const { jobId, applicantId } = input

            const existingApplication = await Application.findOne({ jobId, applicantId })

            if (existingApplication) {

                return ResultFunction(
                    false,
                    'you have already applied for this job',
                    422,
                    ReturnStatus.NOT_OK,
                    null
                );
            }

            const newApplication = await Application.create(input)

            if (!newApplication) {

                return ResultFunction(
                    false,
                    'something went wrong',
                    422,
                    ReturnStatus.NOT_OK,
                    null
                );
            }

            return ResultFunction(
                true,
                'application created successful',
                200,
                ReturnStatus.OK,
                newApplication
            )
        } catch (error) {
            return ResultFunction(
                false,
                'something went wrong',
                422,
                ReturnStatus.NOT_OK,
                null
            );
        }
    }

}

export default Job