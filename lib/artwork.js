import validObjectIDList from "../public/data/validObjectIDList.json"

export function getValidObjectID(id) {
  return validObjectIDList.includes(id.toString());
}
