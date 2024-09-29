import * as fs from "fs";
import * as path from "path";

/**
 * Recursively creates a file with the specified content at the given path.
 * If the directories in the path do not exist, they are created.
 * @param filePath The path to the file to create.
 * @param content The content to write to the file.
 */
export function createFileRecursive(
  filePath: string,
  content: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    const dirPath = path.dirname(filePath);

    // Ensure the directory exists
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    // Write the content to the file
    fs.writeFileSync(filePath, content);

    resolve();
  });
}
