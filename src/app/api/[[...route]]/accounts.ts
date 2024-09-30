import { Hono } from "hono";
import { db } from "../../../../db/db";

const app = new Hono().get("/", (c) => {
  return c.json({ accounts: [] });
});

export default app;
