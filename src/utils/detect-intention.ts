import intentionBalance from "./intention/intention_balance";
import intentionOrder from "./intention/intention_order";
import intentionSku from "./intention/intention_sku";
import intentionXref from "./intention/intention_xref";

function getIntentionType(message: any) {
  if (message.includes("SKU")) return "SKU";
  if (message.includes("XREF")) return "XREF";
  if (message.includes("SALDO")) return "SALDO";
  if (message.includes("PEDIDO")) return "PEDIDO";
  return "UNKNOWN";
}

async function detectIntention(from: any, message: string): Promise<any> {
  message = message.toUpperCase();
  const intentionType = getIntentionType(message);

  switch (intentionType) {
    case "SKU":
      return await intentionSku(message);
    case "XREF":
      return await intentionXref(message);
    case "SALDO":
      return await intentionBalance(from);
    case "PEDIDO":
      return await intentionOrder(from);
    default:
      return null;
  }
}

export default detectIntention;
