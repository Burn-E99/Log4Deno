# Log4Deno
V1.0.0 | 2021/05/26

Log4Deno is a simple client for logging actions to the console and to log files simultaneously.  This project was made to extract a block of duplicate logging code from multiple Deno projects into one concise location for easy updating.

When logging starts, Log4Deno verifies that the `combined` and `traces` folders exist in your desired `logs` folder, and then creates a file with today's date.  If a file already exists with today's date, Log4Deno will append to the file.  `traces` contains a full stack trace of where every Log4Deno message was called to aid in debugging.

## Requirements
Log4Deno requires Deno version `1.10.0` or greater.

## Usage
Below is a simple implementation of Log4Deno:

```ts
import {
	LogTypes,
	initLog,
	log
} from "https://github.com/Burn-E99/Log4Deno/blob/master/mod.ts";

initLog("logs", false);

log(LogTypes.INFO, "Hello World!");
```

You must add `--allow-write=./logs` and `--location=https://log4deno.local` to the run command of your project.  `./logs` may be changed to any folder, but the `initLog` call must match this setting, else Deno will not be able to run.  `https://log4deno.local` may be changed to any URL.  The URL must be kept the same between runs of your project to allow the logger to recover any messages that might not have made it to file the last time the project was closed.

By default, Log4Deno will write logs to file every 60 seconds, which can be adjusted in the initialization.  Simply change `initLog` to `initLog("logs", false, 10)` to write to file every 10 seconds.  Changing the debug mode to `true` will show any log messages with a level of `LogTypes.LOG` in the console.  These messages will be logged to file regardless of debug mode.

If you do not want to log messages to file, simply omit the initLog line and you will get a slightly fancier console output than normal.

Another exmple may be found in the `test` folder, along with example log files.