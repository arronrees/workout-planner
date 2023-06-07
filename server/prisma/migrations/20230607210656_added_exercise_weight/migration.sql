-- CreateTable
CREATE TABLE "ExerciseWeight" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "reps" TEXT NOT NULL,

    CONSTRAINT "ExerciseWeight_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ExerciseWeight_id_key" ON "ExerciseWeight"("id");

-- AddForeignKey
ALTER TABLE "ExerciseWeight" ADD CONSTRAINT "ExerciseWeight_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
