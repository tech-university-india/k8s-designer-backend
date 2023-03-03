const path = require("path");
const { exec } = require("child_process");
const { OUTPUT_PATH } = require("../../constants/app.constants");

const k8sManifestGenerator = async (projectId, dockerComposePath) => {
  try {
    const projectDir = path.join(OUTPUT_PATH, projectId.toString());
    const k8sManifestPath = path.join(projectDir, "k8s-manifest.yaml");

    exec(
      `kompose convert -f ${dockerComposePath} -o ${k8sManifestPath}`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error: ${error.message}`);
          return error;
        }
        if (stderr) {
          console.error(`stderr: ${stderr}`);
          return stderr;
        }

        console.log(`stdout: ${stdout}`);
      }
    );
  } catch (err) {
    throw err;
  }
};

module.exports = k8sManifestGenerator;
