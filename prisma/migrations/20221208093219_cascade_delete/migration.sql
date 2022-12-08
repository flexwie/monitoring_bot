-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_chat_id_fkey";

-- DropForeignKey
ALTER TABLE "TgtgCredentials" DROP CONSTRAINT "TgtgCredentials_chat_id_fkey";

-- DropForeignKey
ALTER TABLE "Usage" DROP CONSTRAINT "Usage_user_id_fkey";

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "User"("chat_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TgtgCredentials" ADD CONSTRAINT "TgtgCredentials_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "User"("chat_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usage" ADD CONSTRAINT "Usage_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
