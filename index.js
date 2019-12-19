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

app.post("/upload.json", uploader.single("file"), async (req, res) => {
    const { path } = req.file;
    try {
        await db.setDatatype();
        await db.connectPool(path);
        fs.unlink(path, () => {});
        await db.setNewDatatype();
        res.json({ success: true });
    } catch (err) {
        console.log("catch err in post upload", err);
    }
});

app.post("/results.json", async (req, res) => {
    console.log("in results.json GET route, REQ", req.body);
    const { WP1, WP2, LP1, LP2 } = req.body;
    try {
        let results = {};
        if (WP1) {
            console.log("WP1 true");
            await db
                .getWinningKeywordsP1()
                .then(({ rows }) => {
                    console.log("rows data of getWinningKeywords", rows);
                    results.WP1results = rows;
                })
                .catch(err => {
                    console.log(err);
                });
        }

        if (WP2) {
            console.log("WP2 true");
            await db
                .getWinningKeywordsP2()
                .then(({ rows }) => {
                    console.log("rows data of getWinningKeywords", rows);
                    results.WP2results = rows;
                })
                .catch(err => {
                    console.log(err);
                });
        }

        if (LP1) {
            console.log("LP1 true");
            await db
                .getLosingKeywordsP1()
                .then(({ rows }) => {
                    console.log("rows data of getLosingKeywords", rows);
                    results.LP1results = rows;
                })
                .catch(err => {
                    console.log(err);
                });
        }

        if (LP2) {
            console.log("LP2 true");
            await db
                .getLosingKeywordsP2()
                .then(({ rows }) => {
                    console.log("rows data of getLosingKeywords", rows);
                    results.LP2results = rows;
                })
                .catch(err => {
                    console.log(err);
                });
        }
        res.json({ success: true, results: results });
    } catch (err) {
        console.log("catch error in post results", err);
    }
});

app.get("*", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
