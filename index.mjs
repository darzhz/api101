import express from "express";
import { fileURLToPath } from "url";
import { JSONPreset } from "lowdb/node";
import path from "path";
const app = new express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db = await JSONPreset(path.join(__dirname,'db.json'), { stories: [] });

app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.post("/create", (req, res) => {
  console.log(req.body);
  saveData(req.body);
  res.redirect('/',302)
});
app.get('/stories',(req,res)=>{
    res.send(db.data);
})
app.listen(8080, () => {
  console.log("server started");
});

const saveData = (userdata) => {
  db.data.stories.push(userdata);
  db.write();
};
