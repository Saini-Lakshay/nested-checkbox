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
      idChecked: false,
      isIntermediate: false,
    };
  }
  return { treeData, map };
};
