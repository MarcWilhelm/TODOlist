const bodyParser = require("body-parser");
const express = require("express");
const http = require("http");
const app = express();
const cors = require("cors");
const data = require("./info.json");
const server = http.createServer(app);
const fs = require("fs");
const port = process.env.PORT || 8084;

require("dotenv").config();
console.log("our json db has this: ", data);
app.use(cors())
/*app.use(
    cors({
        origin: [process.env.ORIGIN],
    })
);*/
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    const messages = req.body.messages;
    const id = req.body.ID;
    console.log(req.body.messages)
    console.log(messages);

    addValue(req, res, messages, id);
});
function addValue(req, res, messages, id) {
    fs.readFile('./info.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
            console.log(err);
        } else {
            let obj = JSON.parse(data);
            console.log(obj)//now it an object
             id++;
            obj['todos'].push({"message": messages,"ID": id });
            let json = JSON.stringify(obj); //convert it back to json
            fs.writeFile('./info.json', json, 'utf8', function (err) {
                if (err) throw err;
                console.log('complete');
            }); // write it back
            //res.send('Score added to the database');

            res.send(json);
        }
    });
    //})
}
app.post('/delete', (req, res) => {
    const id = req.body.ID;
    console.log(req.body.ID)

    deleteValue(req, res, id);
});
function deleteValue(req, res, id){
    fs.readFile('./info.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
            console.log(err);
        } else {
            let obj = JSON.parse(data);
            console.log("obj ")
           console.log(obj)
            let objst = obj['todos']//now it an object

            objst.splice(id, 1);
            console.log("objst ")
            console.log( objst);
           console.log( obj['todos']);
            let jsons = JSON.stringify(obj)
            console.log("------------------")
            console.log(jsons)
            fs.writeFile('./info.json', jsons, 'utf8', function (err) {
                if (err) throw err;
                console.log('complete');
            });
}})}

server.listen(port, () => console.log("Listening on port " + port));