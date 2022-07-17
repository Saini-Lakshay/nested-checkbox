export const listToTreeData = (listData = []) => {
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
      if (!listData[map[node.parentId]]) {
        alert("Data not correct, parent node missing");
        treeData = [];
        map = {};
        return { treeData, map };
      }
      listData[map[node.parentId]].children.push(node);
    } else {
      treeData.push(node);
    }
  }
  for (let i = 0; i < listData.length; i++) {
    let isRoot = listData[i].parentId == null ? true : false;
    map[listData[i].name] = {
      isChecked: false,
      isRoot: isRoot,
      isChecked: false,
      isIntermediate: false,
    };
  }
  return { treeData, map };
};
