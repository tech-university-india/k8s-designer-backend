const generateBoilerplateService = require('../../../src/services/generators/generateBoilerplate.service');

let mockSpawn = {};
jest.mock('child_process', () => ({
    spawn: () => mockSpawn,
}),
);

describe(('generateBoilerplateService'), () => {
    const sampleConfig = {
        frontend: [{
            appName: 'testFrontend',
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
        }],
        database: [
            {
                databaseName: 'testDb',
                dbVersion: 'latest',
                dbPort: 5432,
                dbUser: 'postgres',
                dbPassword: 'postgres',
                dbSchema: 'public',
            },
            {
                databaseName: 'testDb2',
                dbVersion: 'latest',
                dbPort: 5432,
                dbUser: 'postgres',
                dbPassword: 'postgres',
                dbSchema: 'public',
            }
        ],
        backend: [{
            appName: 'testBackend',
            port: 5500,
            envVariables: {
                key1: 'value1',
                key2: 'value2',
                key3: 'value3',
            },
            frontends : [{
                name: 'frontend1',
                url: 'http://localhost',
                port: 4005,
            },{
                name: 'frontend2',
                url: 'http://notlocalhost',
                port: 5005,
            }],
            databases : [{
                dbName: 'database1',
                dbHost: '127.0.0.1',
                dbPort: 5432,
                dbUser: 'postgres',
                dbPassword: 'postgres',
                model: {
                    name: 'Color',
                    tableName: 'Colors',
                    data: ['red', 'green', 'blue']
                }
            },
            {
                dbName: 'database2',
                dbHost: '127.0.0.1',
                dbPort: 5432,
                dbUser: 'postgres',
                dbPassword: 'postgres',
                model: {
                    name: 'Car',
                    tableName: 'Cars',
                    data: ['bmw', 'audi', 'mercedes']
                }
            }]
        }]
    };
    describe('runHygen', () => {
        it('should return a resolved promise when hygen is run successfully', async () => {
            mockSpawn = {
                on: jest.fn().mockImplementation((event, callback) => {
                    if (event === 'close') {
                        callback(0);
                    }
                })};
            const exitCode = await generateBoilerplateService.runHygen('projectId123', 'frontend', 'new', {});
            expect(exitCode).toBe(0);
        });

        it('should return a rejected promise when hygen is not run successfully', async () => {
            mockSpawn = {
                on: jest.fn().mockImplementation((event, callback) => {
                    if (event === 'close') {
                        callback(1);
                    }
                })};
            try {
                await generateBoilerplateService.runHygen('projectId123', 'frontend', 'new', {});
            }
            catch (e) {
                expect(e).toBe(1);
            }
        });
    });
    describe('generateBoilerplate', () => {
        it('should return a rejected promise when an invalid microservice is passed', async () => {
            try {
                await generateBoilerplateService.generateBoilerplate('projectId123', 'invalid', {});
            }
            catch (e) {
                expect(e).toBe('Invalid microservice');
            }
        });
        it('should return a rejected promise when an invalid config is passed', async () => {
            const invalidConfig = {
                database: [
                    {
                        databaseName: 'testDb',
                        dbVersion: 'latest',
                        dbPort: 5432,
                        dbUser: 'postgres',
                        dbPassword: 'postgres',
                        dbSchema: 'public',
                    },
                    {
                        databaseNam: 'testDb2',
                        dbVersion: 'latest',
                        dbPort: 5432,
                        dbUser: 'postgres',
                        dbPassword: 'postgres',
                        dbSchema: 'public',
                    }
                ],
            };
            try {
                await generateBoilerplateService.generateBoilerplate('projectId123', 'database', invalidConfig);
            }
            catch (e) {
                expect(e).toBe(1);
            }
        });
        it('should return array of relolved promises when a frontend microservice is passed', async () => {
            mockSpawn = {
                on: jest.fn().mockImplementation((event, callback) => {
                    if (event === 'close') {
                        callback(0);
                    }
                })};
            const exitCode = await generateBoilerplateService.generateBoilerplate('projectId123', 'frontend', sampleConfig);
            expect(exitCode).toEqual([0]);
        });
    });
    it('should return array of relolved promises when backend microservice is passed', async () => {
        mockSpawn = {
            on: jest.fn().mockImplementation((event, callback) => {
                if (event === 'close') {
                    callback(0);
                }
            })};
        const exitCode = await generateBoilerplateService.generateBoilerplate('projectId123', 'backend', sampleConfig);
        expect(exitCode).toEqual([0,0,0]);
    });

    it('should return array of relolved promises when database microservice is passed', async () => {
        mockSpawn = {
            on: jest.fn().mockImplementation((event, callback) => {
                if (event === 'close') {
                    callback(0);
                }
            })};
        const response = await generateBoilerplateService.generateBoilerplate('projectId123', 'database', sampleConfig);
        expect(response).toEqual([0,0]);
    
    });
});