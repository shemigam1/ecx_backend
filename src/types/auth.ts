export interface ILogin {
	email: string;
	password: string;
	role: "admin" | "user"
}

export type LoginData = {
	user: {
		email: string;
		name: string;
		role: "admin" | "user"
	};
	token: string;
};

export interface ISignup {
	name: string,
	email: string;
	password: string;
	role: "admin" | "user"
}

export type SignupData = {
	user: {
		name: string,
		email: string;
		password: string;
		role: "admin" | "user";
	};
	// name: string;
};

export interface IForgotPassword {
	email: string
}
