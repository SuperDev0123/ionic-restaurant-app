const formatCost = cost => {
  try {
    return cost
      ? parseInt(cost).toLocaleString("en-US", {
          maximumFractionDigits: 2,
        })
      : null
  } catch (err) {
    return null
  }
}

export default formatCost
