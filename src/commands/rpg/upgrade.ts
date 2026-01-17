import {
  ChatInputCommandInteraction,
  MessageFlags,
  SlashCommandBuilder,
} from "discord.js";

/////////////////////////////////////////////////
//                 PLACEHOLDER
/////////////////////////////////////////////////

export default {
  data: new SlashCommandBuilder()
    .setName("mejorar")
    .setDescription("Sube una estadistica.")
    .addIntegerOption((option) =>
      option
        .setName("estadistica")
        .setDescription("Estadistica a subir.")
        .setRequired(true)
        .addChoices(
          { name: "Fuerza", value: 0 },
          { name: "Destreza", value: 1 },
          { name: "Inteligencia", value: 2 },
          { name: "Carisma", value: 3 },
          { name: "Vida", value: 4 },
          { name: "Magia", value: 5 },
        ),
    ),
  async execute(interaction: ChatInputCommandInteraction) {
    const stat = interaction.options.getInteger("estadistica");

    if (stat === 4) {
      await interaction.reply({
        content: "No puedes subir esta estadistica",
        flags: MessageFlags.Ephemeral,
      });
      return;
    }

    await interaction.reply({
      content: "Estadistica subida",
      flags: MessageFlags.Ephemeral,
    });
  },
};
