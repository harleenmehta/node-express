const express = require("express"); 
const http = require("http");
const morgan = require("morgan");
const bodyParser = require("body-parser");

// import routes 
const dishRouter = require("./routes/dishRouter");
const promoRouter = require("./routes/promoRouter");
const leaderRouter = require("./routes/leaderRouter");

const hostname = "localhost";
const port = "3000"; 

const app = express();

// log info
app.use(morgan("dev"));
// parse request body and populate req.body 
app.use(bodyParser.json());

// mount routes 
app.use("/dishes", dishRouter);
app.use("/promotions", promoRouter);
app.use("/leaders", leaderRouter);

// serve static html files from indicated folder
app.use(express.static(__dirname+'/public'));

// default response (e.g., errors)
app.use((req, res, next) => {
    res.statusCode = 200; 
    res.setHeader('Content-Type', 'text/html');
    res.end("<html><body><h1>This is an Express Server</h1></body></html>");
});

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});