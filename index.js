const { findMostActiveCookie } = require('./mostActiveCookie');
const { parseArguments, validateDate, validateFile, error } = require('./utils');

const { file, date } = parseArguments(process.argv);

const fileCorrupt = validateFile(file)
const dateCorrupt = validateDate(date)

if (fileCorrupt) error(fileCorrupt);
if (dateCorrupt) error(dateCorrupt);

findMostActiveCookie(file, date);