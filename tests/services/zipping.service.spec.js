const fs = require('fs');
const path = require('path');
const { zipFolder } = require('../../src/services/zipping.service');
describe('Zipping Service', ()=>{
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should reject with an error if folder does not exists', async () => {
    const mockFolderPath = path.join(__dirname, 'nonExistingFolder');
    const mockOutputPath = path.join(__dirname, 'mockFolder.zip');
    await expect(zipFolder(mockFolderPath, mockOutputPath)).rejects.toBe(`Folder not found: ${mockFolderPath}`);
  });

  it('should reject with an error if there is a problem creating the zip file', async ()=>{
    jest.spyOn(fs, 'createWriteStream').mockImplementation(()=>{
      throw new Error('WriteStream error');
    });
    await expect(zipFolder('./tests', './output.zip')).rejects.toThrow('WriteStream error');
    fs.createWriteStream.mockRestore();
  });

  it('should zip a folder and return the archive details', async () => {
    const mockFolderPath = path.join(__dirname, 'mockFolder');
    const mockOutputPath = path.join(__dirname, 'mockFolder.zip');
    
    fs.mkdirSync(mockFolderPath);
    fs.writeFileSync(path.join(mockFolderPath, 'file1.txt'), 'file1 content');
    fs.writeFileSync(path.join(mockFolderPath, 'file2.txt'), 'file2 content');
    
    const outputZipPath= await zipFolder('tests/services/mockFolder', 'tests/services/mockFolder.zip');

    expect(outputZipPath).toBe(mockOutputPath);

    fs.rmSync(outputZipPath);
    fs.rmSync(mockFolderPath, { recursive: true });
  });

});

