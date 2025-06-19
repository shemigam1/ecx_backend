import mongoose, { Schema } from "mongoose";
import { ICreateJob } from "../types/job";


const JobSchemaModel: Schema = new Schema<ICreateJob>({

  position: { type: String, required: true },
  salary: { type: Number, required: true },
  yearsOfExperience: { type: Number, required: true },
  employerId: { type: Schema.Types.ObjectId, required: true, ref: "User" }

})

const JobSchema = mongoose.model<ICreateJob>('Job', JobSchemaModel)

export default JobSchema