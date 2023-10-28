-- CreateIndex
CREATE INDEX `Account_userId_idx` ON `Account`(`userId`);

-- CreateIndex
CREATE INDEX `Issue_assignToUserId_idx` ON `Issue`(`assignToUserId`);

-- CreateIndex
CREATE INDEX `Session_userId_idx` ON `Session`(`userId`);
