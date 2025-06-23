import mongoose, { Schema } from "mongoose";
import { ICreateJob } from "../types/job";


const JobSchemaModel: Schema = new Schema<ICreateJob>({

  position: { type: String, required: true },
  jobType: { type: String, required: true },
  minSalary: { type: Number, required: true },
  maxSalary: { type: Number, required: true },
  location: { type: String, required: true },
  yearsOfExperience: { type: Number, required: true },
  employerId: { type: Schema.Types.ObjectId, required: true, ref: "User" }

})

const JobSchema = mongoose.model<ICreateJob>('Job', JobSchemaModel)

export default JobSchema