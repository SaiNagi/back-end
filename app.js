const express = require("express");
const path = require("path");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const app = express();

const dbPath = path.join(__dirname, "products.db");
let db = null;

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
