const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/users", (req, res) => {
    res.json(users);
});

app.post("/users", (req, res) => {
    const newUser = {
        id: Date.now(),
        name: req.body.name,
        email: req.body.email
    };
    users.push(newUser);
    res.json(newUser);
});

app.put("/users/:id", (req, res) => {
    const id = Number(req.params.id);
    users = users.map(u =>
        u.id === id ? { ...u, ...req.body } : u
    );
    res.json({ success: true });
});

app.delete("/users/:id", (req, res) => {
    const id = Number(req.params.id);
    users = users.filter(u => u.id !== id);
    res.json({ success: true });
});

app.listen(3001, () => {
    console.log(" http://localhost:3001");
});