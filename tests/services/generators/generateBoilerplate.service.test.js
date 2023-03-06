const generateBoilerplate = require('../../../src/services/generators/generateBoilerplate.service');

let mockSpawn = {};
jest.mock('child_process', () => ({
    spawn: () => mockSpawn,
}),
);

describe(('generateBoilerplate'), () => {
    it('should return a resolved promise when boilerplate is generated successfully', async () => {
        const correctFrontendCofig = {
            frontend: {
                appName: 'myFrontend',
                port: 4005,
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
        mockSpawn = {
            on: jest.fn().mockImplementation((event, callback) => {
                if (event === 'close') {
                    callback(0);
                }
            })};
        const exitCode = await generateBoilerplate('projectId123', 'frontend', 'new', correctFrontendCofig);
        expect(exitCode).toBe(0);
    });

    it('should return a rejected promise when boilerplate is not generated successfully', async () => {
        mockSpawn = {
            on: jest.fn().mockImplementation((event, callback) => {
                if (event === 'close') {
                    callback(1);
                }
            })};
        try {
            await generateBoilerplate('fe', 'test', {});
        }
        catch (e) {
            expect(e).toBe(1);
        }

    });
});