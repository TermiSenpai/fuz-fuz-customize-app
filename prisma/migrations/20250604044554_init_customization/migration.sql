/*
  Warnings:

  - You are about to drop the column `color` on the `Customization` table. All the data in the column will be lost.
  - You are about to alter the column `design` on the `Customization` table. The data in that column could be lost. The data in that column will be cast from `String` to `Json`.
  - Added the required column `updatedAt` to the `Customization` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Customization" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "productType" TEXT NOT NULL,
    "design" JSONB NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Customization" ("design", "id", "productType") SELECT "design", "id", "productType" FROM "Customization";
DROP TABLE "Customization";
ALTER TABLE "new_Customization" RENAME TO "Customization";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
