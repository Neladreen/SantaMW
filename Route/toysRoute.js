const mysql = require("promise-mysql");

function toysRoute(app, db) {
  //INDEX
  app.get("/toys", async (req, res) => {
    try {
      const responseDB = await db.query(
        `SELECT toys.id, toys.name, toys.price, toys.description, categories.name AS category_name FROM toys LEFT JOIN categories ON categories.id = toys.category`
      );
      res.json({ status: 200, responseDB });
    } catch (error) {
      res.json({ error: error });
    }
  });

  // SHOW
  app.get("/toys/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const responseDB = await db.query(
        "SELECT toys.id, toys.name, toys.price, toys.description, categories.name AS category_name FROM toys LEFT JOIN categories ON categories.id = toys.category WHERE toys.id=(?)",
        [id]
      );
      res.json({ status: 200, responseDB });
    } catch (error) {
      res.json({ error: error });
    }
  });

  // CREATE
  app.post("/toys", async (req, res) => {
    try {
      const name = req.body.name;
      const description = req.body.description;
      const price = req.body.price;
      const category = req.body.category;
      const responseDB = await db.query(
        "INSERT INTO toys (name,description,price,category) VALUES (?,?,?,?)",
        [name, description, price, category]
      );
      res.json({ status: 200, responseDB });
    } catch (error) {
      res.json({ error: error });
    }
  });

  // UPDATE
  app.put("/toys/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const body = { ...req.body };
      for (key in body) {
        const responseDB = await db.query(
          "UPDATE toys SET ? = ? WHERE id = ?",
          [key, body[key], id]
        );
      }
      res.json({ status: 200, message: "uptaded" });
    } catch (error) {
      res.json({ error: error });
    }
  });

  // DELETE
  app.delete("/toys/:id", async (req, res) => {
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
}

module.exports = toysRoute;
