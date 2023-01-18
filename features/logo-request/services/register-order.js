import axios from "axios"

const registerOrder = body => axios.post("/api/orders", body)

export default registerOrder
