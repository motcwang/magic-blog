import http from 'http';
// eslint-disable-next-line no-unused-vars
import Koa from 'koa';
import config from '../../../config';
import { Logger as LoggerCls } from '../../../common/logger';

const Logger = LoggerCls.create('http_server');

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(config.httpServer.port);

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val: string) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

export class HttpServer {
  public static async create(app: Koa) {
    return new HttpServer({
      app
    });
  }

  private server: http.Server;
  public constructor({ app }: { app: Koa }) {
    this.server = http.createServer(app.callback());

    // Listen on provided port, on all network interfaces.
    this.server.listen(port);
    this.server.on('error', this._onError);
    this.server.on('listening', () => {
      this._onListening();
    });
  }

  public get httpServer(): http.Server {
    return this.server;
  }

  /**
   * Event listener for HTTP server "error" event.
   */
  private _onError(error: any) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        Logger.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        Logger.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  /**
   * Event listener for HTTP server "listening" event.
   */
  private _onListening(): void {
    const addr = this.server.address();
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    Logger.green('Listening on ' + bind);
  }
}
