/*
  Warnings:

  - You are about to drop the `EnvVariables` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FrontendService` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Project` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProjectServiceConfig` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "EnvVariables" DROP CONSTRAINT "EnvVariables_frontendServicesId_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_userId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectServiceConfig" DROP CONSTRAINT "ProjectServiceConfig_projectId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectServiceConfig" DROP CONSTRAINT "ProjectServiceConfig_serviceId_fkey";

-- DropTable
DROP TABLE "EnvVariables";

-- DropTable
DROP TABLE "FrontendService";

-- DropTable
DROP TABLE "Project";

-- DropTable
DROP TABLE "ProjectServiceConfig";

-- CreateTable
CREATE TABLE "projects" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_service_configs" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "service_type" "ServiceType" NOT NULL DEFAULT 'FrontEnd',
    "service_id" UUID NOT NULL,
    "project_id" UUID NOT NULL,

    CONSTRAINT "project_service_configs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "frontend_services" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "react_version" TEXT NOT NULL,
    "port" TEXT NOT NULL,
    "number_of_replicas" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "frontend_services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "env_variables" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "field" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "frontend_services_id" UUID NOT NULL,

    CONSTRAINT "env_variables_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "projects_user_id_key" ON "projects"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "project_service_configs_project_id_key" ON "project_service_configs"("project_id");

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_service_configs" ADD CONSTRAINT "project_service_configs_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "frontend_services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_service_configs" ADD CONSTRAINT "project_service_configs_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "env_variables" ADD CONSTRAINT "env_variables_frontend_services_id_fkey" FOREIGN KEY ("frontend_services_id") REFERENCES "frontend_services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
