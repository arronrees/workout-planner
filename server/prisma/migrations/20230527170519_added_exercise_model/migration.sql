-- CreateEnum
CREATE TYPE "MUSCLE_GROUP" AS ENUM ('Chest', 'Shoulder', 'Back', 'Bicep', 'Tricep', 'Quad', 'Hamstring', 'Calf', 'Glute');

-- CreateEnum
CREATE TYPE "EQUIPMENT" AS ENUM ('Full', 'Basic', 'None');

-- CreateTable
CREATE TABLE "Exercise" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "muscleGroup" "MUSCLE_GROUP" NOT NULL,
    "equipment" "EQUIPMENT" NOT NULL,
    "notes" TEXT NOT NULL,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Exercise_id_key" ON "Exercise"("id");
