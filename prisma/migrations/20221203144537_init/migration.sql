-- CreateEnum
CREATE TYPE "SubscriptionTypes" AS ENUM ('TooGoodToGo', 'Azure');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "chat_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "chat_id" INTEGER NOT NULL,
    "type" "SubscriptionTypes" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TgtgCredentials" (
    "id" TEXT NOT NULL,
    "chat_id" INTEGER NOT NULL,
    "access_token" TEXT NOT NULL,
    "refresh_token" TEXT NOT NULL,
    "ttl" INTEGER NOT NULL,
    "last_login" TIMESTAMP(3) NOT NULL,
    "tgtg_user_id" TEXT NOT NULL,

    CONSTRAINT "TgtgCredentials_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_chat_id_key" ON "User"("chat_id");

-- CreateIndex
CREATE UNIQUE INDEX "TgtgCredentials_chat_id_key" ON "TgtgCredentials"("chat_id");

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "User"("chat_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TgtgCredentials" ADD CONSTRAINT "TgtgCredentials_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "User"("chat_id") ON DELETE RESTRICT ON UPDATE CASCADE;
