const childProcess = require('child_process');
const path = require('path');
const { OUTPUT_PATH } = require('../../constants/app.constants');

const generateBoilerplate = (projectId, generator, action, config) => {
    const projectDir = path.join(OUTPUT_PATH, projectId.toString());
    return new Promise((resolve, reject) => {
        const hygenProcess = childProcess.spawn('npx', ['hygen', generator, action, '--outputPath', projectDir, '--config', JSON.stringify(config),]);
        // hygenProcess.stdout.on('data', data => {
        //   console.log(`stdout: ${data}`);
        // });
        // hygenProcess.stderr.on('data', data => {
        //   console.log(`stderr: ${data}`);
        // });
        hygenProcess.on('close', code => {
            if (code === 0) {
                resolve(code);
            } else {
                reject(code);
            }
        });
    });
};

module.exports = generateBoilerplate;