import { createFileRecursive } from "./create-file-recursive";
import StatusDemo from "../demo/status.json";
/**
 * 根据 API 路径生成对应的文件路径，并使用 src/config/status.json 的内容创建 JSON 文件。
 * @param apiPath API 路径，例如 '/v1/api/users'
 */

export function generateFileFromApiPath(apiPath: string): Promise<void> {
  const apiFilePath = `${apiPath}/status.json`;
  return createFileRecursive(apiFilePath, JSON.stringify(StatusDemo))
    .then(() => console.log(`File created at ${apiFilePath}`))
    .catch((error) =>
      console.error(`Failed to create file at ${apiFilePath}:`, error)
    );
}
