import { Injectable, LoggerService } from '@nestjs/common';

enum LogLevel {
  LOG = 'LOG',
  WARN = 'WARN',
  DEBUG = 'DEBUG',
  ERROR = 'ERROR',
}

@Injectable()
export class ApplicationLogger implements LoggerService {
  log(message: any, context?: string) {
    this.isProduction()
      ? this.logJSONMessage(message, LogLevel.LOG, context)
      : this.logPlainMessage(message, LogLevel.LOG, context);
  }

  warn(message: any, context?: string) {
    this.isProduction()
      ? this.logJSONMessage(message, LogLevel.WARN, context)
      : this.logPlainMessage(message, LogLevel.WARN, context);
  }

  debug(message: any, context?: string) {
    if (!this.isProduction()) {
      this.logPlainMessage(message, LogLevel.DEBUG, context);
    }
  }

  error(message: any, context?: string) {
    if (message instanceof Error) {
      const err = message;

      this.isProduction()
        ? this.logJSONMessage(err.message, LogLevel.ERROR, err.stack)
        : this.logPlainMessage(err.message, LogLevel.ERROR, err.stack);
    } else {
      this.isProduction()
        ? this.logJSONMessage(message, LogLevel.ERROR, context)
        : this.logPlainMessage(message, LogLevel.ERROR, context);
    }
  }

  private isProduction() {
    return process.env.NODE_ENV === 'production';
  }

  private logJSONMessage(message: any, level: LogLevel, context?: string) {
    const now = new Date();
    const stringifiedMessage =
      typeof message === 'string' ? message : JSON.stringify(message);

    console.log(
      JSON.stringify({
        level,
        timestamp: +now,
        datetime: now.toISOString(),
        message: stringifiedMessage,
        context,
      }),
    );
  }

  private logPlainMessage(message: any, level: LogLevel, context?: string) {
    const now = new Date();
    const stringifiedMessage =
      typeof message === 'string' ? message : JSON.stringify(message);

    const plainMessage = [
      `[${level}]`,
      `[${now.toISOString()}]`,
      context ? `[${context}]` : null,
      stringifiedMessage,
    ]
      .filter(Boolean)
      .join(' ');

    console.log(plainMessage);
  }
}
