const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

let products = [
  {
    id: 1,
    name: "laptop",
    price: 3000,
  },
];

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.get("/products", (req, res) => {
  res.json(products);
});

app.post("/products", (req, res) => {
  const newProduct = { ...req.body, id: products.length + 1 };
  products.push(newProduct);
  res.send(newProduct);
});

app.put("/products/:id", (req, res) => {
  const newData = req.body;
  const productIndex = products.findIndex(
    (product) => product.id === parseInt(req.params.id)
  );

  if (productIndex === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  // Actualizar el producto directamente en el array
  products[productIndex] = { ...products[productIndex], ...newData };

  res.json({
    message: "Product updated successfully",
    product: products[productIndex],
  });
});

app.delete("/products/:id", (req, res) => {
  const productBFound = products.find(
    (product) => product.id === parseInt(req.params.id)
  );

  if (!productBFound) {
    return res.status(404).json({
      message: "product not fund",
    });
  }
  products = products.filter((p) => p.id !== parseInt(req.params.id));
  res.sendStatus(204);
});

app.get("/products/:id", (req, res) => {
  //   console.log(req.params.id);
  const productBFound = products.find(
    (product) => product.id === parseInt(req.params.id)
  );

  if (!productBFound) {
    return res.status(404).json({
      message: "product not fund",
    });
  }
  console.log(productBFound);
  res.json(productBFound);
});

app.listen(3000);
console.log(`Server on port ${3000}`);
