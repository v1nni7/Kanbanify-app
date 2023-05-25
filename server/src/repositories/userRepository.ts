import { prisma } from "@/config/database";

type UserDataType = {
  email: string;
  password: string;
  username: string;
};

function getUser(userId: number) {
  return prisma.users.findUnique({
    where: {
      id: userId,
    },
    select: {
      email: true,
      username: true,
      firstName: true,
      lastName: true,
      profilePicture: true,
    },
  });
}

function findByEmail(email: string) {
  return prisma.users.findUnique({
    where: {
      email,
    },
  });
}

function findByUsername(username: string) {
  return prisma.users.findUnique({
    where: {
      username,
    },
  });
}

function createUser(userData: UserDataType) {
  return prisma.users.create({
    data: userData,
  });
}

export default { findByEmail, findByUsername, createUser, getUser };
