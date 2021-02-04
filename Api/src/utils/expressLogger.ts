import Logger from './logger'

const expressLogger = function (req: any, res: any, next: any) {
    Logger.request(`New request from { ${req.headers['x-forwarded-for'] || req.connection.remoteAddress} } METHOD: ${req.method} URL: ${req.url}`);
    next()
}

export default expressLogger;