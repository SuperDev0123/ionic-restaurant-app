const AttributeBar = props => {
  let attributeName = props.attributeName
  return (
    <div className={`statContainer ${attributeName} ${props.statType}Stat`}>
      {props.stat}
      <div className={`stat`}>
        <div
          className="statBar"
          style={{
            height: parseInt(props.stat) + parseInt(props.stat) * 0.675 + "px",
          }}
        ></div>
      </div>
    </div>
  )
}

export default AttributeBar
