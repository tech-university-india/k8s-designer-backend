const archiver = require('archiver');
const fs = require('fs');
const path = require('path');

function zipFolder(folderPath, outputPath) {
  const outputFilePath = path.resolve(outputPath);
    
  return new Promise((resolve, reject) => {
    const resolvedFolderPath = path.resolve(folderPath);

    if (!fs.existsSync(resolvedFolderPath)) {
      reject(`Folder not found: ${resolvedFolderPath}`);
    }

    const folderName = path.parse(resolvedFolderPath).base;

    const output = fs.createWriteStream(outputFilePath);

    const archive = archiver('zip', {
      zlib: { level: 9 }
    });

    archive.pipe(output);
    archive.directory(resolvedFolderPath, folderName);
    archive.finalize();

    output.on('close', () => {
      resolve(outputFilePath);
    });

  });
}

module.exports = {
  zipFolder
};