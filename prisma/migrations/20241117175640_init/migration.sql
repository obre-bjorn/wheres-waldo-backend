/*
  Warnings:

  - The `selections` column on the `Session` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "endtime" DROP NOT NULL,
DROP COLUMN "selections",
ADD COLUMN     "selections" TEXT[];
