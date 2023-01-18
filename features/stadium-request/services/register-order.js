import axios from "axios"

const registerOrder = body => axios.post("/api/orders-stadiums", body)
 
export default registerOrder
