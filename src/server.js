import express from "express";
import cors from "cors";
import router from "./routes/index.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

app.listen(4000, () => {
    console.log("Magic happens on port " + 4000);
});