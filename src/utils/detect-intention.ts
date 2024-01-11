import { get_xref, get_sku } from "../api/services/services";

function extractCodeFromMessage(message: string) {
  const regex = /SKU\s*\.?\s*(\w+)/i;
  const matches = message.match(regex);
  return matches ? matches[1] : null;
}

function extractXREFCodeFromMessage(message: string) {
  const regex = /XREF\s*\.?\s*(\w+)/i;
  const matches = message.match(regex);
  return matches ? matches[1] : null;
}

async function detectIntention(message: string): Promise<any> {
  message = message.toUpperCase(); // Convert message to uppercase for case-insensitive matching

  if (message.includes("SKU")) {
    let code: string | null = extractCodeFromMessage(message);
    try {
      const response = await get_sku(code);
      console.log("ACA EST ALA DATA", response);
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
  } else if (message.includes("XREF")) {
    let code: string | null = extractXREFCodeFromMessage(message);

    try {
      const response = await get_xref(code);
      const data = response.results;
      const suggestions = response.suggestions;

      let formattedResponse = "";

      for (let item of data) {
        for (let key in item) {
          formattedResponse += `*${key.toUpperCase()}:* ${item[key]}\n`;
        }
      }

      if (suggestions.length > 0) {
        formattedResponse += `\n*Suggestions:*\n`;
        for (let suggestion of suggestions) {
          formattedResponse += `- ${suggestion}\n`;
        }
      }

      return formattedResponse;
    } catch (error) {
      console.error("Error fetching data for XREF:", error);
      throw error;
    }
  }
}

// Example usage:
export default detectIntention;
