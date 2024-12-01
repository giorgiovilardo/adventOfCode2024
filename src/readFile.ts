import { promises as fs } from "fs";
import { join } from "path";

export async function readFile(fileName: string): Promise<string> {
  const filePath = join(__dirname, "..", "resources", fileName);
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return data;
  } catch (error) {
    console.error(`Error reading from ${fileName}: `, error);
    throw error;
  }
}
