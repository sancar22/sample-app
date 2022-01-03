import dotenv from "dotenv";
import { Message } from "./models/message";
import { User } from "./models/user";
import { bootServer } from "./server";
dotenv.config();

const PORT: number = parseInt(process.env.PORT);

(async () => {
    try {
        await User.sync();
        await Message.sync();
        console.log("Connected to DB: ", process.env.DB_NAME);
        bootServer(PORT);
    } catch (e) {
        console.log(e);
    }
})();
