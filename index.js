const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

let products = [
  { id: "1", name: "Keyboard", price: 49.99, quantity: 1 },
  { id: "2", name: "Mouse", price: 19.99, quantity: 2 },
  { id: "3", name: "Monitor", price: 299.99, quantity: 1 },
];

app.get("/", (req, res) => {
  res.send("Hello from my first Express server!");
});

app.get("/products", (req, res) => {
  let result = [...products];

  if (req.query.name) {
    const search = req.query.name.toLowerCase();
    result = result.filter((p) => p.name.toLowerCase().includes(search));
  }

  if (req.query.sort === "price") {
    result.sort((a, b) => a.price - b.price);
  } else if (req.query.sort === "-price") {
    result.sort((a, b) => b.price - a.price);
  }

  res.status(200).json(result);
});

app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({ error: `Product with id ${id} not found` });
  }

  res.status(200).json(product);
});

app.post("/products", (req, res) => {
  const { name, price, quantity } = req.body;

  if (!name || price === undefined) {
    return res.status(400).json({
      error: "Missing required fields: name and price are required",
    });
  }

  const newProduct = {
    id: String(Date.now()),
    name,
    price,
    quantity: quantity ?? 1,
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.patch("/products/:id", (req, res) => {
  const { id } = req.params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({ error: `Product with id ${id} not found` });
  }

  const { name, price, quantity } = req.body;
  if (name !== undefined) product.name = name;
  if (price !== undefined) product.price = price;
  if (quantity !== undefined) product.quantity = quantity;

  res.status(200).json(product);
});

app.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: `Product with id ${id} not found` });
  }

  const deletedProduct = products.splice(index, 1)[0];
  res.status(200).json({
    message: "Product deleted successfully",
    product: deletedProduct,
  });
});

app.use((req, res, next) => {
  res.status(404).json({ error: `Route ${req.method} ${req.url} not found` });
});

app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
