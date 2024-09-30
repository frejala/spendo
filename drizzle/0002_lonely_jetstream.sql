ALTER TABLE "accounts" RENAME COLUMN "name" TO "first_name";--> statement-breakpoint
ALTER TABLE "accounts" ADD COLUMN "last_name" text NOT NULL;