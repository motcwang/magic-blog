import * as log4js from 'log4js';
import path from 'path';
import config from '../config';
import chalk from 'chalk';

const logLevel: string = config.logLevel;

log4js.configure({
  appenders: {
    console: {
      type: 'console'
    },
    fileLog: {
      type: 'dateFile',
      filename: path.resolve(__dirname, '../../.logs/app.log'),
      daysToKeep: 7,
      maxLogSize: 10 * 1024 * 1024, // = 10Mb
      compress: true, // compress the backups
      pattern: '.yyyy-MM-dd',
      alwaysIncludePattern: true // The output log file names always contain the end of the pattern date
    }
  },
  categories: {
    default: {
      appenders: ['console', 'fileLog'],
      level: logLevel
    }
  }
});

const logger = log4js.getLogger();

export class Logger {
  public static create(tag: string): Logger {
    return new Logger(tag);
  }

  private tag: string;
  public constructor(tag: string) {
    this.tag = tag;
  }

  public log(message: any, ...args: any[]): void {
    this._log('log', message, ...args);
  }

  public trace(message: any, ...args: any[]): void {
    this._log('trace', message, ...args);
  }

  public debug(message: any, ...args: any[]): void {
    this._log('debug', message, ...args);
  }

  public info(message: any, ...args: any[]): void {
    this._log('info', message, ...args);
  }

  public green(message: any, ...args: any[]): void {
    this._log('green', message, ...args);
  }

  public pink(message: any, ...args: any[]): void {
    this._log('pink', message, ...args);
  }

  public warn(message: any, ...args: any[]): void {
    this._log('warn', message, ...args);
  }

  public error(message: any, ...args: any[]): void {
    this._log('error', message, ...args);
  }

  public fatal(message: any, ...args: any[]): void {
    this._log('fatal', message, ...args);
  }

  private _log(method: string, message: any, ...args: any[]): void {
    if (!message) {
      return;
    }
    let msg = message;
    let params = args;
    if (!args || args.length === 0) {
      params = [''];
    }
    if (typeof msg === 'object') {
      params = [msg].concat(params);
      msg = '%o';
    }
    msg = `[${this.tag}] - ${msg}`;
    switch (method) {
      case 'log':
        logger.log(msg, ...params);
        break;
      case 'trace':
        logger.trace(msg, ...params);
        break;
      case 'info':
        logger.info(msg, ...params);
        break;
      case 'green':
        logger.info(chalk.green(msg), ...params);
        break;
      case 'pink':
        logger.info(chalk.hex('#FFAEB9')(msg), ...params);
        break;
      case 'warn':
        logger.warn(chalk.yellow(msg), ...params);
        break;
      case 'error':
        logger.error(chalk.redBright(msg), ...params);
        break;
      case 'fatal':
        logger.fatal(msg, ...params);
        break;
    }
  }
}
