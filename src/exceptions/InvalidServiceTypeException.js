class InvalidServiceTypeError extends Error {
  constructor(serviceType) {
    super(`Invalid service type: ${serviceType}`);
    this.name = 'InvalidServiceTypeError';
  }
}

module.exports = InvalidServiceTypeError;