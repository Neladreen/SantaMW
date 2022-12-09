const mysql = require('promise-mysql')

function categoriesRoute(app,db){
    app.get('/categories', async (req,res) => { 
        const responseDB = await db.query(`SELECT * FROM categories`)
        res.json({status:200,responseDB})
    })

    // app.get

    // app.post('/categories', async(req,res)=>{
    //     const name = req.body.name
    //     const price = req.body.price 
    //     const responseDB = await db.query('INSERT INTO products (name,price) VALUES (?,?)',[name,price])
    //     res.json({status:200,responseDB})
    // })
}

module.exports = categoriesRoute