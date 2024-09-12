import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

export const client = postgres("postgresql://docker:docker@localhost:5432/inorbit")
export const db = drizzle(client, {schema, logger: true})
