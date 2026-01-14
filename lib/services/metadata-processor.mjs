import * as cliProgress from 'cli-progress';
import { CONFIG } from '../config/constants.mjs';
import { definitionMapper } from '../mappers/definition.mjs';
import { createMetafieldDefinition } from './shopify-api.mjs';
import { sleep } from '../utils/helpers.mjs';

/**
 * Processes a single metadata file
 * @param {string} metadataFilesPath - Path to metadata files directory
 * @param {string} metadataFile - Name of the metadata file
 * @param {cliProgress.MultiBar} progressBar - Progress bar instance
 * @returns {Promise<void>}
 */
export async function processMetadataFile(
  metadataFilesPath,
  metadataFile,
  progressBar
) {
  const { default: metadata } = await import(
    `${metadataFilesPath}/${metadataFile}`,
    {
      with: {type: 'json'},
    }
    );

  const nodes = metadata?.data?.metafieldDefinitions?.nodes || [];

  if (nodes.length === 0) {
    console.warn(`No metafield definitions found in ${metadataFile}`);
    return;
  }

  const fileBar = progressBar.create(nodes.length, 0);

  for (const [index, node] of nodes.entries()) {
    if (node.namespace === CONFIG.SKIP_NAMESPACE) {
      fileBar.increment({ filename: metadataFile });
      continue;
    }

    try {
      await sleep(CONFIG.RATE_LIMIT_DELAY_MS);
      const mappedDefinition = definitionMapper(node);
      await createMetafieldDefinition(mappedDefinition);
      fileBar.update(index + 1, { filename: metadataFile });
    } catch (error) {
      console.error(
        `Error processing ${node.name} in ${metadataFile}:`,
        error.message
      );
      fileBar.update(index + 1, { filename: metadataFile });
    }
  }
}

/**
 * Creates and configures the progress bar
 * @returns {cliProgress.MultiBar} Configured progress bar instance
 */
export function createProgressBar() {
  return new cliProgress.MultiBar(
    {
      clearOnComplete: false,
      hideCursor: true,
      format: CONFIG.PROGRESS_BAR_FORMAT,
    },
    cliProgress.Presets.shades_grey
  );
}
