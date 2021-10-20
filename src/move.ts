import {
  CannotMoveFolder,
  DestinationCannotBeFile,
  DestinationNotFound,
  SourceNotFound,
} from './errors';
import search from './search';

type File = { id: string; name: string };
type Folder = { id: string; name: string; files: File[] };

export type List = Folder[];

export default function move(list: List, source: string, destination: string): List {
  const [sourcePath, destinationPath] = search(list, [source, destination]);
  if (!sourcePath) {
    throw SourceNotFound;
  }

  if (sourcePath.type === 'folder') {
    throw CannotMoveFolder;
  }

  if (!destinationPath) {
    throw DestinationNotFound;
  }

  if (destinationPath.type === 'file') {
    throw DestinationCannotBeFile;
  }

  const [file] = list[sourcePath.folderIndex].files.splice(sourcePath.fileIndex, 1);
  list[destinationPath.folderIndex].files.push(file);

  return list;
}
