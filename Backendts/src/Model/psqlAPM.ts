import { Pool, PoolClient } from "pg";
import {infologger} from '../Logger/logger'
const config = require('../config/constant');
const pool = new Pool (config.PgDbConfig);
//const log = require('../log');
module.exports.fnDbQuery = fnDbQuery;

async function fnDbQuery(methodName:string,queryText:string, queryParam:any) {
  let client:PoolClient ;
  let start;
  try {
    start = Date.now();
    client = await pool.connect();
    try {
      const qResult = await client.query(queryText, queryParam);
      // eslint-disable-next-line prefer-const
      const duration = Date.now() - start;
      /*const result = {
        success: true,
        error: false,
        rows: qResult.rows // Extract only the rows from the query result
      };*/
      let result:any = qResult;
      result["success"] = true;
      result.error = false;
      console.log("info",`${process.pid}, PSQL, ${methodName}, ${duration} ms, ${pool.idleCount} idle, ${pool.waitingCount} queue, ${pool.totalCount} total`);
      infologger.info('queryprocessed',{
        Date:new Date(),

        process_id:process.pid,
        duration:duration,
        idlecount:pool.idleCount,
        pooltotalcount:pool.totalCount,
        methodname:methodName})
     
      return result;
    } catch (e:any) {
      console.log("error",`${process.pid}, PSQLQueryError, ${methodName}, ${e.message}`);
        return {success:false, qry_error: true, message: e.message};
    } finally {
      client.release();
    }
  } catch (e:any){
    console.log("error",`${process.pid}, PSQL, ${methodName}, ${e.message}`);
   
    console.log("PSQLConnectionErrorStack", e.stack);
    return {success:false, connection_error: true, message: e.message};
  } 
}

pool.on('error', (err:Error) => {
  console.log("error",`${process.pid}, PSQL Pool error, ${err.message}`);
  console.error('Connection error experienced',err.message);
});

