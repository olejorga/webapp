/*
  Warnings:

  - A unique constraint covering the columns `[number]` on the table `Week` will be added. If there are existing duplicate values, this will fail.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Day" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "employeeId" TEXT,
    "weekId" TEXT NOT NULL,
    CONSTRAINT "Day_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Day_weekId_fkey" FOREIGN KEY ("weekId") REFERENCES "Week" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Day" ("employeeId", "id", "name", "weekId") SELECT "employeeId", "id", "name", "weekId" FROM "Day";
DROP TABLE "Day";
ALTER TABLE "new_Day" RENAME TO "Day";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Week_number_key" ON "Week"("number");
