import { Client } from "whatsapp-web.js";
import { get_balance, get_xref } from "../../api/services/services";

function extractPhoneNumber(number: string) {
  const regex = /(\d{10})@/;
  const matches = number.match(regex);
  return matches ? matches[1] : null;
}

interface Invoice {
  NUM: number;
  TIPO: string;
  FECHA: string;
  CLIENTE: number;
  TOTAL: number;
}
async function intentionBalance(from: any): Promise<string> {
  let phoneNumber: string | null = extractPhoneNumber(from);
  // phoneNumber = "45523070";

  console.log("NUMERO DE TELEFONO FORMATEADO", phoneNumber);

  // Mapping of TIPO values to corresponding words
  const tipoMapping: { [key: string]: string } = {
    ANT: "Anticipo",
    ANN: "Anticipo",
    CPM: "Credito",
    FEA: "Factura",
    FCB: "Factura",
    FEB: "Factura",
    FCN: "Factura",
    CNA: "Crédito",
    CEA: "Crédito",
    CNB: "Crédito",
    CEB: "Crédito",
    CNN: "Crédito",
    BEA: "Debito",
    BEB: "Debito",
    BN: "Debito",
  };

  try {
    const response: Invoice[] = await get_balance(phoneNumber);
    console.log("ACA RESPUESTA DE EP DE BALANCE", response);

    // Format the response
    let formattedResponse: string[] = response.map((invoice: Invoice) => {
      const date = new Date(invoice.FECHA);
      const formattedDate = new Intl.DateTimeFormat("es-AR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(date);

      const formattedTotal = new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
      }).format(invoice.TOTAL);

      const tipoWord = tipoMapping[invoice.TIPO] || invoice.TIPO;

      return `*${tipoWord} ${invoice.NUM}* (${formattedDate})      ${formattedTotal}`;
    });

    // Add line breaks between each item
    formattedResponse = formattedResponse.join("\n").split("\n");

    // Calculate total sum of TOTAL values
    const totalSum = response.reduce(
      (acc: number, invoice: Invoice) => acc + invoice.TOTAL,
      0
    );
    const formattedTotalSum = new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(totalSum);

    const totalSumNumber = Number(totalSum); // Convert totalSum to a number
    if (totalSumNumber === 0) {
      formattedResponse.push(`*No tiene saldos pendientes*`);
    } else {
      formattedResponse.push(`\n *Saldo Total: ${formattedTotalSum}*`);
    }

    return formattedResponse.join("\n");
  } catch (error) {
    console.error("Error fetching data for XREF:", error);
    throw error;
  }
}

export default intentionBalance;
