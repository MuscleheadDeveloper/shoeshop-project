import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/MongoDb.js";
import ImportData from "./DataImport.js";
import productRoute from "./Routes/ProductRoutes.js";
import { errorHandler, NotFound } from "./MiddleWare/Errors.js";
import userRouter from "./Routes/userRoutes.js";
import orderRouter from "./Routes/orderRoutes.js";
import path from "path";

dotenv.config();
connectDb();
const app = express();
app.use(express.json());

//API ROUTES
app.use("/api/import", ImportData);
app.use("/api/products", productRoute);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

//MIDDLEWARE STATIC && FRONTEND FILE
app.use(express.static(path.resolve(__dirname, "./frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./frontend/build", "index.html"));
});

//ERROR HANDLERS
app.use(NotFound);
app.use(errorHandler);

const port = process.env.PORT || 1000;
app.listen(port, console.log(`Server is up and running on port ${port}...`));
