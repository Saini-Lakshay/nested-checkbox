import { FaPlus, FaMinus } from "react-icons/fa";
function ExpandToggler({ isExpanded, onToggle, showToggler }) {
  return (
    <span
      className={`expand-toggler ${showToggler ? "" : "hidden"}`}
      onClick={onToggle}
    >
      {isExpanded ? <FaMinus size={9} /> : <FaPlus size={9} />}
    </span>
  );
}

export default ExpandToggler;
