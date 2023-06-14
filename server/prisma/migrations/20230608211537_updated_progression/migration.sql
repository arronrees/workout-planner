/*
  Warnings:

  - Changed the type of `weight` on the `ExerciseProgression` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `reps` on the `ExerciseProgression` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropIndex
DROP INDEX "Exercise_userId_key";

-- DropIndex
DROP INDEX "ExerciseProgression_exerciseId_key";

-- AlterTable
ALTER TABLE "ExerciseProgression" DROP COLUMN "weight",
ADD COLUMN     "weight" INTEGER NOT NULL,
DROP COLUMN "reps",
ADD COLUMN     "reps" INTEGER NOT NULL;
