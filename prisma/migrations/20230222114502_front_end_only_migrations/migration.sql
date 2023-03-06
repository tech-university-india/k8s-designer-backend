-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- CreateEnum
CREATE TYPE "ServiceType" AS ENUM ('FrontEnd', 'BackEnd', 'Database');

-- CreateTable
-- CREATE TABLE "users" (
--     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
--     "full_name" TEXT NOT NULL,
--     "email" TEXT NOT NULL,

--     CONSTRAINT "users_pkey" PRIMARY KEY ("id")
-- );

-- CreateTable
CREATE TABLE "Project" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectServiceConfig" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "serviceType" "ServiceType" NOT NULL DEFAULT 'FrontEnd',
    "serviceId" UUID NOT NULL,
    "projectId" UUID NOT NULL,

    CONSTRAINT "ProjectServiceConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FrontendService" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "reactVersion" TEXT NOT NULL,
    "port" TEXT NOT NULL,
    "numberOfReplicas" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "FrontendService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EnvVariables" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "field" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "frontendServicesId" UUID NOT NULL,

    CONSTRAINT "EnvVariables_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
-- CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Project_userId_key" ON "Project"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectServiceConfig_projectId_key" ON "ProjectServiceConfig"("projectId");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectServiceConfig" ADD CONSTRAINT "ProjectServiceConfig_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "FrontendService"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectServiceConfig" ADD CONSTRAINT "ProjectServiceConfig_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnvVariables" ADD CONSTRAINT "EnvVariables_frontendServicesId_fkey" FOREIGN KEY ("frontendServicesId") REFERENCES "FrontendService"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
