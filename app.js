const express = require("express");
const path = require("path");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const app = express();

const dbPath = path.join(__dirname, "products.db");
let db = null;

app.use((req, res, next) => {
  const allowedOrigins = [
    "http://localhost:3000",
    "https://yourfrontenddomain.com",
  ];

  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

const initializeDb = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server is running in port no 3000");
    });
  } catch (e) {
    console.log("DB-error");
    process.exit(1);
  }
};

app.get("/", async (request, response) => {
  response.send("HEllo World");
});

app.get("/products/:productId/", async (request, response) => {
  const { productId } = request.params;
  const getProductQuery = `
    SELECT
      *
    FROM
      products
    WHERE
      product_id = ${productId};`;
  const product = await db.get(getProductQuery);
  response.send(product);
});

initializeDb();
