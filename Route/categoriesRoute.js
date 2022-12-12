const mysql = require("promise-mysql");

function categoriesRoute(app, db) {
  //INDEX
  app.get("/categories", async (req, res) => {
    const responseDB = await db.query(`SELECT * FROM categories`);
    res.json({ status: 200, responseDB });
  });

  // SHOW
  app.get("/categories/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const responseDB = await db.query(
        "SELECT * FROM categories WHERE id=(?)",
        [id]
      );
      responseDB.affectedRows > 0 ? res.json({ status: 200, responseDB }) : res.sendStatus(404);
    } catch (error) {
      res.json({ error: error });
    }
  });

  // CREATE
  app.post("/categories", async (req, res) => {
    try {
      const name = req.body.name;
      const responseDB = await db.query(
        "INSERT INTO categories (name) VALUES (?)",
        [name]
      );
      res.json({ status: 200, responseDB });
    } catch (error) {
      res.json({ error: error });
    }
  });

  // UPDATE
  app.put("/categories/:id", async (req, res) => {
    try {
      const name = req.body.name;
      const id = req.params.id;
      const responseDB = await db.query(
        "UPDATE categories SET name = ? WHERE id = ?",
        [name, id]
      );
      res.json({ status: 200, responseDB });
    } catch (error) {
      res.json({ error: error });
    }
  });

  // DELETE
  app.delete("/categories/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const responseDB = await db.query(
        "DELETE FROM utilisateur WHERE id = ?",
        [id]
      );
      res.json({ status: 200, responseDB });
    } catch (error) {
      res.json({ error: error });
    }
  });

  // ADITIONNAL ROUTE
  app.get("/categories/:catName/toys", async (req, res) => {
    try {
      const catName = req.params.catName;
      const responseDB = await db.query(
        "SELECT categories.name as category, toys.name as toy FROM categories INNER JOIN toys ON categories.id = toys.category WHERE categories.name = ?",
        [catName]
      );
      res.json({ status: 200, responseDB });
    } catch (error) {
      res.json({ error: error });
    }
  });
}

module.exports = categoriesRoute;
