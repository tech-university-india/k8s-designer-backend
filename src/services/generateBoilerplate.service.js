const { spawn } = require('child_process');

const generateBoilerplate = (generator, action, config, isTestRun) => {
  return new Promise((resolve, reject) => {
    const hygenProcess = spawn('npx', ['hygen', generator, action, '--config', JSON.stringify(config), (isTestRun && '--dry'),]);
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