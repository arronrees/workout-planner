/*
  Warnings:

  - Added the required column `sets` to the `ExerciseProgression` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ExerciseProgression" ADD COLUMN     "sets" INTEGER NOT NULL;
