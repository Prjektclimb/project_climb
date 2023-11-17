/*
  Warnings:

  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Climber` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ClimberResult` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Example` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Gym` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Teams` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `USAClimbingEvents` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `USAEventResults` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Climber" DROP CONSTRAINT "Climber_teamId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ClimberResult" DROP CONSTRAINT "ClimberResult_climberId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ClimberResult" DROP CONSTRAINT "ClimberResult_eventId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."USAEventResults" DROP CONSTRAINT "USAEventResults_eventid_fkey";

-- DropTable
DROP TABLE "public"."Account";

-- DropTable
DROP TABLE "public"."Climber";

-- DropTable
DROP TABLE "public"."ClimberResult";

-- DropTable
DROP TABLE "public"."Example";

-- DropTable
DROP TABLE "public"."Gym";

-- DropTable
DROP TABLE "public"."Session";

-- DropTable
DROP TABLE "public"."Teams";

-- DropTable
DROP TABLE "public"."USAClimbingEvents";

-- DropTable
DROP TABLE "public"."USAEventResults";

-- DropTable
DROP TABLE "public"."User";

-- DropTable
DROP TABLE "public"."VerificationToken";

-- CreateTable
CREATE TABLE "Account" (
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "sessionToken" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "freeAccount" BOOLEAN NOT NULL,
    "premiumAccount" BOOLEAN NOT NULL,
    "userName" TEXT,
    "id" SERIAL NOT NULL,
    "example" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Gym" (
    "gymName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT,
    "image" TEXT,
    "events" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id" SERIAL NOT NULL,

    CONSTRAINT "Gym_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "USAClimbingEvents" (
    "event" TEXT NOT NULL,
    "resultsURL" TEXT NOT NULL,
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "USAClimbingEvents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "USAEventResults" (
    "date" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "id" SERIAL NOT NULL,
    "eventid" INTEGER NOT NULL,

    CONSTRAINT "USAEventResults_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClimberResult" (
    "eventId" INTEGER NOT NULL,
    "rank" INTEGER NOT NULL,
    "points" DOUBLE PRECISION NOT NULL,
    "id" SERIAL NOT NULL,
    "climberId" INTEGER NOT NULL,

    CONSTRAINT "ClimberResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Climber" (
    "name" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "categroy" TEXT,
    "qe_rank_boulder" INTEGER,
    "qu_rank_lead" INTEGER,
    "membership" INTEGER,
    "city" TEXT,
    "state" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "teamId" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id" SERIAL NOT NULL,

    CONSTRAINT "Climber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Teams" (
    "team_name" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "city" TEXT,
    "state" TEXT,
    "website" TEXT,
    "contact" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id" SERIAL NOT NULL,

    CONSTRAINT "Teams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Example" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Example_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_userName_key" ON "User"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "Gym_gymName_key" ON "Gym"("gymName");

-- CreateIndex
CREATE UNIQUE INDEX "USAClimbingEvents_resultsURL_key" ON "USAClimbingEvents"("resultsURL");

-- CreateIndex
CREATE UNIQUE INDEX "Teams_team_name_key" ON "Teams"("team_name");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "USAEventResults" ADD CONSTRAINT "USAEventResults_eventid_fkey" FOREIGN KEY ("eventid") REFERENCES "USAClimbingEvents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClimberResult" ADD CONSTRAINT "ClimberResult_climberId_fkey" FOREIGN KEY ("climberId") REFERENCES "Climber"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClimberResult" ADD CONSTRAINT "ClimberResult_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "USAEventResults"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Climber" ADD CONSTRAINT "Climber_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
