function Checkbox(props) {
  const {
    label,
    isIntermediate,
    isChecked,
    onChange,
    labelStyle,
    intermediateColor,
  } = props;
  let interColor = intermediateColor ? intermediateColor : "orange";

  return (
    <div id="checkbox_wrapper">
      <span>
        <input
          id={`inp_checkbox_${label}`}
          type="checkbox"
          checked={isChecked}
          onChange={() => onChange()}
          style={
            isIntermediate
              ? {
                  backgroundColor: interColor,
                }
              : {}
          }
        />
      </span>
      <label style={labelStyle ? { ...labelStyle } : {}}>{label}</label>
    </div>
  );
}

export default Checkbox;
