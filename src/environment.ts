import z from 'zod';

const schema = z.object({
  QUERY: z.string().transform(v => v.split(',')),
  COLUMN_NAMES: z.string().transform(v => v.split(',')),
  PUBLISHED_SHEET_URL: z.string(),
  WEBHOOK_URL: z.string(),
  CACHE_KEY: z.string(),
  CACHE_URL: z.string().optional(),
  PORT: z.coerce.number().lte(65535).default(3000),
});

const env = schema.parse(Bun.env);

export default env;
