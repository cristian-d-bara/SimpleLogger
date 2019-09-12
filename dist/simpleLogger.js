export default class SimpleLogger {
    constructor(config) {
        this.httpEndpoint = config.httpEndpoint;
        this.httpHeaderOptions = config.httpHeaderOptions ? config.httpHeaderOptions : null;
        this.requestMethod = config.requestMethod ? config.requestMethod : 'POST'
        this.noOfCollectedMessages = config.noOfCollectedMessages;
        this.messageQue = [];
    };


    pushToEndpoint(message, localDisplay = true) {
        if (message) {
            this._sendLogsToEndpoint(message);
            if (localDisplay) {
                console.log('pushing the following message to the endpoint: ');
                console.dir(message);
                console.log(`the endpoint is located at ${this.httpEndpoint}`);
            }
        }
    }

    pushToQue(message, localDisplay = true) {
        if (message) {
            if (this.messageQue.length < this.noOfCollectedMessages) {
                this.messageQue.push(message);
                if (localDisplay) {
                    console.log('pushing the following message to the que: ');
                    console.dir(message);
                    console.log(`the message que hase ${this.messageQue.length} messages out of ${this.noOfCollectedMessages}`)
                }
            } else {
                this._sendLogsToEndpoint(this.messageQue, this.requestMethod); // messageQue is full, so it sends the messages to the configured httpEndpoint
                this.messageQue = []; // empty the messageQue
                this.messageQue.push(message) // push the new message to the 
                if (localDisplay) {
                    console.log('Sent data to endpoint. Emptied the messageQue. Added message: ', message);
                }
            }
        } else {
            if (localDisplay) {
                console.log('the message cannot be null or undefined');
            }
        }
    };


    _sendLogsToEndpoint(data, method = "POST") {
        this._sendData(this.httpEndpoint, method, this.httpHeaderOptions, data)
            .then() // JSON-string from `response.json()` call
            .catch(error => console.dir(error));
    };

    _sendData(url = '', method, headers = {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
    }, data = {}) {
        // Default options are marked with *
        return fetch(url, {
            method: method, // *GET, POST, PUT, DELETE, etc.
            mode: 'no-cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            // credentials: 'same-origin', // include, *same-origin, omit
            headers: headers,
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        })
    };

    /** This function validates a URL string. 
     * It is currently not used
     */
    _validURL(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return !!pattern.test(str);
    }

}