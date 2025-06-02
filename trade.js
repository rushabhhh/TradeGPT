import { KiteConnect } from "kiteconnect";

export async function placeOrder(tradingsymbol, quantity, transaction_type) {
    const apiKey = "your_api_key_here"; // Replace with your actual API key
    const apiSecret = "your_api_secret_here"; // Replace with your actual API secret
    let access_token ="your_access_token_here"; // Replace with your actual access token
    
    try {
        // console.log(`[DEBUG] Initializing order: ${transaction_type} ${quantity} ${tradingsymbol}`);
        
        const kc = new KiteConnect({ api_key: apiKey });
        kc.setAccessToken(access_token);

        // Standardize the trading symbol format (uppercase)
        const formattedSymbol = tradingsymbol.toUpperCase();
        
        const orderResponse = await kc.placeOrder(
            "regular",
            {
                exchange: "NSE",
                tradingsymbol: formattedSymbol,
                transaction_type: transaction_type,
                quantity: quantity,
                product: "CNC",
                order_type: "MARKET"
            }
        );

        console.log("[SUCCESS] Order placed:", orderResponse);
        return orderResponse;

    } catch (err) {
        console.error("[ERROR] Failed to place order:", {
            error: err.message,
            symbol: tradingsymbol,
            quantity: quantity,
            type: transaction_type
        });
        throw err;
    }
}
