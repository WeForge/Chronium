#!/usr/bin/env bash

# colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
WHITE='\033[0;37m'
RESET='\033[0m'

# timestamp for logging
timestamp() {
 date +"%Y-%m-%d %H:%M:%S"
}

# display banner
echo -e "${BLUE}
   ███████╗ ██████╗ ██████╗  ██████╗ ██╗███╗   ██╗ ██████╗ 
   ██╔════╝██╔═══██╗██╔══██╗██╔════╝ ██║████╗  ██║██╔════╗ 
   █████╗  ██║   ██║██████╔╝██║  ███╗██║██╔██╗ ██║██║  ███╗
   ██╔══╝  ██║   ██║██╔══██╗██║   ██║██║██║╚██╗██║██║   ██║
   ██║     ╚██████╔╝██║  ██║╚██████╔╝██║██║ ╚████║╚██████╔╝
   ╚═╝      ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚═╝╚═╝  ╚═══╝ ╚═════╝ 
${RESET}"

# updating stuff
echo -e "${BLUE}Starting your discord application...${RESET}"
echo -e "${BLUE}$(timestamp) :: Updating dependencies...${RESET}"
npm i
echo -e "${BLUE}$(timestamp) :: Cleaning up...${RESET}"
npm cache clean --force
echo -e "${GREEN}Successfully updated all the dependencies!${RESET}"

# actually starting bot
echo -e "${BLUE}$(timestamp) :: Loading extensions and commands...${RESET}"
node src/main.js
