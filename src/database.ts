import Database from "better-sqlite3";

export const db: Database.Database = new Database("db.sqlite");

export function createTables() {
	createTableUsers();
	createTableRestaurants();
}

function createTableUsers() {
	db.exec(`
		CREATE TABLE IF NOT EXISTS users (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT NOT NULL,
			password TEXT NOT NULL,
			cpf TEXT NOT NULL
		);
	`);
}

function createTableRestaurants() {
	db.exec(`
    CREATE TABLE IF NOT EXISTS restaurants (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      cnpj TEXT NOT NULL,
      address TEXT NOT NULL
    );
  `);
}
