import { CitiesInTree, AreaData} from "@/pages/GoodsEdit/type";

// 将AreaData形式的数据转化成CitiesInTree[]形式，以便渲染在Tree组件上

export default function convertCities(inputData: AreaData): CitiesInTree[] {
  const result: CitiesInTree[] = [];

  for (const key in inputData["00"]) {
    if (inputData["00"].hasOwnProperty(key)) {
      const title = inputData["00"][key]
      const node: CitiesInTree = {
        title,
        key
      }
      if (inputData.hasOwnProperty(key)) {
        node.children = Object.entries(inputData[key]).map(([childKey, childTitle]) => ({
          title: childTitle,
          key: childKey
        }))
      }
      result.push(node)
    }
  }
  return result
}