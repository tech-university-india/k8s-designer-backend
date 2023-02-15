const archiver = require('archiver');
const fs = require('fs');
const path = require('path');

function zipFolder(folderPath) {
  const outputFilePath = path.resolve('output.zip');

  return new Promise((resolve, reject) => {
    console.log(`Creating zip file for folder: ${folderPath}`);
    const resolvedFolderPath = path.resolve(folderPath);
    if (!fs.existsSync(resolvedFolderPath)) {
      reject(`Folder not found: ${resolvedFolderPath}`);
    }
    const folderName = path.parse(resolvedFolderPath).base;
    const output = fs.createWriteStream(outputFilePath);

    const archive = archiver('zip', {
      zlib: { level: 9 }
    });

    archive.on('warning', (err) => {
      if (err.code === 'ENOENT') {
        console.warn(err);
      } else {
        reject(err);
      }
    });

    archive.on('error', (err) => {
      reject(err);
    });

    archive.pipe(output);

    archive.directory(resolvedFolderPath, folderName);

    archive.finalize();

    output.on('close', () => {
      const bytesWritten = output.bytesWritten;
      console.log(`Archive written to ${outputFilePath} (${bytesWritten} bytes)`);
      resolve(outputFilePath);
    });

    output.on('error', (err) => {
      reject(err);
    });
  });
}

// Usage:
zipFolder('src/services/abcd')
  .then((outputFilePath) => {
    console.log(`Zip file created at ${outputFilePath}`);
  })
  .catch((err) => {
    console.error(`Error creating zip file: ${err}`);
  });
