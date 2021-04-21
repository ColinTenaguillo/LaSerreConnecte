import express from 'express';
import influx from '../../influxdb'
const router = express.Router();

/* GET humidity listing. */
/**
 * This function get all humidity data
 * @route GET /humidity
 * @returns {object} 200 - An array of humidity
 * @returns {Error}  default - Unexpected error
 */
router.get('/', function(req: any, res: any, next: any) {

  influx.query(`
    SELECT mean("humidity") FROM "ruuvi_measurements"
    GROUP BY time(1m), "mac" fill(null)
  `).then((result: any) => {
    res.json(result)
  }).catch((err: any) => {
    res.status(500).send(err.stack)
  })
});

/* GET humidity listing. */
/**
 * This function list all humidity
 * @route GET /humidity/:start/:end
 * @param {date} start.query.required - The start date.
 * @param {date} end.query.required - The end date.
 * @returns {object} 200 - An array of humidity
 * @returns {Error}  default - Unexpected error
 */
router.get('/:start/:end', function(req: express.Request, res: express.Response, next: express.NextFunction) {
  const {
    start,
    end
  } = req.params

  const dateStart = new Date(start).getTime()
  const dateEnd = new Date(end).getTime()

  influx.query(`
    SELECT mean("humidity") FROM "ruuvi_measurements" 
    WHERE time >= ${dateStart}ms and time <= ${dateEnd}ms 
    GROUP BY time(1m), "mac" fill(null)
  `).then((result: any) => {
    res.json(result)
  }).catch((err: any) => {
    res.status(500).send(err.stack)
  })
});

export default router;
