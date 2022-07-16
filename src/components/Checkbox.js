function Checkbox(props) {
  const { label, isIntermediate, isChecked, onChange } = props;
  return (
    <div id="checkbox_wrapper">
      <span>
        <input
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
      <label>{label}</label>
    </div>
  );
}

export default Checkbox;
