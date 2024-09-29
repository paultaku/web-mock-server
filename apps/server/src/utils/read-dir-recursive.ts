import fs from 'fs';
import path from 'path';

export function readDirRecursive(dirPath, basePath = dirPath): string[] {
  let results = [];
  const list = fs.readdirSync(dirPath, { withFileTypes: true });
  list.forEach((file) => {
    const fullPath = path.join(dirPath, file.name);
    const relativePath = path.relative(basePath, fullPath);
    if (file.isDirectory()) {
      results = results.concat(readDirRecursive(fullPath, basePath));
    } else {
      results.push(relativePath);
    }
  });
  return results;
}
