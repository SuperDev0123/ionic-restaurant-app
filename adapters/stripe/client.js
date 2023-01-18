import loadStripe from "stripe"

const stripe = loadStripe(process.env.STRIPE_SECRET_KEY)

export default stripe
