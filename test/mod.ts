import { initLog, log, LogTypes as LT } from '../mod.ts';

// Initializes the logger to output logs to the folder logs, without showing any debug messages (LT.LOG), with a write timing of once per second
initLog('logs', false, 1);

// Loop to fill the logs at various levels
let i = 0;
const loop = setInterval(() => {
  log(LT.ERROR, `Loop #${i} | Message as Error`);
  log(LT.WARN, `Loop #${i} | Message as Warning`);
  log(LT.INFO, `Loop #${i} | Message as Info`);
  log(LT.LOG, `Loop #${i} | Message as Log | This should not be in console when debug mode is false, but should still show up in the log file`);
  i++;
}, 100);

// Stop the loops after some time
setTimeout(() => {
  clearInterval(loop);
  log(LT.INFO, 'Ending logging');

  setTimeout(() => {
    Deno.exit();
  }, 5000);
}, 5500);
