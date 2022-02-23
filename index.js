const express = require("express");
const uuid = require("uuid");

const port = 3000;
const app = express();
app.use(express.json());

const users = [];

const chekcUsers = (request, response, next) => {
  const { id } = request.params;
  const index = users.findIndex((user) => user.id === id);
  if (index < 0) {
    return response.status(404).json({ message: "user not found" });
  }

  request.userId = id;
  request.userIndex = index;

  next();
};

app.get("/users", (request, response) => {
  return response.json(users);
});

app.post("/users", (request, response) => {
  const { name, age } = request.body;

  const user = { id: uuid.v4(), name, age };

  users.push(user);

  return response.status(201).json(user);
});

app.put("/users/:id", chekcUsers, (request, response) => {
  const { name, age } = request.body;
  const id = request.userId;
  const index = request.userIndex;

  const updateUser = { id, name, age };

  users[index] = updateUser;
  return response.json(updateUser);
});

app.delete("/users/:id", chekcUsers, (request, response) => {
  const id = request.userId;
  const index = request.userIndex;

  users.splice(index, 1);
  return response.json({ message: "user deleted" });
});

app.listen(3000, () => {
  console.log(`server started on port ${port}`);
});
