import { KiteConnect } from "kiteconnect";

export async function placeOrder(tradingsymbol, quantity, transaction_type) {
    const apiKey = "fjb8jp84yr7hikju";
    const apiSecret = "nlqt6off12n6y7bz4q7gz20eipz7wto4";
    let access_token ="EeWJXnMVa335wuSibitOuxZSbF52bCEY";
    
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
