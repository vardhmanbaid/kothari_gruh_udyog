import path from 'path';
import { fileURLToPath } from 'url';

const fileName = fileURLToPath(import.meta.url);

const dirName = path.dirname(fileName);

export default [
  {
    find: '@assets',
    replacement: path.join(dirName, '../../packages/ui/assets'),
  },
  {
    find: '@atoms',
    replacement: path.join(dirName, '../../packages/ui/atoms'),
  },
  {
    find: '@components',
    replacement: path.join(dirName, '../../packages/ui/components'),
  },
  {
    find: '@graphql',
    replacement: path.join(dirName, '../../packages/ui/graphql'),
  },
];
