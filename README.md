# SimpleLogger
A simple javascript logger class that sends message blobs to yours console and to a configured backend

## 1. Importing the logger
```javascript
import SimpleLogger from '[path to simpleLogger.js]';
```

## 2. Instantiating a SimpleLogger object
A SimpleLogger object needs a httpEndpoint and noOfCollectedMessages. 

Assumptions:
* The server that receives the logger message objects accepts object blobs. If you are using strong typechecking, make sure to cast your messages in the required type before sending them to the logger

* Your logging requirements ask for an optimized data transfer, therefore a use case where you'd need to send multiple log messages at once is possible. Please make sure the noOfCollectedMessages is instanciated

```javascript
let myLogger = new SimpleLogger({
    httpEndpoint: 'https://postman-echo.com/post',
    httpHeaderOptions: {
        'Content-Type': 'application/json'
    },
    requestMethod: 'POST',
    noOfCollectedMessages: 3
});
```

## 3. Sending message objects to the SimpleLogger's message que. 
Assuming your configuration objects from the SimpleLogger constructer is valid.
* *message* - is a javascript object
* *localDisplay* - is a flag that indicated if the message should also be logged in the clinet console. by default it is true 
```javascript
pushToQue(message, localDisplay = true)
```
Example
```javascript
// adding message objects to SimpleLogger's internal messageQue
for (let i = 0; i < 7; i++) {

    myLogger.pushToQue({foo: i + '.bar'}, true); 
    // this will fire two times, since noOfCollectedMessages is equat to 3

} 
``` 

## 4. Sending message objects to the your endpoint. 
This function will not push the message into the internal message que, but straight to your http endpoint. It has the same parameters as above. The endpoint and transport related information is taken from the configuration you instantiated your logger (see section 2)
* *message* - is a javascript object
* *localDisplay* - is a flag that indicated if the message should also be logged in the clinet console. by default it is true 

```javascript
pushToEndpoint(message, localDisplay = true)
```
Example
```javascript
// posting a unique message
myLogger.pushToEndpoint({
    foo: 'unique.bar'
}, true)
```