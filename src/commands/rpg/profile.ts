import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  MessageFlags,
  SlashCommandBuilder,
} from "discord.js";
import { db } from "../../db/index.js";
import { users } from "../../db/schema.js";
import { eq } from "drizzle-orm";
import { ZONES } from "../../const/zones.js";

export default {
  data: new SlashCommandBuilder()
    .setName("perfil")
    .setDescription("Muestra tu perfil"),
  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply({ flags: MessageFlags.Ephemeral });

    const userId = interaction.user.id;

    let user = await db.select().from(users).where(eq(users.discordId, userId));

    if (user.length === 0) {
      await interaction.editReply({
        content: "No estas registrado en la asociacion de aventureros",
      });
      return;
    }

    const playerData = user[0];

    const actualZone = ZONES.find(
      (zone) => zone.value === playerData.currentZone,
    );

    // 3. Responder
    const embed = new EmbedBuilder()
      .setTitle(`Perfil de ${playerData.username}`)
      .setColor(0x00ae86)
      .addFields(
        { name: "💰 Oro", value: `${playerData.balance}`, inline: true },
        { name: "✨ XP", value: `${playerData.xp}`, inline: true },
        { name: "🌍 Zona", value: `${actualZone?.name}`, inline: true },
        { name: "Inventario", value: `${playerData.inventory}`, inline: true },
      );

    await interaction.editReply({ embeds: [embed] });
  },
};
