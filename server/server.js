import env from "dotenv";
import express from "express";
import pg from "pg";
import bodyParser from "body-parser";
import cors from "cors";

env.config();

const db = new pg.Pool({
    connectionString: process.env.POSTGRES_URL ,
})

db.connect().then(()=>console.log('connected to database'));

const app = express();
const PORT = process.env.PORT;

// app.use(cors({
//     origin: ['https://keep-notes-frontend-psi.vercel.app', 'https://keepnotes.hassaandev.site/'],
//     methods: ['GET', 'POST'],
//     credentials: true,
// }));
app.use(cors());

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true})); 
app.use(bodyParser.json());

app.get("/", (req, res)=>{
    res.send('hello');
})

app.get("/getnotes", async(req, res) => {
    const arr = await db.query('SELECT * FROM notesinfo');
    // console.log(arr);
    res.json(arr.rows);
});

app.post("/addnote", async(req, res) => {
    const {heading, notes} = req.body;
    try{
      const result = await db.query('INSERT INTO notesinfo (headings, notes) VALUES ($1, $2)',[heading, notes])
      console.log(result);
      res.json(result.rows);
    }
    catch(err){
        res.json(err);
    }
});

app.post("/deletenote", async(req, res) => {
    const delete_id = req.body.id;
    try{
        const response = await db.query('DELETE FROM notesinfo WHERE id = ($1)',[delete_id]);
    } catch(err){
        console.error(err.message);
    }
});

app.post("/editnote", async(req, res) => {
    try{
       const {e_id, heading, notes} = req.body;
       await db.query('UPDATE notesinfo SET headings = $1, notes = $2 WHERE id = $3',[heading, notes, e_id]);
    } catch(err){
        console.log(err.message)
    }
})

app.listen(PORT, ()=>{
    console.log(`Server Running on port ${PORT}`);
});
