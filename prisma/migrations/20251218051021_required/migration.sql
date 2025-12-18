/*
  Warnings:

  - Made the column `identity` on table `characters` required. This step will fail if there are existing NULL values in that column.
  - Made the column `abilities` on table `characters` required. This step will fail if there are existing NULL values in that column.
  - Made the column `personality` on table `characters` required. This step will fail if there are existing NULL values in that column.
  - Made the column `photo_url` on table `characters` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "characters" ALTER COLUMN "identity" SET NOT NULL,
ALTER COLUMN "abilities" SET NOT NULL,
ALTER COLUMN "personality" SET NOT NULL,
ALTER COLUMN "photo_url" SET NOT NULL;
