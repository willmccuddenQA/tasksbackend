'use strict';
const router = require('express').Router();
const {Task} = require("../config/db");


// requests (C,R,U,D)
router.get("/getAll", (req, res, next) => {
    Task.find((err,tasks) => {
        if(err){
            next(err);
        }
        res.send(tasks);
    });
});


router.post("/create", (req, res, next) => {
    const item = new Task(req.body);
    item.save()
        .then((result) => console.log(result))
        .catch((err) => next(err));
        res.send('done');
});

// url parameters?
router.delete("/delete/:id", (req, res, next) => {
    Task.findByIdAndDelete(req.params.id,(err) => {
    if(err){
        next(err);
    }
    res.status(204).send(`done`);
    })
});


router.patch("/update/:id", (req, res, next) => {
    Task.findByIdAndUpdate(req.params.id, req.body,{new: true},(err,result) => {
        if(err){
            next(err);
        }
        res.status(202).send('Updated!');
    })

});


module.exports = router; 