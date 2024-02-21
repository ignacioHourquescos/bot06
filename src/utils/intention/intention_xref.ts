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
    console.log(response);
    const data = response.results;
    const suggestions = response.suggestions;

    let formattedResponse = "";

    if (response.results.length > 0) {
      formattedResponse += `Te paso el listado de equivalencias:\n\n`;
      for (let item of data) {
        for (let key in item) {
          formattedResponse += `*${key.toUpperCase()}:* ${item[key]}\n`;
        }
      }
    } else if (suggestions.length > 0) {
      formattedResponse += `No encontré equivalencias para el articulo.\nTe paso un listado de articulos similares:\n\n`;
      for (let suggestion of suggestions) {
        formattedResponse += `*${suggestion}*\n`;
      }
    } else {
      formattedResponse = `No encontre ningúna equivalencia, ni articulo similar al que me pasaste.`;
    }

    return formattedResponse;
  } catch (error) {
    console.error("Error fetching data for XREF:", error);
    throw error;
  }
}

export default intentionXref;
