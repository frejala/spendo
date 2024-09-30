import { pgTable, text } from "drizzle-orm/pg-core";

export const accounts = pgTable("accounts", {
  id: text("id").primaryKey(),
  plaidId: text("plaid_id"),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  userId: text("user_id").notNull(),
});
