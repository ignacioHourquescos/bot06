import { get_client_number_by_phone_number } from "../../api/services/services";

function extractPhoneNumber(number: string) {
  const regex = /(\d{10})@/;
  const matches = number.match(regex);
  return matches ? matches[1] : null;
}

async function intentionOrder(from: any): Promise<any> {
  let phoneNumber: string | null = extractPhoneNumber(from);
  console.log("NUMERO DE TELEFONO FORMATEADO", phoneNumber);
  try {
    const response = await get_client_number_by_phone_number(phoneNumber);
    console.log("ACA RESPUESTA DE EP DE BALANCE", response);
    const clientNumber = `${response.NUM_CLIENTE}`;
    const encodedclientNumber = encodeURIComponent(clientNumber);
    const clientName = `${response.RAZON}`;
    const encodedClientName = encodeURIComponent(clientName);
    const whatsappUrl = `Entra en este enlace para ingresar tu pedido:\n https://renova-pedidos-bot.vercel.app//NewOrderClient?clientNumber=${encodedclientNumber}&clientName=${encodedClientName}`;

    return whatsappUrl;
  } catch (error) {
    console.error("Error fetching data for XREF:", error);
    throw error;
  }
}

export default intentionOrder;
