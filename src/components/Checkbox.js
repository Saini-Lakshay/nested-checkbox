function Checkbox(props) {
  const { label, isIntermediate, isChecked, onChange, labelStyle } = props;

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
                  backgroundColor: "orange",
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
