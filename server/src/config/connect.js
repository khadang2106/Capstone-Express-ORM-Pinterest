import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

// const test = async () => {
//   try {
//     await prisma.$connect();
//     console.log('Connected');
//   } catch (error) {
//     console.log('error:', error);
//   }
// };

// test();
