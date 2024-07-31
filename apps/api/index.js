// IMPORT APP MODULE
import app from "./app.js";

// IMPORT CONFIG MODULE
import { PORT } from "./config.js";

app.listen(PORT, console.log(`Server listen on port ${PORT}⚡`));