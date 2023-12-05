import "dotenv/config"

import express from "express";

const app = express();

const PORT = process.env.PORT || 8080;

// * Middleware configuration

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {

    return res.send(`<div style="text-align: center; Color: red; ">Server is running</br> <div>Port :8080</div></div>`)
})


// * Routes files
import routes from "./routes/index.js";

app.use(routes);


app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));