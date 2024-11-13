const fs = require('fs');
const { findMostActiveCookie } = require('../src/mostActiveCookie');

jest.mock('fs');

const trimData = (data) => {
    return data
        .split('\n')
        .map(line => line.trimStart())
        .join('\n');
}

describe('findMostActiveCookie', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        console.log = jest.fn();
    });

    it('should print the most active cookie(s) for the specified date', () => {
        const fileData = trimData(`
            cookie,timestamp
            cookie1,2018-12-09T14:19:00+00:00
            cookie2,2018-12-09T10:13:00+00:00
            cookie1,2018-12-09T16:01:00+00:00
            cookie3,2018-12-08T12:24:00+00:00
        `)

        fs.readFileSync.mockReturnValue(fileData);
        findMostActiveCookie('cookie_log.csv', '2018-12-09');

        expect(console.log).toHaveBeenCalledWith('cookie1');
        expect(console.log).not.toHaveBeenCalledWith('cookie2');
        expect(console.log).not.toHaveBeenCalledWith('cookie3');
    });

    it('should print multiple cookies if they have the same highest activity count for the date', () => {
        const fileData = trimData(`
            cookie1,2018-12-09T14:19:00+00:00
            cookie2,2018-12-09T10:13:00+00:00
            cookie1,2018-12-09T16:01:00+00:00
            cookie2,2018-12-09T16:20:00+00:00
            cookie3,2018-12-08T12:24:00+00:00
        `);

        fs.readFileSync.mockReturnValue(fileData);
        findMostActiveCookie('cookie_log.csv', '2018-12-09');

        expect(console.log).toHaveBeenCalledWith('cookie1');
        expect(console.log).toHaveBeenCalledWith('cookie2');
        expect(console.log).not.toHaveBeenCalledWith('cookie3');
    });

    it('should handle files with improperly formatted lines gracefully', () => {
        const fileData = trimData(`
            cookie1,2018-12-09T14:19:00+00:00
            malformed_line_without_comma
            cookie2,2018-12-09T10:13:00+00:00
            cookie1,2018-12-09T16:01:00+00:00
        `);

        fs.readFileSync.mockReturnValue(fileData);
        findMostActiveCookie('cookie_log.csv', '2018-12-09');

        expect(console.log).toHaveBeenCalledWith('cookie1');
        expect(console.log).not.toHaveBeenCalledWith('cookie2');
    });

    it('should not print any cookies if no cookies match the specified date', () => {
        const fileData = trimData(`
            cookie1,2018-12-08T14:19:00+00:00
            cookie2,2018-12-08T10:13:00+00:00
            cookie3,2018-12-08T16:01:00+00:00
        `);

        fs.readFileSync.mockReturnValue(fileData);
        findMostActiveCookie('cookie_log.csv', '2018-12-09');

        expect(console.log).not.toHaveBeenCalled();
    });

    it('should correctly handle an empty file without errors', () => {
        const fileData = "";

        fs.readFileSync.mockReturnValue(fileData);
        findMostActiveCookie('cookie_log.csv', '2018-12-09');

        expect(console.log).not.toHaveBeenCalled();
    });

    it('should handle ties when multiple cookies have the same activity count for the date', () => {
        const fileData = trimData(`
            cookie1,2018-12-09T14:19:00+00:00
            cookie2,2018-12-09T10:13:00+00:00
            cookie1,2018-12-09T16:01:00+00:00
            cookie2,2018-12-09T16:20:00+00:00
        `);

        fs.readFileSync.mockReturnValue(fileData);
        findMostActiveCookie('cookie_log.csv', '2018-12-09');

        expect(console.log).toHaveBeenCalledWith('cookie1');
        expect(console.log).toHaveBeenCalledWith('cookie2');
        expect(console.log).not.toHaveBeenCalledWith('cookie3');
    });
});