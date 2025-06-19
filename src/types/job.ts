import { Types } from "mongoose";

export interface ICreateJob {
    position: string;
    salary: number;
    yearsOfExperience: number;
    employerId: Types.ObjectId | string
}

export interface IUpdateJob {
    position: string | null;
    salary: number | null;
    yearsOfExperience: number | null;
    employerId: Types.ObjectId | string;
    jobId: Types.ObjectId | string;
}

// position salary experience employer, id

export interface IGetJob {
    employerId: Types.ObjectId | string
    jobId: Types.ObjectId | string
}