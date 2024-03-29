const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const connectToMongo = require("./db");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const bodyParser = require("body-parser");
const upload = require('./middleware/multer');

connectToMongo();


//middleware


app.use(express.json({ limit: '10mb' }));
app.use("/", express.static("public/upload"));

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Adjust allowed methods as needed
    allowedHeaders: ['Content-Type', 'auth-token'], // Adjust allowed headers as needed
    credentials: true
}));


//available routes
app.get('/', (req, res) => {
    res.send('hello world')
})
app.use('/api/auth', require("./routes/auth"))
app.use('/api/product', require("./routes/product"))

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})