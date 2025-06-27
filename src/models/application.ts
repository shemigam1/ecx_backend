import mongoose, { Schema } from "mongoose";
import { IApplication, ICreateJob } from "../types/job";


const ApplicationSchema: Schema = new Schema<IApplication>({

    cvPath: { type: String, required: true },
    coverLetter: { type: String, required: true },
    cvData: { type: Buffer, required: true },
    submittedAt: { type: Date, default: Date.now(), required: true },
    applicantId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    jobId: { type: Schema.Types.ObjectId, required: true, ref: "Job" }



})

const Application = mongoose.model<ICreateJob>('Job', ApplicationSchema)

export default Application