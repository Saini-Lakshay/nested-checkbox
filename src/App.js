import logo from "./logo.svg";
import "./App.css";
import "./styles/Components.css";
import "./styles/GlobalCSS.css";
import { useEffect, useState } from "react";
import NestedCheckbox from "./components/NestedCheckbox";
import { data } from "./dummy/Data";

function App() {
  const [treeData, setTreeData] = useState([]);
  const [treeMap, setTreeMap] = useState({});

  const listToTreeData = (listData = []) => {
    let map = {},
      node,
      treeData = [],
      i;
    for (i = 0; i < listData.length; i++) {
      map[listData[i].name] = i;
      listData[i]["children"] = [];
    }
    for (i = 0; i < listData.length; i++) {
      node = listData[i];
      if (node.parentId !== null) {
        listData[map[node.parentId]].children.push(node);
      } else {
        treeData.push(node);
      }
    }
    for (let i = 0; i < listData.length; i++) {
      let isRoot = listData[i].parentId == null ? true : false;
      map[listData[i].name] = { isChecked: false, isRoot: isRoot };
    }
    setTreeData(treeData);
    setTreeMap(map);
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
      // recursively calling same function for children
      for (let i = 0; i < node.children.length; i++) {
        changeCheckVal(node.children[i], val);
      }
      changeCheckVal();
    }
  };

  useEffect(() => {
    listToTreeData(data);
  }, []);

  return (
    <div className="App">
      <NestedCheckbox
        data={treeData}
        treeMap={treeMap}
        onChange={changeCheckVal}
      />
    </div>
  );
}

export default App;
