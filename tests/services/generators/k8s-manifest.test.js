const { exec } = require('child_process');

const { k8sManifestGenerator } = require('../../../src/services/generators/k8s-manifest');

jest.mock('child_process');

describe('k8sManifestGenerator', () => {
    let execStub;
    let mockFs;

    beforeAll(() => {
        execStub = sinon.stub(exec, 'exec');
        execStub.callsArgWith(1, 'mocked manifest file');
        // mockFs = mock({
        //     '/Users/Dilip_Singh/Documents/latestK8s/k8s-designer-backend/tmp/1/docker-compose.yaml': 'mocked docker compose file',
        // });
    });

    // afterAll(() => {
    //     execStub.restore();
    //     // mockFs.restore();
    // });

    // afterEach(() => {
    //     mockFs.restore();
    // });


    it('should generate a k8s-manifest.yaml file', async () => {
        mockFs = mock({
            '/Users/Dilip_Singh/Documents/latestK8s/k8s-designer-backend/tmp/1/docker-compose.yaml': 'mocked docker compose file',
        });

        await k8sManifestGenerator(1, '/Users/Dilip_Singh/Documents/latestK8s/k8s-designer-backend/tmp/1/docker-compose.yaml');
        expect(exec(`kompose convert -f ${dockerComposeFilePath} -o kubernetes`)).toBe(true);

        // expect(execStub.calledOnce).toBe(true);
    });

    // it('should throw an error if docker-compose.yaml file does not exist', async () => {
    //     await expect(k8sManifestGenerator(1, '/Users/Dilip_Singh/Documents/latestK8s/k8s-designer-backend/tmp/1/docker-compose.yaml')).rejects.toThrowError();
    // });

    // it('should throw an error if project directory does not exist', async () => {
    //     await expect(k8sManifestGenerator(1, '/Users/Dilip_Singh/Documents/latestK8s/k8s-designer-backend/tmp/1/docker-compose.yaml')).rejects.toThrowError();

    // });

});

