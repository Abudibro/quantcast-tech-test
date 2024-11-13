const fs = require('fs');
const path = require('path');

const parseArguments = (args) => {
    let file = null;
    let date = null;

    if (args.length == 6) {
        if (args[2] === '-f') file = args[3];
        if (args[4] === '-d') date = args[5];
    }
    
    return { file, date };
}

const validateFile = (file) => {
    if (file === null || typeof file != 'string') return 'Wrong file format';
    else if (!fs.existsSync(file)) return 'File doesn\'t exist';
    else if (path.extname(file).toLowerCase() != '.csv') return 'File extension must be .csv';
}

const validateDate = (date) => {
    if (date == null || typeof date !== 'string') return 'Date input is null';

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) return 'Wrong date format';

    const d = new Date(date + 'T00:00:00Z');
    if (isNaN(d.getTime()) || !d.toISOString().startsWith(date)) return 'Wrong date format';
}

const error = (errorMessage) => {
    console.error(errorMessage);
    process.exit(1);
}

module.exports = {
    parseArguments, validateFile, validateDate, error
}