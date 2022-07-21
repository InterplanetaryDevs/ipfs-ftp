import {FtpServer} from 'ftpd';
import {IpfsFileSystem} from './IpfsFileSystem';

const options = {
  host: process.env.IP || '127.0.0.1',
  port: process.env.PORT || 7002,
};

const fs = new IpfsFileSystem();
const server = new FtpServer(options.host, {
  getInitialCwd: function () {
    return '/';
  },
  getRoot: function () {
    return '/';
  },
  pasvPortRangeStart: 1025,
  pasvPortRangeEnd: 1050,
  tlsOptions: undefined,
  allowUnauthorizedTls: true,
  useWriteFile: true,
  useReadFile: true,
  uploadMaxSlurpSize: 7000, // N/A unless 'useWriteFile' is true.
});

server.on('error', function (error) {
  console.log('FTP Server error:', error);
});

server.on('client:connected', function (connection) {
  let username: string;
  console.log('client connected: ' + connection.remoteAddress);
  connection.on('command:user', (user: string, success: () => void, failure: () => void) => {
    if (user) {
      username = user;
      success();
    } else {
      failure();
    }
  });

  connection.on('command:pass', function (pass: string, success: (data: any, fs: any) => void, failure: () => void) {
    if (pass) {
      success(username, fs);
    } else {
      failure();
    }
  });
});

server.debugging = 4;
// server.listen(options.port);
server.listen(7002);