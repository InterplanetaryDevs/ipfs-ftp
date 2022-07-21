import {create, IPFSHTTPClient} from 'ipfs-http-client';
import {concat as uint8ArrayConcat} from 'uint8arrays';
import {IpfsStat} from './IpfsStat';

export class IpfsFileSystem {
  private node: IPFSHTTPClient;

  constructor() {
    this.node = create();
  }

  writeFile(filename: string, data: any, options: any, callback: (err: any) => void) {
    console.log(filename, data, options);
    this.node.files.write(this.normalizePath(filename), data, {
      create: true,
      parents: true,
    })
      .then(callback)
      .catch(e => callback(e));
  }

  unlink(filename: string, callback: (err: any) => void) {
    this.node.files.rm(this.normalizePath(filename))
      .then(callback)
      .catch(e => callback(e));
  }

  async readFile(filename: string, callback: (err: any, contents: any) => void) {
    const chunks = [];

    for await (const chunk of this.node.files.read(this.normalizePath(filename))) {
      chunks.push(chunk);
    }

    callback(undefined, uint8ArrayConcat(chunks));
  }

  stat(path: string, callback: (err: any, stats: any) => void) {
    this.node.files.stat(this.normalizePath(path))
      .then(r => {
        callback(undefined, new IpfsStat(r));
      })
      .catch(e => callback(e, undefined));
  }

  mkdir(dirpath: string, permissions: number, callback: (err: any) => void) {
    this.node.files.mkdir(dirpath).then(callback).catch(callback);
  }

  private normalizePath(path: string): string {
    return path.replace(/\\/g, '/');
  }
}