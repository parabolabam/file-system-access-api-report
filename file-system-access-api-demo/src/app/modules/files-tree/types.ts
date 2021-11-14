export type FileSystemHandle = {
  path: string;
  name: string;
  id: string;
  handle: any;
  fileHandles?: FileSystemHandle[];
};

export type TreeFile = FileSystemHandle & { collapsed?: boolean };
