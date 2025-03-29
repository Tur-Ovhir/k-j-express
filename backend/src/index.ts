import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import categoryRouter from "./routes/category.router";
import productRouter from "./routes/product.router";
import userRouter from "./routes/user.router";
import orderRouter from "./routes/order.route";
import cartRouter from "./routes/cart.route";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use("/category", categoryRouter);
app.use("/product", productRouter);
app.use("/auth", userRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);

app.get("/", (req, res) => {
  res.send("Hello, TypeScript Node Express!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
