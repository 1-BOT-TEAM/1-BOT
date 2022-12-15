-- CreateTable
CREATE TABLE "guilds" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "prefix" TEXT,
    "owner" TEXT,
    "language" TEXT NOT NULL DEFAULT 'en',
    "usersId" TEXT
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT
);

-- CreateTable
CREATE TABLE "bank" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "bankid" TEXT NOT NULL,
    "balance" INTEGER NOT NULL
);
