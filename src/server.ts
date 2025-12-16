import express from "express";
import dotenv from "dotenv";

const app = express();
app.use(express.json());

dotenv.config();
const serverPort = process.env.PORT;

app.get("/", (req: express.Request, res: express.Response) => {
    res.send("Server is open! 🚩");
});

app.listen(serverPort, () => {
    console.log(`Server conected to: http://localhost:${serverPort}`);
});