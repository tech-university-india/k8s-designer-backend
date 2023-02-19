const mustache = require('mustache');
const fs = require('fs').promises;
const path = require('path');
const {TEMPLATE_PATH, UTF8_ENCODING, TEMP_PATH} = require('../../constants/app.constants');
const InvalidServiceTypeException = require('../../exceptions/InvalidServiceTypeException');
const ProjectDirectoryNotFoundException = require('../../exceptions/ProjectDirectoryNotFoundException');

const dockerComposeGenerator = async (projectId, serviceType, config) => {
    try {
        const templatePath = TEMPLATE_PATH[serviceType];

        if (!templatePath) {
            throw new InvalidServiceTypeException(serviceType);
        }

        const projectDir = path.join(TEMP_PATH, projectId.toString());

        try {
            await fs.stat(projectDir);
        } catch(err) {
            throw new ProjectDirectoryNotFoundException(projectDir);
        }

        const dockerComposePath = path.join(projectDir, 'docker-compose.yaml');

        const template = await fs.readFile(templatePath, UTF8_ENCODING);
        const dockerComposeFile = mustache.render(template, config);
        await fs.writeFile(dockerComposePath, dockerComposeFile, UTF8_ENCODING);
    } catch (err) {
        throw err;
    }
}

module.exports = dockerComposeGenerator;
