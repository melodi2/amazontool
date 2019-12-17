const express = require("express");
const app = express();
const db = require("./public/js/db");

const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
var fs = require("fs");

const compression = require("compression");
const cookieSession = require("cookie-session");
const csurf = require("csurf");

const diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

app.use(compression());

app.use(express.static("./public"));
app.use(express.static("./uploads"));

app.use(express.json());

app.use(
    cookieSession({
        secret: `I'm always angry.`,
        maxAge: 1000 * 60 * 60 * 24 * 14
    })
);

app.use(csurf());

app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.post("/upload.json", uploader.single("file"), function(req, res) {
    const { path } = req.file;
    db.connectPool(path)
        .then(() => {
            //worked

            fs.unlink(path, () => {
                db.setupData();
            }); //delete file if you can, fire and forget
        })
        .catch(err => {
            console.log(err);
            //did not work
            res.sendStatus(500);
        });
});

app.get("/results.json", (req, res) => {
    console.log("in results.json GET route");
    db.getWinningKeywordsP1()
        .then(({ rows }) => {
            console.log("rows data of getWinningKeywords", rows);
            res.json(rows);
        })
        .catch(err => {
            console.log(err);
        });
});

app.get("*", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
