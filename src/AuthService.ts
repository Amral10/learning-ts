import { User } from "./User.js";
import type { UserRepo } from "./UserRepo.js";

export class AuthService {
	constructor(private UserRepo: UserRepo) {}

	register(name: string, password: string, cpf: string): User {
		const exist = this.UserRepo.selectByName(name);

		if (exist) {
			throw new Error("User already exists");
		}

		const newID = this.UserRepo.getNextId();

		const user = new User(newID, name, password, cpf);
		this.UserRepo.insert(user);
		console.log("User registered successfully");
		return user;
	}

	login(name: string, password: string, cpf: string): User | undefined {
		const exist = this.UserRepo.selectByName(name);

		if (!exist) {
			throw new Error("User does not exist.");
		}

		if (!(exist.password === password)) {
			throw new Error("Wrong password");
		}

		exist.loged = true;

		console.log("User loged in successfully");
		return exist;
	}
}
