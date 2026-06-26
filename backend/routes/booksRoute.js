import express from "express";
import { PORT, db } from "../config.js";
import pg from "pg";

const router = express.Router();

//create a book
router.post("/", async (req, res) => {
  const { title, author, publishYear } = req.body;

  const result = await db.query(
    `INSERT INTO books (title, author, publish_year)
   VALUES ($1, $2, $3)
   RETURNING *`,
    [title, author, publishYear],
  );

  return res.status(201).json(result.rows[0]);
});

//get all books
router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM books");
    return res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
});

//get book by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query("SELECT * FROM books WHERE id = $1", [id]);
    console.log("res", result.rows[0]);
    return res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
});

//update book by id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, publishYear } = req.body;
    const result = await db.query(
      `UPDATE books
       SET title = $1, author = $2, publish_year = $3
       WHERE id = $4
       RETURNING *`,
      [title, author, publishYear, id],
    );
    return res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
});

//delete book by id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(
      "DELETE FROM books WHERE id = $1 RETURNING *",
      [id],
    );
    return res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
});

export default router;
