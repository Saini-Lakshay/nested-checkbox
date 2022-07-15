function ExpandToggler({ isExpanded, onToggle, showToggler }) {
  return (
    <span
      className={`expand-toggler ${showToggler ? "" : "hidden"}`}
      onClick={onToggle}
    >
      {isExpanded ? "-" : "+"}
    </span>
  );
}

export default ExpandToggler;
