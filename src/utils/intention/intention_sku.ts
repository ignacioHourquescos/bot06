import { get_sku } from "../../api/services/services";

function extractCodeFromMessage(message: string) {
  const regex = /SKU\s*\.?\s*(\w+)/i;
  const matches = message.match(regex);
  return matches ? matches[1] : null;
}

async function intentionSku(message: string): Promise<any> {
  let code: string | null = extractCodeFromMessage(message);
  try {
    const response = await get_sku(code);
    let parsedResponse = "";
    for (let item of response) {
      parsedResponse +=
        `${item.s > 30 ? "✅" : "🟨"}` +
        ` *${item.id} ⇒ $${item.p} + IVA*` +
        `\n       _${item.d}_ \n`;
    }

    return parsedResponse;
  } catch (error) {
    console.error("Error fetching data for SKU:", error);
    throw error;
  }
}

// Example usage:
export default intentionSku;
