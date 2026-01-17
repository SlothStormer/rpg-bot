import { REST, Routes } from "discord.js";
import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const TOKEN = process.env.TOKEN!;
const CLIENT_ID = process.env.CLIENT_ID!;
const GUILD_ID = process.env.GUILD_ID!;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const commands = [];

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js') || file.endsWith('.ts'));

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = await import(pathToFileURL(filePath).href);

        if (command.default && 'data' in command.default && 'execute' in command.default) {
            commands.push(command.default.data.toJSON());
            console.log(`[LOAD] Preparando comando: ${command.default.data.name}`);
        } else {
            console.log(`[WARNING] El comando en ${filePath} falta "data" o "execute".`);
        }
    }
}

// --- ENVÍO A LA API ---
const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
    try {
        console.log(`Empezando a refrescar ${commands.length} comandos (/) de aplicación.`);

        const data = await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
            { body: commands },
        ) as any;

        console.log(`¡Éxito! Se han registrado ${data.length} comandos en el servidor.`);
    } catch (error) {
        console.error(error);
    }
})();