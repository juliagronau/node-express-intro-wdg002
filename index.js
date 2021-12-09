import express from "express";
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

const users = [
  { id: 1, userName: "Martin" },
  { id: 2, userName: "Nicole" },
  { id: 3, userName: "Sonja" },
];

app
  .route("/")
  .get((req, res) =>
    res.send(
      "<h1>Willkommen zu unserer ersten API.</h1><h2>Das sind die Enpunkte:</h2><p>/users um alle User zu bekommen (get) und um einen neuen User zu kreieren (post)</p><p>/users/id um einen User zu bekommen (get), um einen User zu löschen (delete) und um einen User zu aktualisieren (put)</p>"
    )
  );

app
  .route("/users")
  .get((req, res) => res.json(users))
  .post((req, res) => {
    console.log(req.body);
    const newUser = {
      id: req.body.id,
      userName: req.body.userName,
    };
    users.push(newUser);
    res.status(201).send(newUser);
  });

app
  .route("/users/:id")
  .get((req, res) => {
    //   console.log(req.params);
    const findUser = users.find((user) => user.id == req.params.id);
    console.log(findUser);
    if (findUser) {
      res.status(200).send(findUser);
    } else {
      res.status(404).send("User existiert nicht");
    }
  })
  .delete((req, res) => {
    const findUser = users.find((user) => user.id == req.params.id);
    if (!findUser) {
      res.status(404).send("User existiert nicht");
    } else {
      const index = users.indexOf(findUser);
      users.splice(index, 1);
      res.status(200).send("User erfolgreich gelöscht");
    }
  })
  .put((req, res) => {
    console.log(req.body);
    const findUser = users.find((user) => user.id == req.params.id);
    console.log(findUser);
    if (!findUser) {
      res.status(404).send("User existiert nicht");
    } else {
      findUser.userName = req.body.userName;
      res.status(200).send(findUser);
    }
  });

app.all("*", (req, res) => {
  res
    .status(404)
    .send(
      "<h1>Diesen Endpunkt gibt es nicht, bitte gehe zu / für die Doku</h1>"
    );
});

app.listen(port, () =>
  console.log(`Server listening at http://localhost:${port}`)
);
