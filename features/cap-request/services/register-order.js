import axios from "axios"

const registerOrder = body => axios.post("/api/orders-caps", body)
 
export default registerOrder
