import { readdir } from "node:fs/promises";

export async function getFilesInDirectory(dirPath) {
  try {
    const files = await readdir(dirPath);
    console.log("Files in directory:", files);
    return files.filter((f) => f.endsWith(".json") && !f.startsWith("skip"));
  } catch (err) {
    console.error("Error reading directory:", err);
    throw err;
  }
}


