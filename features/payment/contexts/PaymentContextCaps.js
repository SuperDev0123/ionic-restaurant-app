import { createContext, useState, useContext, useCallback } from "react"
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import getClientSecret from "../../../adapters/stripe/services/get-client-secret-caps"

const PaymentContext = createContext()

export const usePayment = () => useContext(PaymentContext)

export const PaymentProviderCaps = ({ children }) => {
  const stripe = useStripe()
  const elements = useElements()
  const [isCardInfoComplete, setIsCardInfoComplete] = useState(false)
  const [cardError, setCardError] = useState("")
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  const pay = useCallback(
    async values => {
      const { capPackage } = values
      const clientSecret = await getClientSecret({ capPackage })
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      )

      if (error) {
        setPaymentSuccess(false)
        throw new Error(`Payment failed ${payload.error.message}`)
      } else {
        setPaymentSuccess(true)
        return paymentIntent.id
      }
    },
    [stripe, elements]
  )

  const clearCardData = useCallback(() => {
    if (!elements) return
    try {
      elements.getElement(CardElement).clear()
    } catch (err) {}
  }, [elements])

  const contextValues = {
    isCardInfoComplete,
    setIsCardInfoComplete,
    cardError,
    setCardError,
    pay,
    paymentSuccess,
    clearCardData,
  }

  return (
    <PaymentContext.Provider value={contextValues}>
      {children}
    </PaymentContext.Provider>
  )
}

export default PaymentContext
