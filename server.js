const express = require("express");
const app = express();
const connect=require("./database");
app.use(express.json());

app.get("/", async (req, res) => {
  const user = await User.findAll();
  res.json(user);
});

app.post("/user", async (req, res) => {
  const { name, department, dob } = req.body;
  const newUser = await User.create({ name, department, dob });
  res.json(newUser);
});

app.put("/user/:id", async (req, res) => {
  const { name, department, dob } = req.body;
  const user = await User.findByPk(req.params.id);
  if (user) {
    user.name = name;
    user.department = department;
    user.dob = dob;
    await user.save();
    return res.send("user updated successfully");
  }
  res.send("user doesn't exist");
});

app.delete("/user/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    user.destroy();
    return res.send("user deleted successfully");
  }
  res.send("user doesn't exist");
});

app.listen("3000", () => {
  console.log("server started on port 3000");
});