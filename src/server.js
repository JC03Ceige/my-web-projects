// Import packages
const express = require("express");
const bodyParser = require("body-parser");
const fileHandler = require("fs");

// Declare app
const app = express();
const PORT = process.env.PORT || 3001;

// middlewares
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// default route
app.get("/", (req, res) =>
  res.status(200).send({
    message: "Server is running...",
  })
);

// 404 server route
app.get((req, res, next) =>
  res.status(404).send({
    message: "Could not find the page your were looking for...",
  })
);

const WriteTextToFileAsync = async (content) => {
  fileHandler.writeFile("./mwp-frontend/src/projects.json", content, (err) => {
    console.log(content);
    if (err) {
      console.log(err);
    } else {
      console.log("Done writing to file...");
    }
  });
};

app.post("/projects", async (req, res, nexr) => {
  const requestContent = JSON.stringify(req.body);
  await WriteTextToFileAsync(requestContent);
});

app.listen(PORT, () => {
  console.log(
    `
    Server is running,
    Listening on ${PORT}
    `
  );
});
