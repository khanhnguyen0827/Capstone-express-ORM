import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Test connection function
const testConnection = async () => {
   try {
      await prisma.$queryRaw`SELECT 1+1 AS result`;
      console.log("PRISMA::Connection has been established successfully.");
   } catch (error) {
      console.error("PRISMA::Unable to connect to the database:", error);
   }
};

// Test connection when module is imported
testConnection();

export default prisma;
