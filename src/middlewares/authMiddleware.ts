import { NextFunction, Request, Response } from 'express';
import { ResultFunction, verifyJwt } from '../helpers/utils';
import { ReturnStatus } from '../types/generic';
import User from '../models/user';
import { JsonWebTokenError, JwtPayload } from 'jsonwebtoken';

const authMiddleWare = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	// extract auth header
	const authorization = req.headers.authorization;
	const response = ResultFunction(
		false,
		'invalid or missing token',
		401,
		ReturnStatus.INVALID_TOKEN,
		null
	);

	if (!authorization) {
		return res.status(response.code).json(response);
	}

	// check if token is bearer token

	if (authorization.startsWith('Bearer ') === false) {
		return res.status(response.code).json(response);
	}

	const token = authorization.split(' ')[1];
	// extract jwt token
	if (!token) {
		return res.status(response.code).json(response);
	}

	// verify jwt token
	const payload = verifyJwt(token);
	if (payload instanceof JsonWebTokenError) {
		// if it's an instance of JsonWebTokenError then something was wrong with the token
		// check how JsonWebTokenError is handled in error handler
		return next(payload);
	}
	console.log(payload);


	const id = (payload as JwtPayload)._id;
	// find user and add to res object
	const user = await User.findById(id);
	res.locals.user = user;
	console.log(user);
	next();
};

export const checkAdmin = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const user = res.locals.user
	console.log(user);


	if (!user) {
		const response = ResultFunction(
			false,
			'User not authenticated',
			401,
			ReturnStatus.UNAUTHORIZED,
			null
		);
		return res.status(response.code).json(response);
	}

	if (user.role !== 'employer') {
		const response = ResultFunction(
			false,
			'forbidden forest!',
			403,
			ReturnStatus.UNAUTHORIZED,
			null
		);
		return res.status(response.code).json(response);
	}

	next();
}

export const checkUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const user = res.locals.user
	console.log(user);


	if (!user) {
		const response = ResultFunction(
			false,
			'User not authenticated',
			401,
			ReturnStatus.UNAUTHORIZED,
			null
		);
		return res.status(response.code).json(response);
	}

	if (user.role !== 'user') {
		const response = ResultFunction(
			false,
			'forbidden forest!',
			403,
			ReturnStatus.UNAUTHORIZED,
			null
		);
		return res.status(response.code).json(response);
	}

	next();
}

export default authMiddleWare;
