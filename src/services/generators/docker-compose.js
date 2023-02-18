const mustache = require('mustache');
const fs = require('fs').promises;
const path = require('path');
const serviceTemplatePaths = require('../../constants/serviceTemplatePaths');

const dockerComposeGenerator = async (projectId, serviceType, config) => {
    try {
        const templatePath = serviceTemplatePaths[serviceType];

        if (!templatePath) {
            throw new Error(`Invalid service type: ${serviceType}`);
        }

        const projectDir = path.join(__dirname, `../../constants/tmp/${projectId}`);

        try {
            await fs.access(projectDir);
        } catch(err) {
            await fs.mkdir(projectDir);
        }

        const dockerComposePath = path.join(projectDir, 'docker-compose.yaml');

        const template = await fs.readFile(templatePath, 'utf-8');
        const dockerComposeFile = mustache.render(template, config);
        await fs.writeFile(dockerComposePath, dockerComposeFile, 'utf-8');
    } catch (err) {
        console.error(err.message);
    }
}

module.exports = dockerComposeGenerator;
