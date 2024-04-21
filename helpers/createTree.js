let count = 0
const createTree = (list, parentId = "") => {
  let tree = [];
  list.forEach((item) => {
    if (item.parent_id == parentId) {
      count++
      const newItem = item;
      newItem.index = count;
      const children = createTree(list, item.id);
      if (children.length > 0) {
        newItem.children = children;
      }
      tree.push(newItem);
    }
  });
  return tree
};

module.exports.tree = (list, parentId = "") => {
  count = 0
  const tree = createTree(list)
  return tree;
};
