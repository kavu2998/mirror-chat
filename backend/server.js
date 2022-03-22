const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors({origin: true, credentials: true}));
app.use(express.json());

const userRouter = require('./routes/auth');

app.use('/user', userRouter)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});