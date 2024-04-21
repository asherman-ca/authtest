-- CreateTable
CREATE TABLE "Test" (
    "id" SERIAL NOT NULL,
    "desc" TEXT NOT NULL,
    "truthy" BOOLEAN,

    CONSTRAINT "Test_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestChild" (
    "id" SERIAL NOT NULL,
    "desc" TEXT NOT NULL,
    "testId" INTEGER NOT NULL,

    CONSTRAINT "TestChild_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TestChild" ADD CONSTRAINT "TestChild_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
