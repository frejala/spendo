import { Hono } from "hono";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { HTTPException } from "hono/http-exception";

import { db } from "@server/db/db";
import { accounts } from "@server/db/schema";

const app = new Hono().get("/", clerkMiddleware(), async (c) => {
  const auth = getAuth(c);

  if (!auth?.userId) {
    throw new HTTPException(401, {
      res: c.json({ error: "Unauthorized" }, 401),
    });
  }

  const data = await db
    .select({
      id: accounts.id,
      first_name: accounts.firstName,
      last_name: accounts.lastName,
    })
    .from(accounts);

  return c.json({ data });
});

export default app;