import { get_xref } from "../../api/services/services";

function extractXREFCodeFromMessage(message: string) {
  const regex = /XREF\s*\.?\s*(\w+)/i;
  const matches = message.match(regex);
  return matches ? matches[1] : null;
}

async function intentionXref(message: string): Promise<any> {
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

export default intentionXref;
