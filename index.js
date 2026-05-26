const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

// in-memory database
let products = [
  { id: "1", name: "Keyboard", price: 49.99, quantity: 1 },
  { id: "2", name: "Mouse", price: 19.99, quantity: 2 },
  { id: "3", name: "Monitor", price: 299.99, quantity: 1 },
];

// Root route
app.get("/", (req, res) => {
  res.send("Hello from my first Express server!");
});

// GET /products → คืน products ทั้งหมด
app.get("/products", (req, res) => {
  res.status(200).json(products);
});

// GET /products/:id → คืน product เดียว
app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({ error: `Product with id ${id} not found` });
  }

  res.status(200).json(product);
});

// POST /products → สร้าง product ใหม่
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

// PATCH /products/:id → แก้ไข product
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

// DELETE /products/:id → ลบ product
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

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
