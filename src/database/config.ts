import { logger } from '@loggers/logger.js';
import postgres from 'postgres';
import 'dotenv/config';

const sql = postgres({
  transform: {
    undefined: null,
  },
  idle_timeout: 60, // close idle connections after 30 seconds
  max_lifetime: 60 * 20, // kill connections after 20 minutes
});

// Check for connection errors

const queryTimed = async (text: string, params: []) => {
  console.time('executed query');
  const res = await sql`${sql(text, ...params)}`;
  console.timeEnd('executed query');
  return res;
};

const ping = async () => {
  try {
    await sql`SELECT 1`;
    logger.info('POSTGRES CONNECTION SUCCESSFUL');
  } catch (e) {
    logger.error('POSTGRES CONNECTION FAILED');
    logger.error('Error pinging postgres', e);
    process.exit(1);
  }
};

export { queryTimed, sql as dbPool, ping as dbPing };
