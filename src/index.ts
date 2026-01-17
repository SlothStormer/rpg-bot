// index.js
import { Client, Collection, Events, GatewayIntentBits } from "discord.js";
import 'dotenv/config'
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
})

// Colleccion para guardar los comandos en memoria
client.commands = new Collection();

// Command handler
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js') || file.endsWith('.ts'));

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);

        const command = await import(pathToFileURL(filePath).href);

        if (command.default && 'data' in command.default && 'execute' in command.default) {
            client.commands.set(command.default.data.name, command.default);
            console.log(`[INFO] Comando cargado: ${command.default.data.name}`);
        } else {
            console.log(`[WARNING] El comando en ${filePath} no tiene la estructura correcta.`);
            console.log(`-> Asegúrate de usar "export default { data: ..., execute: ... }"`);
        }
    }
}

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`No se encontró comando para ${interaction.commandName}`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'Hubo un error ejecutando este comando!', ephemeral: true });
        } else {
            await interaction.reply({ content: 'Hubo un error ejecutando este comando!', ephemeral: true });
        }
    }
});

client.once(Events.ClientReady, readyClient => {
    console.log(`Bot RPG Online! Logueado como ${readyClient.user.tag}`);
});

client.login(process.env.TOKEN);