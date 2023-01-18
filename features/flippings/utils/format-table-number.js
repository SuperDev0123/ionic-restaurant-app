const formatTableNumber = (value, percent = false) =>
  value
    ? `${parseInt(value).toLocaleString("en-US", {
        maximumFractionDigits: 2,
      })}${percent ? "%" : ""}`
    : ""

export default formatTableNumber
