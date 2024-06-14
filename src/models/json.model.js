// json 파일에서 데이터 참조
import itemUnlockData from "../../public/assets/item_unlock.json" assert {type: "json"};
import itemData from "../../public/assets/item.json" assert {type: "json"};
import stageData from "../../public/assets/stage.json" assert {type: "json"};

const geUnlockDatas = () => {
  // 참조된 json 데이터 읽기
  const UnlockDatas = itemUnlockData["data"];

  return UnlockDatas;
}

const getItemDatas = () => {
  // 참조된 json 데이터 읽기
  const itemDatas = itemData["data"];

  return itemDatas;
}

const getStageDatas = () => {
  // 참조된 json 데이터 읽기
  const stageDatas = stageData["data"];

  return stageDatas;
}

export { geUnlockDatas, getItemDatas, getStageDatas };