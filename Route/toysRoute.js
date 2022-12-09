const mysql = require("promise-mysql");

function toysRoute(app, db) {
  //INDEX
  app.get("/toys", async (req, res) => {
    const responseDB = await db.query(`SELECT * FROM toys`);
    res.json({ status: 200, responseDB });
  });

  // SHOW
  app.get("/toys/:id", async (req, res) => {
    const id = req.params.id;
    const responseDB = await db.query("SELECT * FROM toys WHERE id=(?)", [id]);
    res.json({ status: 200, responseDB });
  });

  // CREATE
  app.post("/toys", async (req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price; 
    const category = req.body.category;
    const responseDB = await db.query(
      "INSERT INTO toys (name,description,price,category) VALUES (?,?,?,?)",
      [name,description,price,category]
    );
    res.json({ status: 200, responseDB });
  });

  // UPDATE
  app.put("/toys/:id", async (req, res) => {
    const id = req.params.id
    const body = {...req.body}
    for(key in body){
        const responseDB = await db.query("UPDATE toys SET ? = ? WHERE id = ?",[key,body.key, id]);
    }  
    res.json({ status: 200, message : "uptaded"});
  });

  // DELETE
  app.delete("/toys/:id", async (req, res) => {
    const id = req.params.id
    const responseDB = await db.query( "DELETE FROM utilisateur WHERE id = ?",
        [id]);
    res.json({ status: 200, responseDB });
  });
}

module.exports = toysRoute;