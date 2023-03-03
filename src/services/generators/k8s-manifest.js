const path = require('path');
const { exec } = require('child_process');

const { OUTPUT_PATH } = require('../../constants/app.constants');
const dockerComposeGenerator = require('./docker-compose');

const k8sManifestGenerator = async (projectId, serviceType,config) => {

  try {
    const dockerComposePath = await dockerComposeGenerator(projectId, serviceType, config);
    const projectDir = path.join(OUTPUT_PATH, projectId.toString());
    const k8sManifestPath = path.join(projectDir, 'k8s-manifest.yaml');
    // console.log(k8sManifestPath);
    exec(`kompose convert -f ${dockerComposePath} -o ${k8sManifestPath}`, (error, stdout, stderr) => {
        if (error) {
            // console.log('hvghjvghj')
            console.error(`Error: ${error.message}`);
            return error;
        }
        if (stderr) {
            
            console.error(`stderr: ${stderr}`);
            return stderr;
        }

        console.log(`stdout: ${stdout}`);
    });
  } catch (err) {
    throw err;
  }
};

k8sManifestGenerator(1, 'FRONTEND', {
    name: 'frontend-application',
  port: 3000,
  internalPort: 3000,
  environment: [
    { name: 'BACKEND_API_URL', value: 'http://backend-application/8080' },
    { name: 'DEBUG', value: true },
  ],
  replicas: 3,
})


module.exports = k8sManifestGenerator;
