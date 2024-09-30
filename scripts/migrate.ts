import { config } from "dotenv";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db, connection } from "../db/db";

config({ path: ".env.local" });

const main = async () => {
  try {
    await migrate(db, { migrationsFolder: "drizzle" });
    await connection.end();
  } catch (error) {
    console.error("Error during migration: ", error);
    process.exit(1);
  }
};

main();
