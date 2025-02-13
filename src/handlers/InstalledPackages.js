const chalk = require("chalk");
const { exec } = require("child_process");

const getAllPackages = () => {
  return new Promise((resolve, reject) => {
    const command = "npm list --json";

    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(`Error: ${stderr || error.message}`);
        return;
      }

      let data;
      try {
        data = JSON.parse(stdout);
      } catch (parseError) {
        reject(`Error parsing JSON: ${parseError.message}`);
        return;
      }

      if (!data[0]?.dependencies || Object.keys(data[0].dependencies).length === 0) {
        resolve("No packages found.");
        return;
      }

      const packages = Object.keys(data[0].dependencies)
        .map((pkg) => {
          const version = data[0].dependencies[pkg]?.version || "unknown";
          return `${chalk.hex("#ff80ff")(pkg)}@${chalk.hex("#ff80ff")(version)}`;
        })
        .sort() // Sort packages alphabetically
        .join("\n");

      resolve(packages);
    });
  });
};

const DisplayAllPackages = async () => {
  try {
    const packages = await getAllPackages();

    console.log(chalk.hex("#ff1493")("✨ Installed Packages ✨") + "\n" + packages);
  } catch (error) {
    console.error(chalk.hex("#ff6347")("❌ Failed to fetch packages: ") + chalk.bold(error));
  }
};

module.exports = DisplayAllPackages;
