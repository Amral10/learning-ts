import { db } from "./database.js";
import { User } from "./User.js";

interface UserRow {
	id: number;
	name: string;
	password: string;
	cpf: string;
}

export class UserRepo {
	insert(user: User): void {
		const stmt = db.prepare(`
      INSERT INTO users (name, password, cpf)
      VALUES (?, ?, ?);
    `);
		stmt.run(user.name, user.password, user.cpf);
	}

	selectAll(): User[] {
		const stmt = db.prepare(`
      SELECT * FROM users;
    `);
		const rows: UserRow[] = stmt.all() as UserRow[];
		return rows.map((row) => new User(row.id, row.name, row.password, row.cpf));
	}

	selectByName(name: string): User | undefined {
		const stmt = db.prepare(`
      SELECT * FROM users WHERE name = ?;
    `);
		const row: UserRow | undefined = stmt.get(name) as UserRow;
		return row ? new User(row.id, row.name, row.password, row.cpf) : undefined;
	}

	selectByCpf(cpf: string): User | undefined {
		const stmt = db.prepare(`
      SELECT * FROM users WHERE cpf = ?;
    `);
		const row: UserRow | undefined = stmt.get(cpf) as UserRow;
		return row ? new User(row.id, row.name, row.password, row.cpf) : undefined;
	}

	getNextId(): number {
		const stmt = db.prepare(`
      SELECT MAX(id) as maxId FROM users;
    `);
		const row: { maxId: number | null } = stmt.get() as {
			maxId: number | null;
		};
		return (row.maxId ?? 0) + 1;
	}
}
