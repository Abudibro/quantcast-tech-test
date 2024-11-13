const fs = require('fs');

const findMostActiveCookie = (file, date) => {
    const cookies = new Map();
    let maxCount = 0;
  
    const data = fs.readFileSync(file, 'utf-8').trim().split('\n');

    data.forEach((line, i) => {
        if (i == 0 && line === 'cookie,timestamp') return;

        try {
            const [cookie, timestamp] = line.split(',');
            const logDate = timestamp.split('T')[0];

            if (logDate === date) cookies.set(cookie, (cookies.get(cookie) || 0) + 1);
            maxCount = Math.max(maxCount, cookies.get(cookie) || 0);
        }
        catch {
            return;
        }
    });

    const mostActiveCookies = [...cookies.keys()].filter(cookie => cookies.get(cookie) === maxCount);
  
    mostActiveCookies.forEach(cookie => console.log(cookie));
}

module.exports = { findMostActiveCookie };