const express = require("express");
const dotenv = require("dotenv");

const connectDB = require('./config/db');
const movieRouter = require("./routes/movieRoutes");
const userRoutes = require('./routes/userRoutes');
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");



const app = express();
dotenv.config();
connectDB();

app.use(express.json());

// app.use('/api/users',userRoutes);
// app.use('/api/security',securityRoutes);
// app.use('/api/admin',adminRoutes);
app.use('/api/shows',movieRouter);
app.use('/api/users',userRoutes)


app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000
app.listen(PORT,console.log(`running on port: ${PORT}`));