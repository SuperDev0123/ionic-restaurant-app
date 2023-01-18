import { useCallback, useState } from "react"
import { styled, spacing } from "@mui/system"
import { useTheme } from "@mui/material/styles"
import { CardElement } from "@stripe/react-stripe-js"
import { usePayment } from "../../../payment/contexts/PaymentContextStadiums"
import MuiTextField from "@mui/material/TextField"
const TextField = styled(MuiTextField)(spacing)

const CardElementStyled = styled(CardElement)({
  maxWidth: 600,
})

const CardInput = () => {
  const { setIsCardInfoComplete, setCardError } = usePayment()
  const theme = useTheme()

  const handleChange = async event => {
    setIsCardInfoComplete(!event.empty)
    setCardError(event.error ? event.error.message : "")
  }

  return (
    <CardElementStyled
      componet={TextField}
      id="card-element"
      onChange={handleChange}
      options={{
        style: {
          base: {
            fontSize: "16px",
            lineHeight: "40px",
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.background.paper,
            ":-webkit-autofill": {
              color: theme.palette.text.primary,
            },
            "::placeholder": {
              color: theme.palette.text.secondary,
            },
            iconColor: theme.palette.text.primary,
          },
        },
      }}
    />
  )
}

export default CardInput
