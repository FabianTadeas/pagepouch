import Dexie, { type Table } from "dexie";

interface Tile {
  id?: number;
  title: string;
  added: number;
  parentId: number;
  span?: {
    row?: number;
    col?: number;
  };
}

interface Bookmark extends Tile {
  type: "bookmark";
  url: string;
  description?: string;
  icon?: string;
}
interface Directory extends Tile {
  type: "directory";
}

class IDB extends Dexie {
  tiles!: Table<Bookmark | Directory>;
  preferences!: Table<any>;

  constructor() {
    super("pagepouchIDB");

    // original
    this.version(1).stores({
      joeys: "++id, title, added, url",
    });

    // create "tiles table" and copy "joeys table" to it
    this.version(2)
      .stores({
        tiles: "++id, title, added, url, parentId",
        preferences: "&",
      })
      .upgrade((tx) => {
        return tx
          .table("joeys")
          .toArray()
          .then((objs) => {
            return tx.table("tiles").bulkAdd(objs);
          });
      });

    // remove joeys table
    this.version(3)
      .stores({
        joeys: null,
        tiles: "++id, title, added, url, parentId",
        preferences: "&",
      })
      .upgrade((tx) => {
        return tx
          .table("tiles")
          .toCollection()
          .modify((tile) => {
            if (tile.parentId === undefined) {
              tile.parentId = -2;
            }
            if (tile.type === undefined) {
              tile.type = tile.url ? "bookmark" : "directory";
            }
          });
      });
  }
}

const idb = new IDB();
export default idb;