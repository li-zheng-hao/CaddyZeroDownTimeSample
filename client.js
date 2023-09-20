const http = require('http');

function makeRequest() {
    const startTime = new Date().getTime();

    const req = http.get('http://localhost:80', (res) => {
        const endTime = new Date().getTime();
        const duration = endTime - startTime;

        let responseData = '';

        res.on('data', (chunk) => {
            responseData += chunk;
        });

        res.on('end', () => {
            console.log('----------------------------------');
            if (res.statusCode > 200)
                console.log("出现异常!!!!", res.statusCode);
            else {
                console.log('Status Code:', res.statusCode);
            }
            console.log('Response:', responseData);
            console.log('Duration:', duration, 'ms');
        });
    });

    req.on('error', (error) => {
        console.error('Error:', error.message);
    });

    if (--count > 0) {
        setTimeout(makeRequest, 200);
    }
}

let count = 10000;
makeRequest();