import { ChatInputCommandInteraction, MessageFlags, SlashCommandBuilder } from "discord.js"
import { db } from "../../db/index.js";
import { users } from "../../db/schema.js";
import { eq } from "drizzle-orm";

export default {
    data: new SlashCommandBuilder()
        .setName('inscribirse')
        .setDescription('Inscribete a la asociacion de aventureros'),
    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.deferReply({ flags: MessageFlags.Ephemeral });

        const userId = interaction.user.id;

        let user = await db.select().from(users).where(eq(users.discordId, userId))

        console.log(user);

        if (user.length > 0) {
            await interaction.editReply({ content: 'Ya estas inscrito a la asociacion de aventureros' });
            return;
        }

        const newUser = await db.insert(users).values({
            discordId: userId,
            username: interaction.user.username,
            balance: 100,
            xp: 0,
        }).returning();

        console.log(newUser);

        await interaction.editReply({ content: 'Has inscrito a tu personaje en la asociacion de aventureros' });
    }
}