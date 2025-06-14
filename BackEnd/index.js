import "dotenv/config.js"
import express from "express"
import { db } from "./dataBase/db.js";
import cors from "cors";


const app = express();

import userRoute from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
const PORT = process.env.PORT || 3000
//Middleware????
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use("/api/user", userRoute)
db().then(() => {
    app.listen(PORT, () => {
        console.log(`Server has started ${PORT}`)
    });
});
