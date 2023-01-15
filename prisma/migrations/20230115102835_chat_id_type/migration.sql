-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Subscription" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "chat_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Subscription_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "User" ("chat_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Subscription" ("chat_id", "created_at", "id", "type") SELECT "chat_id", "created_at", "id", "type" FROM "Subscription";
DROP TABLE "Subscription";
ALTER TABLE "new_Subscription" RENAME TO "Subscription";
CREATE TABLE "new_TgtgCredentials" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "chat_id" TEXT NOT NULL,
    "access_token" TEXT NOT NULL,
    "refresh_token" TEXT NOT NULL,
    "ttl" INTEGER NOT NULL,
    "last_login" DATETIME NOT NULL,
    "tgtg_user_id" TEXT NOT NULL,
    CONSTRAINT "TgtgCredentials_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "User" ("chat_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_TgtgCredentials" ("access_token", "chat_id", "id", "last_login", "refresh_token", "tgtg_user_id", "ttl") SELECT "access_token", "chat_id", "id", "last_login", "refresh_token", "tgtg_user_id", "ttl" FROM "TgtgCredentials";
DROP TABLE "TgtgCredentials";
ALTER TABLE "new_TgtgCredentials" RENAME TO "TgtgCredentials";
CREATE UNIQUE INDEX "TgtgCredentials_chat_id_key" ON "TgtgCredentials"("chat_id");
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "chat_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_User" ("chat_id", "created_at", "id", "name") SELECT "chat_id", "created_at", "id", "name" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_chat_id_key" ON "User"("chat_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
