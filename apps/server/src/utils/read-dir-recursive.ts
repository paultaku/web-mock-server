import fs from 'fs';
import path from 'path';

export function readDirRecursive(dirPath, basePath = dirPath): string[] {
  const results = [];
  const list = fs.readdirSync(dirPath, { withFileTypes: true });
  list.forEach((file) => {
    const fullPath = path.join(dirPath, file.name);
    const relativePath = path.relative(basePath, fullPath);
    if (file.isDirectory()) {
      results.push(...readDirRecursive(fullPath, basePath));
    } else if (file.name === 'status.json') {
      results.push(relativePath);
    }
  });
  return results;
}
