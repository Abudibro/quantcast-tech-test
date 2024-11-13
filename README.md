# quantcast-tech-test

A command-line tool that reads a CSV file of cookie log data and finds the most active cookies for a specified date.

## Prerequisites

- Ensure you have **Node.js** installed. Download it from: [Node.js](https://nodejs.org/en/download/package-manager).

## Installation

1. Clone or download this repository.
2. Run `npm install` to install dependencies.

## Usage

Run the command below to find the most active cookies for a specified date:

```bash
npm run most-active-cookie -- -f [COOKIES_CSV_FILE_PATH] -d [YYYY-MM-DD]
```

## Example

To test the functionality, you can use the sample CSV file provided in the project directory. Run the following command:

```bash
npm run most-active-cookie -- -f ./sample.csv -d 2018-12-09
```

Example Output:

```
AtY0laUfhglK3lC7
```

This will read the `./sample.csv` file and output the most active cookie(s) for the date `2018-12-09`.

## Arguments

`-f`: Path to the CSV file containing cookie log data (e.g., `./cookie_log.csv`).

`-d`: Date in `YYYY-MM-DD` format (e.g., `2018-12-09`).

## Example CSV File Format

The CSV file should have the following structure:

```
cookie,timestamp
cookie1,2018-12-09T14:19:00+00:00
cookie2,2018-12-09T10:13:00+00:00
cookie1,2018-12-09T16:01:00+00:00
cookie3,2018-12-08T12:24:00+00:00
```

Each line contains a cookie identifier followed by a timestamp, separated by a comma. The script will analyse the file and count the occurrences of cookies for the specified date.

## Output

The script will print the most active cookie(s) for the given date to the console. For example, running the following:

## Testing

To run the unit tests simply run the following command:

```
npm test
```

## Troubleshooting

If a mistake has been made in the command I have added a few logs to help catch and resolve the issue

- File input is incorrect
- File doesn't exist
- File extension must be .csv
- Date input is incorrect
- Wrong date format
