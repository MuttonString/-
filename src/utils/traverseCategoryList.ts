import { SingleCategory } from "@/api/goodsEdit/type"

function getChildCategoryLists(data: SingleCategory[]): SingleCategory[] {
  let result: SingleCategory[] = [];

  function traverse(node: SingleCategory): void {
      if (node.categoryList) {
          // 检查当前节点的categoryList是否为空对象或null
          if (node.categoryList.length === 0 || node.categoryList.every(item => item === null)) {
              result.push(node);
          } else {
              // 对子节点进行递归遍历
              for (const child of node.categoryList) {
                  traverse(child);
              }
          }
      } else {
        result.push(node)
      }
  }

  // 遍历输入数据中的每个节点
  data.forEach(node => traverse(node));

  return result;
}

export default getChildCategoryLists