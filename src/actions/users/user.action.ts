"use server";

import {PrismaClient} from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const getUser = async (email: string, password: string) => {
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if (!user) {
        return null;
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        return null;
    }

    return true;
}

export const checkIfUserExist = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if (!user) {
        return null;
    }

    return true;
}

export const createUser = async (email: string, password: string) => {
    return prisma.user.create({
        data: {
            email: email,
            password: await bcrypt.hash(password, 10)
        }
    });
}