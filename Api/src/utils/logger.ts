import fs from 'fs'

let logQueue: string[] = [];
if (!fs.existsSync('logs')) {
    fs.mkdirSync('logs');
}

const processLogs = () => {
    try {
        if (logQueue.length > 0){
            const datetime = new Date();
            const message = logQueue[0];
            fs.appendFile(`logs/log-${datetime.getFullYear()}-${datetime.getMonth()}-${datetime.getDay()}.log`, message + "\n", (err) => {
                console.log(message);
            })
            logQueue.shift();
        }
    }
    catch (e) {
        console.log(e);
    }

    setTimeout(processLogs, 1);
}

const info = (message: string) => {
    const datetime = new Date();
    logQueue.push(`<${datetime.getDay()}-${datetime.getMonth()}-${datetime.getFullYear()} ${datetime.getHours()}:${datetime.getMinutes()}:${datetime.getSeconds()}> [ INFO ] ${message}`);
}

const request = (message: string) => {
    const datetime = new Date();
    logQueue.push(`<${datetime.getDay()}-${datetime.getMonth()}-${datetime.getFullYear()} ${datetime.getHours()}:${datetime.getMinutes()}:${datetime.getSeconds()}> [ REQUEST ] ${message}`)
}

const error = (message: string) => {
    const datetime = new Date();
    logQueue.push(`<${datetime.getDay()}-${datetime.getMonth()}-${datetime.getFullYear()} ${datetime.getHours()}:${datetime.getMinutes()}:${datetime.getSeconds()}> [ ERROR ] ${message}`)
}

const debug = (message: string) => {
    if (process.env.NODE_ENV === "dev") {
        const datetime = new Date();
        logQueue.push(`<${datetime.getDay()}-${datetime.getMonth()}-${datetime.getFullYear()} ${datetime.getHours()}:${datetime.getMinutes()}:${datetime.getSeconds()}> [ DEBUG ] ${message}`)
    }
}

setTimeout(processLogs, 1);
export default {
    info,
    request,
    error,
    debug
}