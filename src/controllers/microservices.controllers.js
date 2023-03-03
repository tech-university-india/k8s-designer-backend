const services = require('../services/microservices.config.service');
const httpError = require('../exceptions/user.exception');
//const httpConstants = require('http2').constants;


const setMicroServicesConfig = async (req,res)=>{
  try{
    const result = await services.setMicroservicesConfigService(req.body);
    console.log(result);
    res.status(200).json({data:result,success:true});
  }catch (err) {
   
    res.status(500).json({data:err.message});
  }

};

module.exports = {setMicroServicesConfig};