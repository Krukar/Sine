-- CreateTable
CREATE TABLE "attempt" (
    "id" UUID NOT NULL,
    "guess" VARCHAR(32) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "attempt_pkey" PRIMARY KEY ("id")
);
