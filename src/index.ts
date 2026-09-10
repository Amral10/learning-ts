import { AuthService } from "./AuthService.js";
import { createTables } from "./database.js";

import { UserRepo } from "./UserRepo.js";

createTables();

const userRepo = new UserRepo();
const authService = new AuthService(userRepo);

console.log("Registering user...");

try {
	const user = authService.register("Jonas", "password123", "123.456.789-00");
	console.log(user);
} catch (error) {
	console.error(error);
}
