"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const itemsRoutes_1 = __importDefault(require("./routes/itemsRoutes"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const PORT = process.env.PORT || 8000;
// Update later
app.use((0, cors_1.default)());
app.use("/items", itemsRoutes_1.default);
// Endpoint you'll always need for
app.get("/ping", (req, res) => {
    res.status(200).json({ messege: "pong" });
});
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
