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
      map[listData[i].name] = { isChecked: false };
    }
    setTreeData(treeData);
    setTreeMap(map);
  };

  const changeCheckVal = (key, val) => {
    let updatedTree = { ...treeMap };
    let updatedNode = updatedTree[key];
    updatedNode["isChecked"] = val;
    setTreeMap({ ...updatedTree });
  };

  useEffect(() => {
    listToTreeData(data);
  }, []);

  return (
    <div className="App">
      <NestedCheckbox
        data={treeData}
        checkedMap={treeMap}
        onChange={changeCheckVal}
      />
    </div>
  );
}

export default App;

/*

tree = [
  {
    id: "0-0",
    name: "Sports",
    isChecked: false,
    children: [
      {
        id: "0-0-0",
        name: "IPL",
        isChecked: false,
        children: [
          {
            id="0-0-0-0",
            name: "Mumbai Indians",
            isChecked: false,
            children: []
          },
          {
            id="0-0-0-1",
            name: "Rajasthan Royals",
            isChecked: false,
            children: []
          },
        ]
      },
      {
        id: "0-0-1",
        name: "EPL",
        isChecked: false,
        children: [
          {
            id="0-0-1-0",
            name: "Arsenal",
            isChecked: false,
            children: []
          }
        ]
      },
      {
        id: "0-0-2",
        name: "NBA",
        isChecked: false,
        children: []
      }
    ]
  },
  {
    id: "0-1",
    name: "Riding",
    isChecked: false,
    children: []
  }
]




////////////////////////////////////////

checked: [] includes all ids that are checked!

*/
