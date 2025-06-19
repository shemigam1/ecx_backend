import Auth from '../classes/auth';
import Job from '../classes/job';

export const authFactory = () => {
	// define parameters for initialization here

	return new Auth();
};

export const jobFactory = () => {
	return new Job()
}