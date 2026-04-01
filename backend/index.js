import express from "express"
import mysql from "mysql2"
import cors from "cors"


console.log("server started")

const app = express()

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Sam@sql123",
    database:"test"
})

app.use(express.json())
app.use(cors())

db.connect((err) => {
  if (err) {
    console.log("DB connection failed:", err)
  } else {
    console.log("MySQL connected")
  }
})

app.get("/", (req, res) => {
  res.send("working")
})

app.get("/books", (req,res)=>{
    const q="SELECT * FROM books"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
            return res.json(data)
    })
})


app.post("/books", (req,res)=>{
    const q = "INSERT INTO books (`title`,`desc`,`price`,`coverpic`) VALUES (?, ?, ?)";

    const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.coverpic
];

db.query(q, values, (err, data) => {
  if (err) return res.json(err);
  return res.json("Book has been created");
});
});

app.delete("/books/:id", (req,res)=>{
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id=?";
  
  db.query(q,[bookId],(err,data)=>{
    if(err) return res.json(err);
    return res.json("Book has been deleted");
  });
});

app.put("/books/:id", (req,res)=>{
  const bookId = req.params.id;
  const q = "UPDATE books SET `title` = ?, `desc` =?. `price`=?, `coverpic`=? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.coverpic,
  ]
  
  db.query(q,[...values,bookId],(err,data)=>{
    if(err) return res.json(err);
    return res.json("Book has been updated");
  });
});

app.listen(8800, () => {
  console.log("server running on 8800")
})





