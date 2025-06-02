# TradeGPT

TradeGPT is an AI-powered stock trading assistant that leverages the Model Context Protocol (MCP) with Claude Desktop to automate trading through Zerodha's Kite API. It enables placing buy and sell orders using natural language commands, integrating smoothly with desktop workflows for an intelligent trading experience.

---

## Table of Contents

- [Setup and Usage](#setup-and-usage)  
  - [Step 1: Create Zerodha Account and Kite App](#step-1-create-zerodha-account-and-kite-app)  
  - [Step 2: Generate Access Token Using KiteConnectJS](#step-2-generate-access-token-using-kiteconnectjs)  
  - [Step 3: Connect Claude with MCP for Trading Commands](#step-3-connect-claude-with-mcp-for-trading-commands)


---

## Setup and Usage

### Step 1: Create Zerodha Account and Kite App

1. Open an account on [Zerodha](https://zerodha.com).  
2. Log in to [Kite](https://kite.zerodha.com/).  
3. Go to the [Kite Developer Console](https://developers.kite.trade/apps) and create a new app.  
4. Fill in the app details.  

**Important:**  
For the **Redirect URL (Postback URL)** field, this is the URL where Zerodha sends the authentication token after login.  
- You can set this to `http://localhost` for local development, or  
- Create a simple webpage to capture the token and host it using GitHub Pages or any public hosting.  

This URL is required for OAuth authentication to complete securely.

5. After creating the app, you will receive your **API Key** and **API Secret**. Keep these safe as they are required for authentication.

---

### Step 2: Generate Access Token Using KiteConnectJS

1. Visit the [KiteConnectJS GitHub repository](https://github.com/zerodha/kiteconnectjs) and copy the boilerplate code to your project.  

2. In your code, after initializing KiteConnect, add the following:

   after : const kc = new KiteConnect({ api_key: apiKey });
   console.log(kc.getLoginURL()); // add this

   Running this will print a login URL in the console. Open this URL in a browser, log in, and you will get a request token (short-term token).

   Now use this token to generate a session buy adding :
  kc.generateSession(requestToken, apiSecret).then(response => {
  console.log(response.access_token); //log this
  ...
  });

  Add this access token into your trade.js file to authenticate API calls.

### Step 3: Connect Claude with MCP for Trading Commands

Install Claude Desktop and enable Developer Options.
Navigate to Settings > Developer and edit the configuration.
Replace or configure your claude_desktop_config.json file (this file is provided in the repository).
Restart Claude to apply the changes.

This setup connects Claude MCP with your trading code, enabling you to give voice or text commands to buy and sell stocks through the bot.

