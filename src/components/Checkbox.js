function Checkbox(props) {
  const { label, isChecked, onChange } = props;
  return (
    <div id="checkbox_wrapper">
      <span>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => onChange()}
        />
      </span>
      <label>{label}</label>
    </div>
  );
}

export default Checkbox;
