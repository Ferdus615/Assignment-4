import validObjectIDList from "../public/validObjectIDList.json";

export function getValidObjectID(id) {
  return validObjectIDList.includes(id.toString());
}
