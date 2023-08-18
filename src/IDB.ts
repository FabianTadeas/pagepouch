import Dexie, { type Table } from "dexie";

class IDB extends Dexie {
  joeys!: Table<{id?:number,title:string,url:string,icon?:string,added:number}>;

  constructor() {
    super("pagepouchIDB");
    this.version(1).stores({
      joeys: "++id, title, added, url",
    });
  }
}

const idb = new IDB();
export default idb;
