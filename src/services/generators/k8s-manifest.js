const path = require("path");
const fs = require("fs").promises;
const { exec } = require("child_process");
const { OUTPUT_PATH } = require("../../constants/app.constants");
const ProjectDirectoryNotFoundException = require("../../exceptions/ProjectDirectoryNotFoundException");

const k8sManifestGenerator = async (projectId, dockerComposePath) => {
  try {
    try {
      await fs.stat(dockerComposePath);
    } catch (err) {
      throw new ProjectDirectoryNotFoundException(dockerComposePath);
    }

    const projectDir = path.join(OUTPUT_PATH, projectId.toString());

    try {
      await fs.stat(projectDir);
    } catch (err) {
      throw new ProjectDirectoryNotFoundException(projectDir);
    }

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
