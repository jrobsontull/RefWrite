import fs from 'fs';

// Asynchronous method for checking if a file exists
const checkFileExistsAsync = (path: string): Promise<boolean> => {
  return fs.promises
    .access(path, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false);
};

const checkFileExistsSync = (path: string): boolean => {
  return fs.existsSync(path);
};

export { checkFileExistsAsync, checkFileExistsSync };
