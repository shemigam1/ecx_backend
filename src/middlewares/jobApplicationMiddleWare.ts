import { NextFunction, Request, Response } from 'express';
import { ResultFunction } from '../helpers/utils';
import { ReturnStatus } from '../types/generic';

import multer from 'multer'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // if (file.fieldname === 'cv') {
        //     return cb(null, 'cv/');
        // } else if (file.fieldname === 'coverLetter') {
        //     return cb(null, 'coverLetter/');
        cb(null, 'files/');
    },
    filename: (req, file, cb) => {
        cb(null, req.body.jobId + '-' + file.originalname);
    },
});

const fileUploads = multer({
    storage: storage, limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    },
});

const jobApplicationMiddleWare = fileUploads.array('files', 2); // Accepts two files: cv and coverLetter

export default jobApplicationMiddleWare;