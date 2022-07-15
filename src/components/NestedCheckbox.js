import { useState } from "react";
import Checkbox from "./Checkbox";
import ExpandToggler from "./ExpandToggler";

function NestedCheckbox(props) {
  let { data, treeMap, onChange } = props;

  const [expandChildren, setExpandChildren] = useState({});

  const toggleExpandChildren = (index) => {
    let newExpandedChildren = { ...expandChildren };
    newExpandedChildren[index]
      ? (newExpandedChildren[index] = false)
      : (newExpandedChildren[index] = true);
    setExpandChildren(newExpandedChildren);
  };

  const toggleChecked = (node) => {
    let currVal = treeMap[node.name] && treeMap[node.name].isChecked;
    onChange(node, !currVal);
  };

  return (
    <div>
      {data?.map((d, index) => {
        let isLeafNode = d?.children?.length == 0;
        return (
          <div key={`dataName${index}`} className="nested_data_wrapper">
            {(expandChildren[index] ||
              (isLeafNode && !treeMap[d.name]?.isRoot)) && (
              <hr className={`${isLeafNode ? "leaf_hr" : "nonleaf_hr"}`} />
            )}
            <div className="expandToggler_wrapper">
              <ExpandToggler
                isExpanded={expandChildren[index]}
                onToggle={() => toggleExpandChildren(index)}
                showToggler={!isLeafNode}
              />
              <Checkbox
                label={d.name}
                isChecked={treeMap[d.name] && treeMap[d.name].isChecked}
                onChange={() => toggleChecked(d)}
              />
            </div>
            {expandChildren[index] && !isLeafNode && (
              <div key={`nested-children`} className="nested_children">
                <NestedCheckbox
                  data={d.children}
                  treeMap={treeMap}
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
