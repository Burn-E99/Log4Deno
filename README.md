# Log4Deno | V2.1.1 - 2025/04/26

[![SonarCloud](https://sonarcloud.io/images/project_badges/sonarcloud-orange.svg)](https://sonarcloud.io/summary/new_code?id=Log4Deno)\
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=Log4Deno&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=Log4Deno) [![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=Log4Deno&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=Log4Deno) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Log4Deno&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Log4Deno) [![Bugs](https://sonarcloud.io/api/project_badges/measure?project=Log4Deno&metric=bugs)](https://sonarcloud.io/summary/new_code?id=Log4Deno) [![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=Log4Deno&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=Log4Deno) [![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=Log4Deno&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=Log4Deno)

Log4Deno is a simple client for logging actions to the console and to log files simultaneously. This project was made to extract a block of duplicate logging code from multiple Deno projects into one concise location for easy updating.

When logging starts, Log4Deno verifies that the `combined` and `traces` folders exist in your desired `logs` folder, and then creates a file with today's date. If a file already exists with today's date, Log4Deno will append to the file. `traces` contains a full stack trace of where every Log4Deno message was called to aid in debugging.

## Requirements

Log4Deno `V1.1.1` and lower requires Deno version `1.10.0` or greater.\
Log4Deno `V2.0.0` and up requires Deno version `2.0.0` or greater.

## Usage

Below is a simple implementation of Log4Deno using the bleeding edge version of Log4Deno:

```ts
import { initLog, log, LogTypes } from 'https://raw.githubusercontent.com/Burn-E99/Log4Deno/master/mod.ts';

initLog('logs', false);

log(LogTypes.INFO, 'Hello World!');
```

To use a version locked Log4Deno version, use this URL: `https://raw.githubusercontent.com/Burn-E99/Log4Deno/V2.0.0/mod.ts`.

You must add `--allow-write=./logs` to the run command of your project. `./logs` may be changed to any folder, but the `initLog` call must match this setting, else Deno will not be able to run.

By default, Log4Deno will write logs to file every 1 second, which can be adjusted in the initialization. Simply change `initLog` to `initLog("logs", false, 1)` to write to file every 100 milliseconds. Changing the debug mode to `true` will show any log messages with a level of `LogTypes.LOG` in the console. These messages will be logged to file regardless of debug mode.

If you do not want to log messages to file, simply omit the initLog line and you will get a slightly fancier console output than normal.

Another example may be found in the `test` folder, along with example log files.
