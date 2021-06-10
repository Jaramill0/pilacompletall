// importando a winston
import winston, { format } from 'winston';
import appRoot from 'app-root-path';
// Componentes para crear el formato personalizado
const { combine, timestamp, printf, uncolorize, json, colorize } = format;
// creando el color Perfil de color para el Log
const colors = {
  error: 'error',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'green',
};
// Agregando el Perfil a wiinston
winston.addColors(colors);

// formato de consola
const myFormat = combine(
  colorize({ all: true }),
  timestamp(),
  printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
);

// Formato para la salida de los archivos de Log
const myFileFormat = combine(uncolorize(), timestamp(), json());

// Creando Objetos de configuracion
const options = {
  infoFile: {
    level: 'info',
    filename: `${appRoot}/server/logs/infos.log`,
    handleExceptions: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    format: myFileFormat,
  },
  warningFile: {
    level: 'warn',
    filename: `${appRoot}/server/logs/warns.log`,
    handleExceptions: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    format: myFileFormat,
  },
  errorFile: {
    level: 'error',
    filename: `${appRoot}/server/logs/erros.log`,
    handleExceptions: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    format: myFileFormat,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    format: myFormat,
  },
};

// Creando la instancia del Logger
const logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.infoFile),
    new winston.transports.File(options.warningFile),
    new winston.transports.File(options.errorFile),
    new winston.transports.Console(options.console),
  ],
  exitOnError: false, // No finaliza en excepsiones manejadas
});

// Manejo de un Stream de entrada
logger.stream = {
  write(message) {
    logger.info(message);
  },
};

export default logger;
