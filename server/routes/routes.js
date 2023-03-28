const express = require('express');
const parameterRoute = express.Router();
var fs = require("fs");

parameterRoute.route('/parameter').post((req, res, next) => {
    fs.readFile('../Server/Data/parameter.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log(req.body.parameter)
            obj = JSON.parse(data); //now it an object
            try {
                for (let i of req.body.parameter) {
                    obj.parameter.push(i); //add some data
                }
                json = JSON.stringify(obj); //convert it back to json
                fs.writeFileSync('../Server/Data/parameter.json', json, 'utf8'); // write it back 


            } catch {
                console.log("error ocuured")
            }
        }
    });
});

parameterRoute.route('/parametervalue').post((req, res, next) => {
    fs.readFile('../Server/Data/parametervalue.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log(req.body)
            obj = JSON.parse(data); //now it an object
            console.log(obj)
            let flag = 0;
            try {
                for (let i of obj.data) {
                    if (i.name == req.body.name) {
                        obj.data.name.push(req.body.values)
                        flag = 1
                    }
                }
            } catch {
                console.log("error occured")
            }
            if (flag == 0) {
                obj.data.push(req.body)

            }

            json = JSON.stringify(obj); //convert it back to json
            fs.writeFileSync('../Server/Data/parametervalue.json', json, 'utf8'); // write it back 
        }
    });
});

parameterRoute.route('/getparameters').get((req, res, next) => {
    fs.readFile('../Server/Data/parameter.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
            console.log(err);
        } else {
            obj = JSON.parse(data); //now it an object
            res.json(obj)
        }
    });
});

parameterRoute.route('/getparameter/:parameterValue').get((req, res, next) => {

    fs.readFile('../Server/Data/parametervalue.json', 'utf8', function readFileCallback(err, data) {
        obj = JSON.parse(data);
        for (let i of obj.data) {
            if (i.name == req.params.parameterValue) {
                res.json(i.values)
            }
        }

    });

});

parameterRoute.route('/addknowledge').post((req, res, next) => {
    fs.readFile('../Server/Data/parametervalue.json', 'utf8', function readFileCallback(err, data) {
        obj = JSON.parse(data);
        console.log(obj)
      
        for (let i of obj.data) {
         
            if (i.name == req.body.parameter) {
                console.log(i)
                let v1 = []

                for (let j of i.values){
                    let v2 ={};
                    v2["name"] = j;
                    v1.push(v2);
                }

               

                req.body["values"] = v1;
                req.body["selectedValues"] = [];

                console.log(req.body)

                fs.readFile('../Server/Data/knowledge.json', 'utf8', function readFileCallback(err, data1) {


                    obj1 = JSON.parse(data1); //now it an object
                    console.log(obj1)

                    obj1.data.push(req.body)

                    json1 = JSON.stringify(obj1);

                    fs.writeFileSync('../Server/Data/knowledge.json',  json1, 'utf8');
                });
            }
        }
    });
});


parameterRoute.route('/getknowledge').get((req, res, next) => {
  

    fs.readFile('../Server/Data/knowledge.json', 'utf8', function readFileCallback(err, data1) {
      
            obj = JSON.parse(data1); //now it an object
            res.json(obj)


    });

});

module.exports = parameterRoute;