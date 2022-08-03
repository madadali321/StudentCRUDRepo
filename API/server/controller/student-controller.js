const { query } = require("express");
const studentModel = require("../model/student-model");
const bycrypt = require('bcrypt');

//Create API
//Api for creating student detail.
exports.studentCreate = (req, res) => {
    console.log(req.body.class);
    //validate request
    if (!req.body.name) {
        res.status(400).send()
        return
    }
    
    //new User
    const student = new studentModel({
        name: req.body.name,
        class: req.body.class,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
        city: req.body.city,
        createdDate: new Date(),
        updatedDate: req.body.updatedDate,
        isVisiable: true
    })

    //save user in the database
    student.save(student).then(data => {
        res.send(data);
    })
        .catch(err => {
            res.status(500).send(err);
        });
}

exports.getStudent = (req,res)=>{
    const result = [];
    var mysort = { createdDate: -1};  
    studentModel.find().sort(mysort).
    then(data=>{
        data.forEach(element => {
            if(element.isVisiable){
                result.push(element);
            }
        });
        res.send(result)
    })
    .catch(err=>{
        res.send(err)
    })
}

exports.updateStudent = (req,res)=>{
    const id = req.params.id;
    studentModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data=>{
        res.status(200).send(data);
    })
    .catch(err=>{
        res.status(500)
    })
}

exports.deleteStudent = async (req,res)=>{
    const id = req.params.id;
    // studentModel.findByIdAndDelete(id)
    // .then(data=>{
    //     res.status(200).send(data);
    // })
    // .catch(()=>{
    //     res.status(500);
    // })

    await studentModel.findByIdAndUpdate(id,req.body, { useFindAndModify: false })
    .then(data=>{
        res.status(200).send(data);
    })
    .catch(err=>{
        res.status(500).send(err);
    })
}