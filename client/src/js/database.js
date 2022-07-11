import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("JATE database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("JATE database created");
    },
  });

export const getDb = async (value) => {
  console.log("Getting data from the JATEDB");
  const jateDb = await openDB("jate", 1);
  const tx = jateDb.transaction("jate", "readwrite");
  const objStore = tx.objectStore("jate");
  const req = objStore.getAll();
  const res = await req;
  console.log("data saved to the jateDB", res);
};

export const putDb = async (id, value) => {
  console.log("PUT request to update JATEDB");
  const jateDb = await openDB("jate", 1);
  const tx = jateDb.transaction("jate", "readwrite");
  const objStore = tx.objectStore("jate");
  const req = objStore.put({ id: id, value: value });
  const res = await req;
  console.log("Data saved to JATEDB", res);
};

initdb();
