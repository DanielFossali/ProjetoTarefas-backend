// popula o banco de dados com dados ficticios
import dayjs from 'dayjs'
import { client, db } from '.'
import { goalCompletions, goals } from './schema'

async function seed() {
  // devesernessa ordem poisa tabela goals precisa das infos do goals.id, podendo acarretar em uma erro de chave estrangeira
  await db.delete(goalCompletions)
  await db.delete(goals)

  const result = await db
    .insert(goals)
    .values([
      { title: 'Arcordar cedo', desiredWeeklyFrequency: 5 },
      { title: 'Ia a Academia', desiredWeeklyFrequency: 5 },
      { title: 'Ler', desiredWeeklyFrequency: 4 },
    ])
    .returning()

  const startOfWeek = dayjs().startOf('week')

  await db.insert(goalCompletions).values([
    { goalId: result[0].id, createdAt: startOfWeek.toDate() },
    { goalId: result[1].id, createdAt: startOfWeek.add(1, 'day').toDate() },
    { goalId: result[2].id, createdAt: startOfWeek.add(3, 'day').toDate() },
  ])
}

seed().finally(() => {
  client.end()
})
