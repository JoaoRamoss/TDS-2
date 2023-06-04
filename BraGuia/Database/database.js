import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('historyDatabase.db');

export const createTable = () => {
  db.transaction((transaction) => {
    transaction.executeSql(
      'CREATE TABLE IF NOT EXISTS HistoryTable (id INTEGER PRIMARY KEY AUTOINCREMENT, json TEXT)',
      [],
      () => {
      },
      (error) => {
        console.log('Error creating table:', error);
      }
    );
  });
};

export const saveData = (data) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM HistoryTable WHERE json = ?',
          [JSON.stringify(data)],
          (tx, results) => {
            if (results.rows.length > 0) {
              resolve(false);
            } else {
              tx.executeSql(
                'INSERT INTO HistoryTable (json) VALUES (?)',
                [JSON.stringify(data)],
                (tx, results) => {
                  if (results.rowsAffected > 0) {
                    resolve(true);
                  } else {
                    resolve(false);
                  }
                }
              );
            }
          }
        );
      });
    });
  };

  export const getData = () => {
    return new Promise((resolve, reject) => {
      db.transaction((transaction) => {
        transaction.executeSql(
          'SELECT * FROM HistoryTable',
          [],
          (_, result) => {
            const { rows } = result;
            if (rows && rows.length > 0) {
              const data = rows._array.map((row) => JSON.parse(row.json));
              resolve(data);
            } else {
              resolve([]);
            }
          },
          (_, error) => {
            resolve([]); // Resolve with an empty array in case of an error
          }
        );
      });
    });
  };
  
  
  

export const clearStorage = () => {
  db.transaction((transaction) => {
    transaction.executeSql(
      'DROP TABLE IF EXISTS HistoryTable',
      [],
      () => {
      },
      (error) => {
        console.log('Error deleting table:', error);
      }
    );
  });
};

