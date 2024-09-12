const express = require('express');
const userRouter = require('./routes/user.routes')
const dotenv = require('dotenv')

dotenv.config()

const PORT = process.env.PORT || 8080 || 8585

const app = express();

app.use(express.json());
app.use("/api/v1", userRouter)


app.listen(PORT, ()=>console.log(`Server started on port ${PORT}`))