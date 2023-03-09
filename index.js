import { config } from "dotenv";
import { Client, GatewayIntentBits } from "discord.js";

config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const TOKEN = process.env.TUTORTAL_BOT_TOKEN;

client.login(TOKEN);

client.on("ready", () => {
  console.log(`${client.user.tag.split("#")[0]} was wake up!`);
});

client.on("messageCreate", (msg) => {
  console.log(msg.content);
  console.log(msg.author.tag);
  if (msg.content === "ene") {
    msg.channel.send("呼んた?");
  }
});
