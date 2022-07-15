import { useState } from "react";
import Checkbox from "./Checkbox";
import ExpandToggler from "./ExpandToggler";

function NestedCheckbox(props) {
  let { data, checkedMap, onChange } = props;

  const [expandChildren, setExpandChildren] = useState({});

  const toggleExpandChildren = (index) => {
    let newExpandedChildren = { ...expandChildren };
    newExpandedChildren[index]
      ? (newExpandedChildren[index] = false)
      : (newExpandedChildren[index] = true);
    setExpandChildren(newExpandedChildren);
  };

  const toggleChecked = (name) => {
    let currVal = checkedMap[name] && checkedMap[name].isChecked;
    onChange(name, !currVal);
  };

  return (
    <div>
      {data?.map((d, index) => {
        let isLeafNode = d?.children?.length == 0;
        return (
          <div key={`dataName${index}`} className="nested_data_wrapper">
            <div className="expandToggler_wrapper">
              <ExpandToggler
                isExpanded={expandChildren[index]}
                onToggle={() => toggleExpandChildren(index)}
                showToggler={!isLeafNode}
              />
              <Checkbox
                label={d.name}
                isChecked={checkedMap[d.name] && checkedMap[d.name].isChecked}
                onChange={() => toggleChecked(d.name)}
              />
            </div>
            {expandChildren[index] && !isLeafNode && (
              <div key={`nested-children`} className="nested_children">
                <NestedCheckbox
                  data={d.children}
                  checkedMap={checkedMap}
                  onChange={onChange}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default NestedCheckbox;
