import { MessageFlags, SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";
import { ZONES } from "../../const/zones.js";
import { db } from "../../db/index.js";
import { users } from "../../db/schema.js";
import { eq } from "drizzle-orm";

export default {
    data: new SlashCommandBuilder()
        .setName('viajar')
        .setDescription('Viaja a una zona diferente')
        .addStringOption(option =>
            option.setName('destino')
                .setDescription('A donde queres viajar')
                .setRequired(true)
                .addChoices(...ZONES)
        ),
    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.deferReply({ flags: MessageFlags.Ephemeral });
        const destino = interaction.options.getString('destino');

        const userId = interaction.user.id;

        let user = await db.select().from(users).where(eq(users.discordId, userId))
        if (user.length === 0) {
            await interaction.editReply({ content: 'No estas registrado en la asociacion de aventureros' });
            return;
        }

        const zona = ZONES.find(zona => zona.value === destino);
        if (!zona) {
            await interaction.editReply({ content: 'Esa zona no existe.' });
            return;
        }

        const updatedUser = await db.update(users).set({ currentZone: zona.value }).where(eq(users.discordId, userId)).returning();

        await interaction.editReply({ content: `${interaction.user} estas viajando a **${zona.name}**...` });
    }
}