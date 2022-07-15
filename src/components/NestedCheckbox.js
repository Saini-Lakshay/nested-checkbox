import { useState, useEffect } from "react";
import Checkbox from "./Checkbox";
import ExpandToggler from "./ExpandToggler";
import { listToTreeData } from "../shared/Helper";

function NestedCheckbox(props) {
  let { value, onChange, treeDataProps, treeMapProps } = props;

  const [treeData, setTreeData] = useState([]);
  const [treeMap, setTreeMap] = useState({});
  const [expandChildren, setExpandChildren] = useState({});

  useEffect(() => {
    initConfig();
  }, []);

  const initConfig = () => {
    if (!treeDataProps && !treeMapProps) {
      let { treeData, map } = listToTreeData(value);
      setTreeData(treeData);
      setTreeMap(map);
    } else {
      setTreeData(treeDataProps);
      setTreeMap(treeMapProps);
    }
  };

  const changeCheckVal = (node, val) => {
    if (!node) {
      return;
    }
    let key = node.name;
    let updatedTree = { ...treeMap };
    let updatedNode = updatedTree[key];
    updatedNode["isChecked"] = val;
    setTreeMap({ ...updatedTree });
    if (node.children && node.children.length > 0) {
      for (let i = 0; i < node.children.length; i++) {
        changeCheckVal(node.children[i], val);
      }
    } else {
      onChange(treeMap);
    }
  };

  const toggleExpandChildren = (index) => {
    let newExpandedChildren = { ...expandChildren };
    newExpandedChildren[index]
      ? (newExpandedChildren[index] = false)
      : (newExpandedChildren[index] = true);
    setExpandChildren(newExpandedChildren);
  };

  return (
    <div>
      {treeData?.map((d, index) => {
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
                onChange={() =>
                  changeCheckVal(
                    d,
                    treeMap[d.name] && treeMap[d.name].isChecked ? false : true
                  )
                }
              />
            </div>
            {expandChildren[index] && !isLeafNode && (
              <div key={`nested-children`} className={`nested_children`}>
                <NestedCheckbox
                  value={value}
                  treeDataProps={d.children}
                  treeMapProps={treeMap}
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
