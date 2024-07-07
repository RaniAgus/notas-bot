import dotenv from 'dotenv';
import z from 'zod';

dotenv.config();

const schema = z.object({
  QUERY: z.string().transform(v => v.split(',')),
  COLUMN_NAMES: z.string().transform(v => v.split(',')),
  PUBLISHED_SHEET_URL: z.string(),
  WEBHOOK_URL: z.string(),
  CACHE_KEY: z.string(),
  CACHE_URL: z.string().optional(),
  PORT: z.number({ coerce: true }).lte(65535).default(3000),
});

const env = schema.parse(process.env);

export default env;
