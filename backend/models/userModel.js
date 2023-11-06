const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createUser = async ({ email, password }) => {
  try {
    const user = await prisma.user.create({
      data: {
        email,
        password,
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
};

const getUserById = async (id) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
  getUserById,
};
