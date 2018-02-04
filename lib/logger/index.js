/* eslint-disable no-console */
const chalk = require('chalk');

const logTypes = {
  warn: {
    bg: 'bgYellow',
    msg: ' WARNING ',
    text: 'yellow',
  },
  debug: {
    bg: 'bgMagenta',
    msg: ' DEBUG ',
    text: 'magenta',
  },
  info: {
    bg: 'bgCyan',
    msg: ' INFO ',
    text: 'cyan',
  },
  error: {
    bg: 'bgRed',
    msg: ' ERROR ',
    text: 'red',
  },
  start: {
    bg: 'bgBlue',
    msg: ' WAIT ',
    text: 'blue',
  },
  done: {
    bg: 'bgGreen',
    msg: ' DONE ',
    text: 'green',
  },
  title: {
    bg: 'bgMagenta',
    msg: ' TITLE MISSING ',
    text: 'magenta',
  },
};

/**
 * Logger function to log to console
 * @param {String} type - Type of message or special title
 * @param {String} text - Log message
 * @param {Object} verbose - Log data
 * @param {String} strongTxt - Title message with background
 */
function write(type, text, verbose, strongTxt) {
  let textToLog = '';
  let logObject = false;
  const logType = logTypes[type];

  if (strongTxt) {
    logType.msg = ` ${strongTxt.toUpperCase()} `;
  }

  textToLog += `${chalk[logType.bg].black(logType.msg)} ${chalk[logType.text](text)}`;

  // Adds optional verbose output
  if (verbose) {
    if (typeof verbose === 'object') {
      logObject = true;
    } else {
      textToLog += `\n\n${verbose}`;
    }
  }

  console.log(textToLog);
  if (['start', 'done', 'error'].indexOf(type) > -1) {
    console.log();
  }

  if (logObject) console.dir(verbose, { depth: 15 });
}

/**
 * Printing any statements
 * @param {String} text - Message to log
 */
function log(text = '') {
  console.log(text);
}

/**
 * Starting message
 * @param {String} text - Message to log
 */
function start(text) {
  write('start', text);
}

/**
 * Done message
 * @param {String} text - Message to log
 */
function done(text) {
  write('done', text);
}

/**
 * Info message
 * @param {String} text - Message to log
 */
function info(text) {
  write('info', text);
}

/**
 * Verbose output which takes optional data
 * @param {String} text - Message to log
 * @param {Object} data - Verbose data
 */
function debug(text, data) {
  write('debug', text, data);
}

/**
 * Warning output which takes optional data
 * @param {String} text - Message to log
 * @param {Object} data - Verbose data
 */
function warn(text, data) {
  write('warn', text, data);
}

/**
 * Error output which takes optional err
 * @param {String} text - Message to log
 * @param {Object} err - Verbose err
 */
function error(text, err) {
  write('error', text, err);
}

/**
 * Message with specific title
 * @param {String} strong - Strong title text
 * @param {String} text - Text to log
 */
function title(strong, text) {
  write('title', text, null, strong);
}

module.exports = {
  log,
  info,
  debug,
  warn,
  error,
  start,
  done,
  title,
};
