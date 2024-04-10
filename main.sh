#!/bin/bash

# Grant execute permission to main.sh
chmod +x main.sh

# Install dependencies
npm install figlet node-telegram-bot-api lolcatjs axios

# Run the bot
bash start.sh
