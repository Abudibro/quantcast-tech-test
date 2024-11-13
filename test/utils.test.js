const fs = require('fs');
const { parseArguments, validateFile, validateDate } = require('../../src/utils')

jest.mock('fs');

describe('utils.js', () => {
    describe('parseArguments', () => {
        it('should correctly parse file and date when arguments are valid', () => {
            const args = ['node', 'index.js', '-f', 'cookie_log.csv', '-d', '2018-12-09'];
            const result = parseArguments(args);
            expect(result).toEqual({
                file: 'cookie_log.csv',
                date: '2018-12-09'
            });
        });
    
        it('should return null for file and date if arguments are incomplete', () => {
            const args = ['node', 'index.js', '-f', 'cookie_log.csv'];
            const result = parseArguments(args);
            expect(result).toEqual({
                file: null,
                date: null
            });
        });
    
        it('should return null for file and date if arguments do not contain -f and -d', () => {
            const args = ['node', 'index.js', '-x', 'cookie_log.csv', '-y', '2018-12-09'];
            const result = parseArguments(args);
            expect(result).toEqual({
                file: null,
                date: null
            });
        });
    
        it('should return null for file and date if arguments length is not 6', () => {
            const args = ['node', 'index.js', '-f', 'cookie_log.csv', '-d'];
            const result = parseArguments(args);
            expect(result).toEqual({
                file: null,
                date: null
            });
        });
    
        it('should correctly parse arguments when -f and -d are in different order', () => {
            const args = ['node', 'index.js', '-d', '2018-12-09', '-f', 'cookie_log.csv'];
            const result = parseArguments(args);
            expect(result).toEqual({
                file: null,
                date: null
            });
        });
    });

    describe('validateFile', () => {
        it('should return "Wrong file format" if file is null', () => {
            expect(validateFile(null)).toBe('Wrong file format');
        });
    
        it('should return "Wrong file format" if file is not a string', () => {
            expect(validateFile(123)).toBe('Wrong file format');
        });
    
        it('should return "File doesn\'t exist" if file does not exist', () => {
            fs.existsSync.mockReturnValue(false);
            expect(validateFile('nonexistent.csv')).toBe("File doesn't exist");
        });
    
        it('should return "File extension must be .csv" if file is not a .csv file', () => {
            fs.existsSync.mockReturnValue(true);
            expect(validateFile('file.txt')).toBe('File extension must be .csv');
        });
    
        it('should return undefined for a valid .csv file', () => {
            fs.existsSync.mockReturnValue(true);
            expect(validateFile('file.csv')).toBeUndefined();
        });
    });

    describe('validateDate', () => {
        it('should return "Date input is null" if date is null', () => {
            expect(validateDate(null)).toBe('Date input is null');
        });
    
        it('should return "Date input is null" if date is not a string', () => {
            expect(validateDate(20220101)).toBe('Date input is null');
        });
    
        it('should return "Wrong date format" if date does not match YYYY-MM-DD format', () => {
            expect(validateDate('01-01-2022')).toBe('Wrong date format');
            expect(validateDate('2022/01/01')).toBe('Wrong date format');
            expect(validateDate('2022-1-1')).toBe('Wrong date format');
        });
    
        it('should return "Wrong date format" if date is invalid', () => {
            expect(validateDate('2022-02-30')).toBe('Wrong date format');
            expect(validateDate('2022-13-01')).toBe('Wrong date format');
        });
    
        it('should return undefined for a valid date in YYYY-MM-DD format', () => {
            expect(validateDate('2022-01-01')).toBeUndefined();
        });
    });
})