const mustache = require('mustache');
const fs = require('fs');
const serviceTemplatePaths = require('../../constants/serviceTemplatePaths');

const readTemplate = (path) => {
    return fs.promises.readFile(path, 'utf-8')
}

const writeDockerCompose = (path, data) => {
    return fs.promises.writeFile(path, data, 'utf-8')
}

const dockerComposeGenerator = (projectId, serviceType, config) => {
    try {
        const templatePath = serviceTemplatePaths[serviceType];

        if (!templatePath) {
            throw new Error(`Invalid service type: ${serviceType}`);
        }

        const projectDir = __dirname+`/../../constants/tmp/${projectId}`;

        if (!fs.existsSync(projectDir)) {
            fs.mkdirSync(projectDir);
        }

        const dockerComposePath = projectDir+'/docker-compose.yaml';

        readTemplate(templatePath)
            .then(template => mustache.render(template, config))
            .then(dockerComposeFile => writeDockerCompose(dockerComposePath, dockerComposeFile))
            .catch(err => console.log(err.message))
    } catch (err) {
        console.error(err);
    }
}

module.exports = { dockerComposeGenerator }
