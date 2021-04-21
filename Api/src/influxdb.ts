const Influx = require('influx');

const influx = new Influx.InfluxDB({
 host: 'localhost',
 database: 'ruuvi',
 schema: [
   {
     measurement: 'ruuvi_measurements',
     fields: {
       path: Influx.FieldType.STRING,
       duration: Influx.FieldType.INTEGER
     },
     tags: [
       'host'
     ]
   }
 ]
})

export default influx