var Docker = require("dockerode");
var docker = new Docker({ socketPath: "/var/run/docker.sock" });
const path = require("path");
const { OUTPUT_PATH } = require("../constants/app.constants");
const getDirectoryNamesInsideFolder = require("../utility/getDirectoryNamesInsideFolder");

const pushDockerImage = async (
  projectId,
  username,
  token,
  email,
  serverAddress
) => {
  const projectDir = path.join(OUTPUT_PATH, projectId.toString());

  const boilerplateNames = await getDirectoryNamesInsideFolder(projectDir);

  try {
    await Promise.all(
      boilerplateNames.map(async (boilerplateName) => {
        const image = docker.getImage(`${username}/${boilerplateName}`);

        const stream = await image.push({
          authconfig: {
            username: username,
            password: token,
            email: email,
            serveraddress: serverAddress,
          },
        });

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
    console.error("Error pushing docker image", err);
  }
};

pushDockerImage(
  1,
  "preetindersingh",
  "dckr_pat_ZBLSfx2cNVg2ZUP6TFKULYRiV1Y",
  "preetindersingh072@gmail.com",
  "https://registry.hub.docker.com/"
);

module.exports = pushDockerImage;
