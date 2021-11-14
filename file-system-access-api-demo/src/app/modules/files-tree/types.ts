export type FileSystemHandle = {
  path: string;
  name: string;
  id: string;
  fileHandles?: FileSystemHandle[];
};

export type TreeFile = FileSystemHandle & { collapsed?: boolean };
