/**
 * Created by maraujo on 9/30/17.
 */

export enum LogLevel {
  DEBUG = 0, INFO = 1, WARN = 2, ERROR = 3
}

export class ConsoleStyle {

  static styleError = [
    'font-size: 30px'
    , 'color: #F44336'
  ].join(';');

  static styleInfo = [
    'font-size: 20px'
    , 'color: #37474F'
  ].join(';');

  static styleWarn = [
    'font-size: 25px'
    , 'color: #FF9800'
  ].join(';');

  static log(message: string, logLevel: LogLevel = LogLevel.DEBUG): void {
    switch (logLevel) {
      case LogLevel.DEBUG:
        console.log(message);
        break;
      case LogLevel.INFO:
        console.log(`%c ${message}`, ConsoleStyle.styleInfo);
        break;
      case LogLevel.WARN:
        console.log(`%c ${message}`, ConsoleStyle.styleWarn);
        break;
      case LogLevel.ERROR:
        console.log(`%c ${message}`, ConsoleStyle.styleError);
        break;
    }
  }
}
