const { Client, GatewayIntentBits, REST, Routes } = require("discord.js");
const { handlerUrlDiscord } = require("../controllers/url_controller");

const TOKEN =
  "MTE4OTkwNjQ3MTcyNzY3MzM3NQ.GS_Ws7._sOnt5MgtfR_pZECjvB7-BeNzFsqlVsm1lO3lQ";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
  ],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", async (message) => {
  const content = message.content.toLocaleLowerCase();
  if (message.author.bot) {
    return;
  } else if (content.startsWith("create")) {
    const url = content.split("create")[1];
    const response = await handlerUrlDiscord(url);
    message.reply({
      content: response,
    });
  } else {
    message.reply({
      content: "Pata nahi kia bol raha hai",
    });
  }
});

const commands = [
  {
    name: "ping",
    description: "Replies with Pong!",
  },
];

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("Pong!");
  }
});

const rest = new REST({ version: "10" }).setToken(TOKEN);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands("1189906471727673375"), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
module.exports = client;
