# Testing Log4Deno
This folder is set up for testing the Log4Deno project.

## Running the test
To run the test, simply run the following command while in the `test` folder:

`deno run --allow-write=./logs --location=https://testing.local/ .\mod.ts`

Output will be found in the logs folder.  If you interrupt the test and restart it, any logs not written to file before the interruption will be inserted at the next time the logger is initialized. (See the 2021-05-25.log files for an example without running).
