import { ResultFunction } from "../../helpers/utils"
import JobSchema from "../../models/job"
import { ReturnStatus } from "../../types/generic"
import { ICreateJob, IGetJob, IUpdateJob } from "../../types/job"

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
    public async createJob(input: ICreateJob) {
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

}

export default Job