import express from "express";

import { cardsRouter } from "./routes/cards.js";
import { usersRouter } from "./routes/users.js";
import {
    errorHandler,
    notFoundHandler,
} from "./middlewares/error-handler.js";    

const app = express();
const PORT = 3000;

app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});