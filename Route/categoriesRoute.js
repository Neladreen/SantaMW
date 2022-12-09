const mysql = require("promise-mysql");

function categoriesRoute(app, db) {
  //INDEX
  app.get("/categories", async (req, res) => {
    const responseDB = await db.query(`SELECT * FROM categories`);
    res.json({ status: 200, responseDB });
  });

  // SHOW
  app.get("/categories/:id", async (req, res) => {
    const id = res.params.id;
    const responseDB = await db.query("SELECT * WHERE id=(?)", [id]);
    res.json({ status: 200, responseDB });
  });

  // CREATE
  app.post("/categories", async (req, res) => {
    const name = req.body.name;
    const responseDB = await db.query(
      "INSERT INTO categories (name) VALUES (?)",
      [name]
    );
    res.json({ status: 200, responseDB });
  });

  // UPDATE
  app.put("/categories/:id", async (req, res) => {
    const name = req.body.name;
    const id = req.params.id;
    const responseDB = await db.query(
      "UPDATE categories SET name = ? WHERE id = ?",
      [name, id]
    );
    res.json({ status: 200, responseDB });
  });

  // DELETE
  app.delete("/categories/:id", async (req, res) => {
    const id = req.params.id;
    const responseDB = await db.query("DELETE FROM utilisateur WHERE id = ?", [
      id,
    ]);
    res.json({ status: 200, responseDB });
  });
}

module.exports = categoriesRoute;
