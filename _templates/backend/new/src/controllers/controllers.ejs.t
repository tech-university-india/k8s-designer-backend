---
to: output-boilerplates/<%= appName %>/src/controllers/<%=appName%>.controllers.js
force: true
---
const services = require("<%='../services/'+ appName+'.services' %>");
const httpError = require("<%='../exceptions/'+ appName+'.exceptions' %>");
const httpConstants = require('http2').constants;

const getDetails = async (req, res) => {
  try {
    const fetchedDetails = await services.getDetails();
    if (fetchedDetails === undefined) throw new httpError('No data found', httpConstants.HTTP_STATUS_NOT_FOUND);
    res.status(httpConstants.HTTP_STATUS_OK).json(fetchedDetails);
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
};
module.exports = { getDetails};