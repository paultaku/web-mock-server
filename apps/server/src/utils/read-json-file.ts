import * as fs from 'fs';

/**
 * Reads a JSON file and returns the parsed content.
 * @param filePath The path to the JSON file to read.
 * @returns The parsed JSON content or null if an error occurred.
 */
export function readJsonFile(filePath: string): string | null {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading JSON file at ${filePath}:`, error);
    return null;
  }
}
