import fs from 'fs';

interface IFileReader {
  isJSONFile(file: string): boolean;
  readText(file: string): string;
  readJSON(file: string): unknown;
}

const createDirScraper = (fileReader: IFileReader) => {
  return (dirPath: string) =>
    fs
      .readdirSync(dirPath)
      .reduce<Record<string, unknown>>(
        (acc: Record<string, unknown>, file: string) => {
          if (fileReader.isJSONFile(file)) {
            acc[file] = fileReader.readJSON(`${dirPath}/${file}`);
          } else {
            acc[file] = fileReader.readText(`${dirPath}/${file}`);
          }
          return acc;
        },
        {}
      );
};

const fileReader: IFileReader = {
  isJSONFile(file: string): boolean {
    return file.endsWith('.json');
  },

  readText(file: string): string {
    return fs.readFileSync(file, 'utf-8').toString();
  },

  readJSON(file: string): unknown {
    return JSON.parse(fs.readFileSync(file, 'utf-8').toString());
  },
};

const dirScraper = createDirScraper(fileReader);
const output = dirScraper('./data');
console.log('🚀 ~ file: builder-class.ts:46 ~ output:', output);
