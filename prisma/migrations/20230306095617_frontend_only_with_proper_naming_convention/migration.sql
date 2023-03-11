/*
  Warnings:

  - The `service_type` column on the `project_service_configs` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "serviceType" AS ENUM ('FrontEnd', 'BackEnd', 'Database');

-- AlterTable
ALTER TABLE "project_service_configs" DROP COLUMN "service_type",
ADD COLUMN     "service_type" "serviceType" NOT NULL DEFAULT 'FrontEnd';

-- DropEnum
DROP TYPE "ServiceType";
