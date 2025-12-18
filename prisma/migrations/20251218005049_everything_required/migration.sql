/*
  Warnings:

  - Made the column `director` on table `movies` required. This step will fail if there are existing NULL values in that column.
  - Made the column `synopsis` on table `movies` required. This step will fail if there are existing NULL values in that column.
  - Made the column `photo_url` on table `productions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `director` on table `series` required. This step will fail if there are existing NULL values in that column.
  - Made the column `synopsis` on table `series` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "movies" ALTER COLUMN "director" SET NOT NULL,
ALTER COLUMN "synopsis" SET NOT NULL;

-- AlterTable
ALTER TABLE "productions" ALTER COLUMN "photo_url" SET NOT NULL;

-- AlterTable
ALTER TABLE "series" ALTER COLUMN "director" SET NOT NULL,
ALTER COLUMN "synopsis" SET NOT NULL;
