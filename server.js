import "dotenv/config";
import cors from "cors";

import express from "express";
const app = express();

const PORT = process.env.PORT || 8000;

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
// * Middleware configuration
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  return res.send(
    `<div style="text-align: center; Color: red; ">Server is running</br> <div>Port :8080</div></div>`
  );
});

// * Routes files
import routes from "./routes/index.js";

app.use(routes);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
