import chalk from '../../lib/chalk'

export const prefixes = {
  wait: chalk.white(chalk.bold(/*.cyan*/ '●')),
  error: chalk.red(chalk.bold(/*.red*/ 'X')),
  warn: chalk.yellow(chalk.bold(/*.yellow*/ '⚠')),
  ready: chalk.bold(/*.green*/ '▲'), // no color
  info: chalk.white(chalk.bold(/*.cyan*/ ' ')),
  event: chalk.green(chalk.bold(/*.magenta*/ '✓')),
  trace: chalk.magenta(chalk.bold(/*.magenta*/ ' ')),
}

export function now() {
  let date = new Date()
  let hour = date.getHours()
  let min = date.getMinutes()
  let sec = date.getSeconds()
  let mil = date.getMilliseconds()

  // pad start with 0 for single digit numbers
  const hourStr = hour < 10 ? '0' + hour : hour
  const minStr = min < 10 ? '0' + min : min
  const secStr = sec < 10 ? '0' + sec : sec

  // pad start with 0 for milliseconds to always show 3 digits
  const milStr = mil < 100 ? (mil < 10 ? '00' + mil : '0' + mil) : mil

  return `${hourStr}:${minStr}:${secStr}:${milStr}`
}

const timestampPrefixLength = now().length
export function bootstrap(...message: any[]) {
  console.log(' '.repeat(timestampPrefixLength) + ' ', ...message)
}

export function wait(...message: any[]) {
  console.log(now() + ' ' + prefixes.wait, ...message)
}

export function error(...message: any[]) {
  console.error(now() + ' ' + prefixes.error, ...message)
}

export function warn(...message: any[]) {
  console.warn(now() + ' ' + prefixes.warn, ...message)
}

export function ready(...message: any[]) {
  console.log(now() + ' ' + prefixes.ready, ...message)
}

export function info(...message: any[]) {
  console.log(now() + ' ' + prefixes.info, ...message)
}

export function event(...message: any[]) {
  console.log(now() + ' ' + prefixes.event, ...message)
}

export function trace(...message: any[]) {
  console.log(now() + ' ' + prefixes.trace, ...message)
}

const warnOnceMessages = new Set()
export function warnOnce(...message: any[]) {
  if (!warnOnceMessages.has(message[0])) {
    warnOnceMessages.add(message.join(' '))
    warn(...message)
  }
}
