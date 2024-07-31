import express from 'express'

// CREATE SERVER
const app = express();

// SERVER READ JSON FILES
app.use(express.json());

// SERVER READ DATA FROM FORMS
app.use(express.urlencoded({ extended: true }));

export default app;