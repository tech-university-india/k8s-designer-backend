const userService= require('../services/user.service');
const httpError = require('../exceptions/user.exception');
// const httpConstants = require('http2').constants;


const createUser= async(req,res)=>{
    try{
        const body = req.body;
        const result = userService.createUser(body);
        res.send(result);
    }
    catch(err){
        if (err instanceof httpError) {
            return res.status(err.code).send({ message: err.message });
        }
        res.status(500).send(err.message);
    }
};

module.exports = { createUser };
