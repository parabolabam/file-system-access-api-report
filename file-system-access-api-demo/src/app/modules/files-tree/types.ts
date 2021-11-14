
export type FileSystemHandle = {
  path: string;
  name: string;
  isDirectory: boolean;
  fileHandles?: FileSystemHandle[];
};
