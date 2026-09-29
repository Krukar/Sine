/*
  Warnings:

  - You are about to drop the column `avatar_url` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `neighbourhood` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "users_username_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "avatar_url",
DROP COLUMN "neighbourhood",
DROP COLUMN "username";

-- DropEnum
DROP TYPE "Neighbourhood";

-- CreateTable
CREATE TABLE "user_settings" (
    "user_id" VARCHAR(12) NOT NULL,
    "name" VARCHAR(128),
    "neighbourhood" VARCHAR(128),
    "area_code" VARCHAR(3),
    "drake_album" VARCHAR(128),
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_settings_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_settings_name_key" ON "user_settings"("name");

-- AddForeignKey
ALTER TABLE "user_settings" ADD CONSTRAINT "user_settings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
