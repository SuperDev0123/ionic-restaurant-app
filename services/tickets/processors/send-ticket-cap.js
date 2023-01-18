import moment from "moment"
import { sendEmail } from "../../../adapters/sendgrid"
import config from "../../../config"
import attachFiles from "./attach-files"

const sendTicket = async (ticketFields, filesToAttach) => {
  const attachments = filesToAttach
    ? await attachFiles(filesToAttach)
    : undefined
  return sendEmail({
    to: [config.tickets.sendToAddressCaps, ticketFields["email"]], 
    subject: `ShowZone.io CAP Request - ${moment().format("YYYYMMDD, HH:mm:ss")}`,
    text: Object.keys(ticketFields)
      .map(key => `${key}: ${ticketFields[key]}`)
      .join("\n"),
    html: 
    `This email confirms ShowZone has successfully recieved your Create-A-Player order. 
    You can check the status of your order in the <a href="https://showzone.io/services/caps/queue">CAP Queue</a>.<br/><br/>
    Your order details are below. <br/><br/>
    _____________________________<br/><br/>` +
    Object.keys(ticketFields)
      .map(key => `<strong>${key}:</strong><br/>${ticketFields[key]}`)
      .join("<br/><br/>"),
    attachments,
  })
}

export default sendTicket
