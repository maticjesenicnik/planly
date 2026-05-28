/*
  Warnings:

  - The `role` column on the `ProjectMember` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ProjectRole" AS ENUM ('ADMIN', 'PROJECT_MANAGER', 'PRODUCT_OWNER', 'SCRUM_MASTER', 'DEVELOPER', 'QUALITY_ASSURANCE', 'DESIGNER', 'VIEWER', 'CONTRIBUTOR');

-- AlterTable
ALTER TABLE "ProjectMember" DROP COLUMN "role",
ADD COLUMN     "role" "ProjectRole" NOT NULL DEFAULT 'CONTRIBUTOR';
