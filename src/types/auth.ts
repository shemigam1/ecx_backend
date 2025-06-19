export interface ILogin {
	email: string;
	password: string;
	role: "employer" | "user"
}

export type LoginData = {
	user: {
		email: string;
		name: string;
		role: "employer" | "user"
	};
	token: string;
};

export interface ISignup {
	name: string,
	email: string;
	password: string;
	role: "employer" | "user"
}

export type SignupData = {
	user: {
		name: string,
		email: string;
		password: string;
		role: "employer" | "user";
	};
	// name: string;
};

export interface IForgotPassword {
	email: string
}
