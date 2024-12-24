import { nanoid, Writer } from '../deps.ts';

type TempLog = {
	message: string;
	trace: string;
};

// enum for all possible console.log types
export enum LogTypes {
	LOG = 'log',
	INFO = 'info',
	WARN = 'warn',
	ERROR = 'error',
}

// Constant initialized at runtime for consistent file names
let startDate: string;
let logFolder: string;
let initialized = false;
let debug = false;
let writeLogTimer: number;
let pendingLogs: Array<TempLog> = [];

// writeAll(destination, data) returns nothing
// Util to ensure all bytes get written to file
const writeAll = async (w: Writer, arr: Uint8Array): Promise<void> => {
	let nwritten = 0;
	while (nwritten < arr.length) {
		nwritten += await w.write(arr.subarray(nwritten));
	}
};

// writeLogs() returns nothing
// Handles writing the log messages to file
const writeLogs = async (): Promise<void> => {
	if (pendingLogs.length) {
		let combinedToWrite = '';
		let tracesToWrite = '';

		// Prepare text
		pendingLogs.forEach((pl) => {
			combinedToWrite += `${pl.message}\n`;
			tracesToWrite += `${pl.message}\n${pl.trace}\n\n`;
		});

		// Convert text to bytes to write to files
		const combinedBytes = new TextEncoder().encode(combinedToWrite);
		const traceBytes = new TextEncoder().encode(tracesToWrite);

		// Open files to write to
		const combinedFile = await Deno.open(`./${logFolder}/combined/${startDate}.log`, { write: true, append: true });
		const traceFile = await Deno.open(`./${logFolder}/traces/${startDate}.log`, { write: true, append: true });

		// Write to files
		await writeAll(combinedFile, combinedBytes);
		await writeAll(traceFile, traceBytes);

		// Close files
		combinedFile.close();
		traceFile.close();

		// Clear pendingLogs out
		pendingLogs = [];
	}
};

// initLog(folderName, debugMode, writeTiming) returns nothing
// Handles ensuring the required directory structure is created and sets up the writing service with a default write timing of once per minute
export const initLog = (name: string, debugMode: boolean, writeTiming = 10): void => {
	// Initialize the file name
	startDate = new Date().toISOString().split('T')[0];
	logFolder = name;
	debug = debugMode;
	writeLogTimer = writeTiming * 100;
	const startupMessage = `
---------------------------------------------------------------------------------------------------
---------------------------------------- LOGGING  STARTED -----------------------------------------
------------------------------------ ${new Date().toISOString()} -------------------------------------
---------------------------------------------------------------------------------------------------`;

	// Make each folder if its missing and insert the startup message
	const folders = ['combined', 'traces'];
	folders.forEach((level) => {
		Deno.mkdirSync(`./${logFolder}/${level}`, { recursive: true });
		Deno.writeTextFileSync(`./${logFolder}/${level}/${startDate}.log`, `${startupMessage}\n`, { append: true });
	});

	// Start the writing service
	setInterval(writeLogs, writeLogTimer);

	initialized = true;
};

// log(level, message) returns nothing
// Handles sending messages to console.log and sending a copy of the log to a file for review on crashes
export const log = async (level: LogTypes, message: string, error: (boolean | Error) = new Error()): Promise<void> => {
	const msgId = await nanoid(10);
	const formattedMsg = `${new Date().toISOString()} | ${msgId} | ${level.padEnd(5)} | ${message}`;
	const traceMsg = error ? `${error}` : 'Trace omitted';

	// Default functionality of logging to console
	if (level !== LogTypes.LOG || debug) {
		console[level](formattedMsg);
	}

	// Logging to files for permanent info
	if (initialized) {
		pendingLogs.push({
			message: formattedMsg,
			trace: traceMsg,
		});
	}
};
