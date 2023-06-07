/*
  Warnings:

  - You are about to drop the `ExerciseWeight` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ExerciseWeight" DROP CONSTRAINT "ExerciseWeight_exerciseId_fkey";

-- DropTable
DROP TABLE "ExerciseWeight";

-- CreateTable
CREATE TABLE "ExerciseProgression" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "reps" TEXT NOT NULL,

    CONSTRAINT "ExerciseProgression_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ExerciseProgression_id_key" ON "ExerciseProgression"("id");

-- AddForeignKey
ALTER TABLE "ExerciseProgression" ADD CONSTRAINT "ExerciseProgression_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
