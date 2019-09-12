import SimpleLogger from './dist/simpleLogger.js';

let myLogger = new SimpleLogger({
    httpEndpoint: 'https://postman-echo.com/post',
    httpHeaderOptions: {
        'Content-Type': 'application/json'
    },
    requestMethod: 'POST',
    noOfCollectedMessages: 3
});

let showInConsole = true;

// adding to messageQue
for (let i = 0; i < 7; i++) {
    myLogger.pushToQue({
        foo: i + '.bar'
    }, showInConsole);
}


// posting a unique message
myLogger.pushToEndpoint({
    foo: 'unique.bar'
}, showInConsole)