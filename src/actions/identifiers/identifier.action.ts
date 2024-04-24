"use server";

import {PrismaClient} from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const getUserId = async (userMail: string) => {
    return prisma.user.findUnique({
        where: {
            email: userMail
        }
    });
}

export const getIdentifier = async (userMail: string) => {
    const userId = await getUserId(userMail);

    return prisma.identifier.findMany({
        where: {
            userId: userId!.id
        }
    });
}

export const createIdentifier = async (userMail: string, label: string, username: string, password: string) => {
    const userId = await getUserId(userMail);

    return prisma.identifier.create({
        data: {
            label: label,
            username: username,
            password: bcrypt.hashSync(password, 10),
            userId: userId!.id
        }
    });
}

export const deleteIdentifier = async (id: number) => {
    return prisma.identifier.delete({
        where: {
            id: id
        }
    });
}