import { useState, useEffect } from "react";
import Checkbox from "./Checkbox";
import ExpandToggler from "./ExpandToggler";
import { listToTreeData } from "../shared/Helper";

function NestedCheckbox(props) {
  let {
    value,
    onChange,
    treeDataProps,
    treeMapProps,
    intermediateColor,
  } = props;

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

  const changeCheckVal = (node, val, updatedTree) => {
    if (!node) {
      return;
    }
    let key = node.name;
    let updatedNode = updatedTree[key];
    updatedNode["isChecked"] = val;
    updatedNode["isIntermediate"] = false;
    if (node.children && node.children.length > 0) {
      for (let i = 0; i < node.children.length; i++) {
        changeCheckVal(node.children[i], val, updatedTree);
      }
    } else {
      setTreeMap({ ...updatedTree });
      onChange({ ...updatedTree });
    }
  };

  const changeIntermediateVal = (parentId, updatedTreeMap) => {
    if (!parentId) {
      return;
    }
    let checkedCount = 0;
    let unCheckedCount = 0;
    let intermediateCount = 0;
    let siblings = value?.filter((node) => node.parentId == parentId);
    for (let i = 0; i < siblings.length; i++) {
      let name = siblings[i]?.name;
      if (treeMap[name].isIntermediate) {
        intermediateCount++;
        break;
      } else if (treeMap[name].isChecked) {
        checkedCount++;
      } else {
        unCheckedCount++;
      }
    }
    if (intermediateCount > 0) {
      updatedTreeMap[parentId]["isIntermediate"] = true;
    } else if (checkedCount === siblings.length) {
      updatedTreeMap[parentId]["isIntermediate"] = false;
      updatedTreeMap[parentId]["isChecked"] = true;
    } else if (unCheckedCount === siblings.length) {
      updatedTreeMap[parentId]["isIntermediate"] = false;
      updatedTreeMap[parentId]["isChecked"] = false;
    } else {
      updatedTreeMap[parentId]["isIntermediate"] = true;
    }
    let grandParent = value.filter((node) => node.name == parentId)[0]
      ?.parentId;
    if (grandParent) {
      changeIntermediateVal(grandParent, updatedTreeMap);
    } else {
      setTreeMap(updatedTreeMap);
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
        if (d) {
          let isLeafNode = d?.children?.length == 0;
          let fontProps = {
            fontWeight: d.parentId != null && isLeafNode ? "400" : "600",
            color: d.parentId != null && isLeafNode ? "#7A7A7A" : "#0D2238",
          };
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
                  isIntermediate={
                    treeMap[d.name] && treeMap[d.name].isIntermediate
                  }
                  isChecked={treeMap[d.name] && treeMap[d.name].isChecked}
                  onChange={() => {
                    changeCheckVal(
                      d,
                      treeMap[d.name] && treeMap[d.name].isChecked
                        ? false
                        : true,
                      { ...treeMap }
                    );
                    changeIntermediateVal(d.parentId, { ...treeMap });
                  }}
                  labelStyle={{ ...fontProps }}
                  intermediateColor={intermediateColor}
                />
              </div>
              {expandChildren[index] && !isLeafNode && (
                <div key={`nested-children`} className={`nested_children`}>
                  <NestedCheckbox
                    value={value}
                    intermediateColor={intermediateColor}
                    treeDataProps={d.children}
                    treeMapProps={treeMap}
                    onChange={onChange}
                  />
                </div>
              )}
            </div>
          );
        }
      })}
    </div>
  );
}

export default NestedCheckbox;
