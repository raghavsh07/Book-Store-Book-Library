import { Client } from "pg";

export const PORT = 5555;

export const db = new Client({
  user: "postgres",
  host: "localhost",
  database: "BookStore MERN stack",
  password: "raghav0803sh",
  port: 5432,
});
