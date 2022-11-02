import {StatResult} from 'ipfs-core-types/src/files';

export class IpfsStat {
  constructor(private readonly stat: StatResult) {
    this.fileTime = new Date();
  }

  get dev() {
    return 0;
  }

  get mode() {
    return this.stat.mode ?? 16877;
  }

  get nlink() {
    return 19;
  }

  get uid() {
    return 0;
  }

  get gid() {
    return 0;
  }

  get rdev() {
    return 0;
  }

  get blksize() {
    return 4096; //TODO
  }

  get ino() {
    return 6184580;
  }

  get size() {
    return this.stat.size;
  }

  get blocks() {
    return this.stat.blocks;
  }

  get atime() {
    return this.fileTime;
  }

  get mtime() {
    return this.fileTime;
  }

  get ctime() {
    return this.fileTime;
  }

  get birthtime() {
    return this.fileTime;
  }

  isFile() {
    return this.stat.type === 'file';
  }

  isDirectory() {
    return this.stat.type === 'directory';
  }

  isBlockDevice() {
    return false;
  }

  isCharacterDevice() {
    return false;
  }

  isSymbolicLink() {
    return false;
  }

  isFIFO() {
    return false;
  }

  isSocket() {
    return false;
  }

  private fileTime: Date;
}