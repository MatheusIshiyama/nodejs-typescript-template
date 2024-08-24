import { LogColors } from '@interfaces/LoggerInterface';

export type LoggerType = 'SUCCESS' | 'INFO' | 'WARNING' | 'ERROR';

/* eslint no-console: "off" */
export function logger(type: LoggerType, title: string, message: string | unknown): void {
  const logColors: LogColors = {
    SUCCESS: '\x1b[32m',
    INFO: '\x1b[36m',
    WARNING: '\x1b[33m',
    ERROR: '\x1b[31m',
  };

  console.log(logColors[type]);
  console.log(`[${title}] ${message}`);
  console.log('\x1b[0m');
  if (['ERROR', 'WARNING'].includes(type)) console.log(message);
}
