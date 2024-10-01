import { createFileRecursive } from './create-file-recursive';
import path from 'path';
import fs from 'fs';

/**
 * 根据 API 路径生成对应的文件路径，并使用 src/config/status.json 的内容创建 JSON 文件。
 * @param apiPath API 路径，例如 '/v1/api/users'
 */
export interface generateFileFromApiPathVariable {
  baseFolder: string;
  apiPath: string;
  method: string;
}

export function generateFileFromApiPath(
  params: generateFileFromApiPathVariable
): Promise<{ success: boolean; message: string }> {
  const apiFilePath = path.join(
    params.baseFolder,
    params.apiPath,
    params.method
  );
  const folderPath = path.join(apiFilePath);
  if (fs.existsSync(folderPath)) {
    return Promise.reject({
      success: false,
      message: `File already exists at ${apiFilePath}`,
    });
  }
  const createFiles = new Promise<void>((resolve, reject) => {
    const demoFolderPath = path.join(__filename, '../demo');
    try {
      const demoFiles = fs.readdirSync(demoFolderPath);
      demoFiles.forEach((file) => {
        const filePath = path.join(demoFolderPath, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        createFileRecursive(path.join(apiFilePath, file), fileContent);
      });
      resolve();
    } catch (error) {
      reject(error);
      console.error('Error reading demo files:', error);
    }
  });
  return createFiles
    .then(() => {
      return {
        success: true,
        message: `File created successfully at ${apiFilePath}`,
      };
    })
    .catch((error) => {
      return {
        success: false,
        message: `Failed to create file at ${apiFilePath}: ${error}`,
      };
    });
}
