import { Request, Response } from "express";
import http from "http";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import router from "./router";

export const bootServer = (port: number): http.Server => {
    const app = express();

    app.use(morgan("dev"))
        .use(cors())
        .use(helmet())
        .use(express.json())
        .use(router)
        .get("/", (_: Request, res: Response) => {
            res.status(200).send("Hello, stranger!");
        })
        .get("*", (_: Request, res: Response) => {
            res.status(404).send("Sorry, not found 😞");
        });

    const server = http.createServer(app);

    server.listen(port, () => {
        console.log(`Server is running on port:${port}`);
    });

    return server;
};
