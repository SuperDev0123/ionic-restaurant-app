const catchControllerErrors = handler => async (req, res) => {
  try {
    await handler(req, res)
  } catch (err) {
    return res
      .status(err.statusCode || err.status || 500)
      .json({ error: { message: err.message || "something went wrong" } })
  }
}

export default catchControllerErrors
