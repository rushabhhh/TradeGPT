import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { placeOrder } from "./trade.js";

// Create an MCP server
const server = new McpServer({
  name: "Demo",
  version: "1.0.0"
});



server.tool("buy-stock",
  {
    stock: z.string(),
    quantity: z.number()
  },
  async ({ stock, quantity }) => {
    try {
      const result = await placeOrder(stock, quantity, "BUY");  // Added await here
      // console.log("[DEBUG] Order result:", result);
      
      return {
        content: [{ 
          type: "text", 
          text: `Order successfully placed for ${quantity} shares of ${stock}! Order ID: ${result.order_id}` 
        }]
      };
    } catch (error) {
      console.error("[ERROR] Buy order failed:", error);
      return {
        content: [{ 
          type: "text", 
          text: `Failed to place buy order: ${error.message}` 
        }]
      };
    }
  }
);

server.tool("sell-stock",
  {
    stock: z.string(),
    quantity: z.number()
  },
  async ({ stock, quantity }) => {
    try {
      const result = await placeOrder(stock, quantity, "SELL");  // Added await here
      // console.log("[DEBUG] Order result:", result);?
      
      return {
        content: [{ 
          type: "text", 
          text: `Order successfully placed for ${quantity} shares of ${stock}! Order ID: ${result.order_id}` 
        }]
      };
    } catch (error) {
      // console.error("[ERROR] Sell order failed:", error);
      return {
        content: [{ 
          type: "text", 
          // text: `Failed to place sell order: ${error.message}` 
        }]
      };
    }
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);