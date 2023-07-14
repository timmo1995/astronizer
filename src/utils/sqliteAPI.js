
import Database from "tauri-plugin-sql-api"


export async function checkInitStatus() {
     const db = await Database.load("sqlite:data.db");
    var result = await db.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='board'");
    console.log(result);
    if(result.rowsAffected == 0) {
        console.log("inside");
        return false;
    }
    console.log("outside");
    return true;
}


export async function initDb() {
    const db = await Database.load("sqlite:data.db");
    await db.execute("CREATE TABLE \"board\" ( \"id\"	INTEGER NOT NULL UNIQUE,\
     \"name\"	TEXT NOT NULL UNIQUE, \"position\"	INTEGER NOT NULL UNIQUE, PRIMARY KEY(\"id\") )");

     console.log("Created First Table");
    await db.execute("CREATE TABLE \"task\" ( \"id\"	INTEGER NOT NULL,  \"board\"	INTEGER NOT NULL, \
        \"title\"	TEXT NOT NULL,\"position\"	INTEGER NOT NULL DEFAULT 1, FOREIGN KEY(\"board\") REFERENCES \
        \"board\"(\"id\"),  PRIMARY KEY(\"id\",\"board\") )");

    return true;
}