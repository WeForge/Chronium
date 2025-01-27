#!/usr/bin/env bash

# colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
WHITE='\033[0;37m'
RESET='\033[0m'

# log timestamps
timestamp() { date +"%Y-%m-%d %H:%M:%S"; }

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}$(timestamp) :: Error: npm is not installed on your system${RESET}"
    echo -e "${YELLOW}Please install Node.js and npm first, then run this script again${RESET}"
    echo -e "${WHITE}You can download Node.js from: https://nodejs.org${RESET}"
    exit 1
fi

# creating configuration file
touch src/.env

# starting setup process
echo -e "${BLUE}
    ███████╗███████╗████████╗██╗   ██╗██████╗ 
    ██╔════╝██╔════╝╚══██╔══╝██║   ██║██╔══██╗
    ███████╗█████╗     ██║   ██║   ██║██████╔╝
    ╚════██║██╔══╝     ██║   ██║   ██║██╔═══╝ 
    ███████║███████╗   ██║   ╚██████╔╝██║     
    ╚══════╝╚══════╝   ╚═╝    ╚═════╝ ╚═╝     
${RESET}"

echo -e "${GREEN}Welcome to the setup process for Chronium.${RESET}"
echo -e "${YELLOW}All the dependencies will be installed automatically.${RESET}"
echo -e "${YELLOW}Eventually, you will be guided to type some information to fill the configuration file.${RESET}"
echo -e "${GREEN}Please note that what you type here is not uploaded to anywhere or seen by anyone except yourself!\n${RESET}"

# ask for version preference
while true; do
    echo -e "${YELLOW}Would you like to install stable or development versions?${RESET}"
    echo -e "${WHITE}1) Stable${RESET}"
    echo -e "${WHITE}2) Development${RESET}"
    read -p "Enter your choice (1 or 2): " version_choice
    
    case $version_choice in
        1)
            FORGE_VERSION="@tryforge/forgescript"
            FORGEDB_VERSION="@tryforge/forgedb"
            break
            ;;
        2)
            FORGE_VERSION="github:tryforge/forgescript#dev"
            FORGEDB_VERSION="github:tryforge/forgedb#dev"
            break
            ;;
        *)
            echo -e "${RED}Invalid choice. Please enter 1 or 2.${RESET}"
            ;;
    esac
done

# installing deps
echo -e "${BLUE}$(timestamp) :: Installing dependencies...${RESET}"
npm i $FORGE_VERSION
npm i $FORGEDB_VERSION
npm i sqlite3
echo -e "${BLUE}$(timestamp) :: Finishing up...${RESET}"
npm cache clean --force
echo -e "${GREEN}$(timestamp) :: Successfully installed all the dependencies!${RESET}"

# beginning of config file setup
echo -e "${WHITE}Starting configuration file setup...${RESET}"
echo -e "${YELLOW}Info: currently you can only have one prefix!${RESET}"

# creating config file with proper JSON format
read -p "App Token: " -e A
read -p "App Prefix: " -e B

cat > src/.env << EOF
TOKEN=${A}
PREFIX=${B}
EOF

echo -e "\n${GREEN}$(timestamp) :: Successfully set up configuration file.${RESET}"
echo -e "${YELLOW}Keep this file safe in a local folder!${RESET}"
echo -e "${RED}Do not share this file to anyone!${RESET}"
