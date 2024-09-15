import { getWeekSummary } from '../../app/services/get-week-summary'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

export const getWeekSummaryRoute: FastifyPluginAsyncZod = async app => {
  app.get('/summary', {}, async () => {
    const { summary } = await getWeekSummary()

    return { summary }
  })
}