import sgClient from "./client"
import config from "../../config"

const sendEmail = ({
  to,
  from = config.sendGrid.senderAddress,
  subject,
  text,
  html,
  attachments,
}) =>
  sgClient.send({
    to,
    from,
    subject,
    text,
    html,
    attachments: attachments ?? undefined,
  })

export default sendEmail
