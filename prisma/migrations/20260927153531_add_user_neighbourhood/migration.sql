-- CreateEnum
CREATE TYPE "Neighbourhood" AS ENUM ('old_toronto', 'etobicoke', 'north_york', 'scarborough', 'york', 'east_york');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "neighbourhood" "Neighbourhood";
