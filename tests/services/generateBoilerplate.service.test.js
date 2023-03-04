const generateBoilerplate = require('../../src/services/generateBoilerplate.service');


describe('generateBoilerplate', () => {
  const correctFrontendConfig = {
    frontend: {
      appName: 'test',
      port: 4005,
      envVariables: {
        key1: 'value1',
        key2: 'value2',
        key3: 'value3',
      },
      backends : [{
        name: 'backend1',
        url: 'http://localhost',
        port: 5500,
      },{
        name: 'backend2',
        url: 'http://notlocalhost',
        port: 6600,
      }]
    }
  };
  it('should generate frontend boilerplate successfully', async () => {
    const result = await generateBoilerplate('frontend', 'new', correctFrontendConfig, true);
    expect(result).toEqual(0);
  });

  it('should not generate frontend boilerplate when the config is not in the required format', async () => {
    const mockConfig = {
      frontend: {
        name: 'test',
        envVariables: {
          key1: 'value1',
          key2: 'value2',
          key3: 'value3',
        },
        backend : [{
          name: 'backend1',
          url: 'http://localhost',
          port: 5500,
        },{
          name: 'backend2',
          url: 'http://notlocalhost',
          port: 6600,
        }]
      }
    };
    try {
      await generateBoilerplate('frontend', 'new', mockConfig, true);
    }
    catch (e) {
      expect(e).toEqual(1);
    }
  });

  it('should not generate frontend boilerplate with incorrect generator', async () => {

    try {
      await generateBoilerplate('fe', 'new', correctFrontendConfig, true);
    }
    catch (e) {
      expect(e).toEqual(1);
    }
  });
  it('should not generate frontend boilerplate with incorrect action', async () => {

    try {
      await generateBoilerplate('frontend', 'fe', correctFrontendConfig, true);
    }
    catch (e) {
      expect(e).toEqual(1);
    }
  });
});