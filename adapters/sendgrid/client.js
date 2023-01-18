import sgClient from "@sendgrid/mail"

sgClient.setApiKey(process.env.SENDGRID_API_KEY)

export default sgClient
