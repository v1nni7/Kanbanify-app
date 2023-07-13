import { prisma } from '@/config/database'

type UserDataType = {
  email: string
  password: string
  username: string
}

function getUser(userId: string) {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      email: true,
      username: true,
      firstName: true,
      lastName: true,
      photo: true,
    },
  })
}

function findById(userId: string) {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
  })
}

function findByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  })
}

function findByUsername(username: string) {
  return prisma.user.findUnique({
    where: {
      username,
    },
  })
}

function createUser(userData: UserDataType) {
  return prisma.user.create({
    data: userData,
  })
}

export default {
  findById,
  findByEmail,
  findByUsername,
  createUser,
  getUser,
}
