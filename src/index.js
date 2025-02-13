// ========== ENVIRONMENT CONFIGURATION ==========
// Load environment variables before importing anything that relies on them
const dotenv = require("dotenv"); // For loading environment variables from .env file
dotenv.config(); // Ensure this is called before anything that depends on the environment

// ========== IMPORTS ==========
// Importing necessary libraries for the bot's functionality
const { ForgeCanvas } = require("@tryforge/forge.canvas"); // Canvas extension for drawing and images
const { ForgeClient, LogPriority } = require("@tryforge/forgescript"); // ForgeClient for Discord bot logic
const { ForgeDB } = require("@tryforge/forge.db"); // Database management extension
const { ForgeQuirks } = require("forge.quirks"); // Adds a few quirky functions to forgescript
const chalk = require("chalk"); // For colorful console outputs
const figlet = require("figlet"); // For generating fancy ASCII art text
const { join } = require("path"); // For handling file paths

// ========== HANDLERS & CUSTOM FUNCTIONS ==========
// Import custom handlers for specific bot features
const displayAsciiArt = require("./handlers/ASCIIPrint.js"); // Display the bot's ASCII art logo
const DisplayInstalledPackages = require("./handlers/InstalledPackages.js"); // List installed packages
const variables = require("./handlers/database.js"); // Database-related variables and functions
const events = require("./handlers/events.js"); // Bot event handlers (like message events)
const intents = require("./handlers/intents.js"); // Bot intents (permissions and events)

// ========== DYNAMIC PATHS AND CLIENT SETUP ==========
// Dynamic paths for commands and functions based on environment
const functionsPath = join(__dirname, "Functions");
const slashCommandsPath = "src/Slash Commands";
const prefixCommandsPath = "src/Prefix Commands";
const otherCommandsPath = "src/Event Commands";
// ========== CLIENT SETUP ==========
// Initialize the client with necessary extensions, intents, and events
const client = new ForgeClient({
  extensions: [
    new ForgeDB(), // Database extension for handling data
    new ForgeCanvas(), // Canvas extension for graphic handling
    new ForgeQuirks(), // A Few Extra Functions For ForgeScript
  ],

  intents: [
    ...intents, // Intents list for Discord bot permissions (message reading, etc.)
  ],

  events: [
    ...events, // Events the bot should listen for (e.g., message events, guild events)
  ],

  prefixes: ["k!", "=", "$getGuildVar[prefix;$guildID;!]"],

  trackers: { invites: true }, // Enable invite tracking for the bot
});

// Set up database variables for the ForgeDB extension
ForgeDB.variables(variables);

// ========== LOAD FUNCTIONS & COMMANDS ==========
// Load custom functions dynamically
client.functions.load(functionsPath);
client.applicationCommands.load(slashCommandsPath);
client.commands.load(prefixCommandsPath);
client.commands.load(otherCommandsPath);

// ========== LOGIN & STARTUP ==========
// Log in to Discord using the bot token from the environment file
client.login(process.env.BOT_TOKEN);

// ========== CLEANING & DISPLAY ==========
// Clear the console to keep things clean when the bot starts
console.clear();

// Display custom ASCII art and installed packages for debugging or info
displayAsciiArt();
DisplayInstalledPackages();
