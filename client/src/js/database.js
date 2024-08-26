import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log("Put to the database");

  // Creates a connection to the jate database and version.
  const jateDb = await openDB("jate", 1);

  // Creates a new transaction and specifies the database and data privileges.
  const tx = jateDb.transaction("jate", "readwrite");

  // Opens up the desired object store.
  const store = tx.objectStore("jate");

  // Uses the .put() method on the store and passes in the content.
  const request = store.put({ id: 1, value: content });

  // Gets confirmation of the request.
  const result = await request;

  if (result !== undefined) {
    console.log("Data saved to the database, ID:", result);

    // Fetch the newly inserted data to confirm it was saved correctly.
    const savedData = await store.get(result);
    console.log("Saved data:", savedData.value);
    return savedData.value;
  } else {
    console.log(
      "Note not saved"
    );
    return null;
  }
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log("Get all notes from the database");

  // Creates a connection to the kitties database and version.
  const jateDb = await openDB("jate", 1);

  // Creates a new transaction and specifies the database and data privileges.
  const tx = jateDb.transaction("jate", "readonly");

  // Opens up the desired object store.
  const store = tx.objectStore("jate");

  // Uses the .get(1) method to retrieve the value of the first record matching the query.

  const request = store.get(1);

  // Gets confirmation of the request.
  const result = await request;
  result
    ? console.log("Notes retrieved from database:", result.value)
    : console.log("No notes found in database! The cat must have stolen them!");
  return result?.value;
}

initdb();
