"use server";

import {PrismaClient, User} from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export type UserWithToken = User & { token: string };

export const getUser = async (email: string, password: string): Promise<UserWithToken | null> => {
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

    const token = jwt.sign({email: user.email}, process.env.JWT_SECRET!, {
        expiresIn: '1h'
    });

    return {
        ...user,
        token: token
    };
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