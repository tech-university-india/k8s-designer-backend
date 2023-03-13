var Docker = require("dockerode");
var docker = new Docker({ socketPath: "/var/run/docker.sock" });
const path = require("path");
const { OUTPUT_PATH } = require("../../constants/app.constants");
const getDirectoryNamesInsideFolder = require("../../utility/getDirectoryNamesInsideFolder");

const generateDockerImage = async (projectId, username) => {
  const projectDir = path.join(OUTPUT_PATH, projectId.toString());

  const boilerplateNames = await getDirectoryNamesInsideFolder(projectDir);

  try {
    await Promise.all(
      boilerplateNames.map(async (boilerplateName) => {
        const boilerplatePath = path.join(projectDir, boilerplateName);

        const stream = await docker.buildImage(
          {
            context: boilerplatePath,
            src: ["Dockerfile"],
          },
          { t: `${username}/${boilerplateName}` }
        );

        let data = "";

        stream.on("data", (chunk) => {
          data += chunk;

          console.log("incoming", data);
        });

        stream.on("end", () => {
          console.log("ended", data);
        });
      })
    );
  } catch (err) {
    console.error("Error generating docker image", err);
  }
};

generateDockerImage(1, "preetindersingh");

module.exports = generateDockerImage;
