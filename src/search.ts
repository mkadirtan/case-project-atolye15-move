import type { List } from './move';

type SearchResultFolder = { type: 'folder'; folderIndex: number };
type SearchResultFile = { type: 'file'; folderIndex: number; fileIndex: number };
type SearchResult = SearchResultFolder | SearchResultFile;

export default function search(list: List, ids: string[]): (SearchResult | null)[] {
  const result: (SearchResult | null)[] = new Array<null>(ids.length).fill(null);
  for (let i = 0; i < list.length; i += 1) {
    const folder = list[i];
    const folderResultIndex = ids.indexOf(folder.id);
    if (folderResultIndex !== -1) {
      ids.splice(folderResultIndex, 1);
      result[folderResultIndex] = { type: 'folder', folderIndex: i };
      if (result.indexOf(null) === -1) {
        return result;
      }
    }

    const { files } = folder;
    for (let j = 0; j < files.length; j += 1) {
      const file = files[j];
      const fileResultIndex = ids.indexOf(file.id);
      if (fileResultIndex !== -1) {
        ids.splice(fileResultIndex, 1);
        result[fileResultIndex] = { type: 'file', folderIndex: i, fileIndex: j };
        if (result.indexOf(null) === -1) {
          return result;
        }
      }
    }
  }

  return result;
}
