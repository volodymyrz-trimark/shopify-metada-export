import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { validateEnvironmentVariables } from './config/environment.mjs';
import { getFilesInDirectory } from './utils/metadata-files.mjs';
import {
  processMetadataFile,
  createProgressBar,
} from './services/metadata-processor.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Main execution function
 * @returns {Promise<void>}
 */
async function run() {
  try {
    validateEnvironmentVariables();

    const metadataFilesPath = join(__dirname, './metadata-files');
    const metadataFiles = await getFilesInDirectory(metadataFilesPath);

    if (!metadataFiles || metadataFiles.length === 0) {
      console.warn('No metadata files found in ./metadata-files');
      return;
    }

    console.log(`Processing ${metadataFiles.length} metadata file(s)...`);

    const exportProgress = createProgressBar();

    for (const metadataFile of metadataFiles) {
      await processMetadataFile(
        metadataFilesPath,
        metadataFile,
        exportProgress
      );
    }

    exportProgress.stop();
    console.log('All metadata files processed successfully');
  } catch (error) {
    console.error('Fatal error:', error.message);
    process.exit(1);
  }
}

await run();
