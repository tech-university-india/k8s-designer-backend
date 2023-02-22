const {setMicroservicesConfigService} = require('../services/microservices.config.service');
const httpError = require('../exceptions/user.exception');
//const httpConstants = require('http2').constants;


const setMicroServicesConfig = async (req,res)=>{
  try{
    const result = await setMicroservicesConfigService(req.body);
    res.status(200).json({data:result,success:true});
  }catch (err) {
    if (err instanceof httpError) {
      return res.status(err.code).send({ message: err.message });
    }
    res.status(500).send(err.message);
  }

};

module.exports = {setMicroServicesConfig};