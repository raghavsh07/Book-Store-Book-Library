import pg from "pg";

app.post("/books", async (req, res) => {
  try {
    const { title, author, publishYear } = req.body;

    const result = await db.query(
      `INSERT INTO books (title, author, publish_year)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [title, author, publishYear],
    );

    return res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
});
