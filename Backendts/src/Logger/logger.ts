import winston, { Logger } from 'winston';
const infologger:Logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.json()  // Log messages as JSON
    ),
 
    transports: [
     
      new winston.transports.File({ filename: './info.log', level: 'info' }),
      
    ]
  });
  const errorlogger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
 
    transports: [
     
      new winston.transports.File({ filename: './error.log', level: 'error' })
     
    ],
  });
  export { infologger, errorlogger };
  // const dblogger= winston.createLogger({
  //   level: 'info',
  //   format: winston.format.json(),
 
  //   transports: [
     
  //     new winston.transports.File({ filename: 'error.log', level: 'error' }),
  //     new winston.transports.File({ filename: 'combined.log' }),
  //   ],
  // });
