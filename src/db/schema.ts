import { pgTable, serial, text, integer, boolean } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    discordId: text('discord_id').notNull().unique(),
    username: text('username'),
    balance: integer('balance').default(0),
    xp: integer('xp').default(0),
    currentZone: text('current_zone').default('town_01'),
})