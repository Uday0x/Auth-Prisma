/*
  Warnings:

  - You are about to drop the column `passwordResetTokenExpiry` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "passwordResetTokenExpiry",
ADD COLUMN     "passwordResetExpiry" TEXT,
ALTER COLUMN "verificationToken" DROP NOT NULL,
ALTER COLUMN "isVerified" SET DEFAULT false,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;
