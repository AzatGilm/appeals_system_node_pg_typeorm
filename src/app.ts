import 'reflect-metadata';
import express from "express";
import { AppDataSource } from "./data-source";
import { appealsRouter } from "./routes/appeals.routes";

const app = express();
const PORT = process.env.SERVER_PORT || 3000;
app.use(express.json());
app.use('/appeals', appealsRouter);
// console.log(process.env.DB_PORT);


AppDataSource.initialize()
  .then(() => {
    console.log('DB connected');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);      
    })    
  })
  .catch((error) => {
    console.log('Database connection error:', error)
  })
