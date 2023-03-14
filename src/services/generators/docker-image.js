var Docker = require("dockerode");
var docker = new Docker({ socketPath: "/var/run/docker.sock" });
const path = require("path");
const { OUTPUT_PATH } = require("../../constants/app.constants");
const getDirectoryNamesInsideFolder = require("../../utility/getDirectoryNamesInsideFolder");

const generateDockerImage = async (projectId, username) => {
  const projectDir = path.join(OUTPUT_PATH, projectId.toString());

  const boilerplateNames = await getDirectoryNamesInsideFolder(projectDir);

  await Promise.all(
    boilerplateNames.map(async (boilerplateName) => {
      const boilerplatePath = path.join(projectDir, boilerplateName);

      await docker.buildImage(
        {
          context: boilerplatePath,
          src: ["Dockerfile", "."],
        },
        { t: `${username}/${boilerplateName}` }
      );
    })
  );
};

module.exports = generateDockerImage;
