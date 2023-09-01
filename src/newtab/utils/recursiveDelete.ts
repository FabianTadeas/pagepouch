import type { IndexableType } from "dexie";
import IDB from "../../IDB";

export default function recursiveDelete(rootId: IndexableType) {
  return IDB.transaction("rw", IDB.tiles, async (tx) => {
    async function deleteChildren(id: IndexableType) {
      const childDirectories = await IDB.tiles
        .where("parentId")
        .equals(id)
        .and((x) => x.type === "directory")
        .primaryKeys();

      await Promise.all(childDirectories.map((key) => deleteChildren(key)));
      const collection = IDB.tiles.where("parentId").equals(id);
      await collection.delete();
    }
    await deleteChildren(rootId);
    await IDB.tiles.delete(rootId);
  });
}
