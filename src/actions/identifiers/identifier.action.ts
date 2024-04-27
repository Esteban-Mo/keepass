"use server";

import {PrismaClient} from '@prisma/client';
import crypto from 'crypto-js';

const prisma = new PrismaClient();

const SECRET_KEY = 'jgnqiuhfdgbiuqdsbfgiuqbdfigbiqsdfbgiqbdsfijgbqijdfbgiqbdfgbqfdijgbqijf';

const encryptPassword = (password: string) => {
    return crypto.AES.encrypt(password, SECRET_KEY).toString();
}

const decryptPassword = (encryptedPassword: string) => {
    const bytes = crypto.AES.decrypt(encryptedPassword, SECRET_KEY);
    return bytes.toString(crypto.enc.Utf8);
}

const getUserId = async (userMail: string) => {
    return prisma.user.findUnique({
        where: {
            email: userMail
        }
    });
}

export const getIdentifier = async (userMail: string) => {
    const userId = await getUserId(userMail);

    const identifiers = await prisma.identifier.findMany({
        where: {
            userId: userId!.id
        }
    });

    return identifiers.map((identifier) => ({
        ...identifier,
        password: decryptPassword(identifier.password)
    }));
}

export const createIdentifier = async (userMail: string, label: string, username: string, password: string) => {
    const userId = await getUserId(userMail);
    const encryptedPassword = encryptPassword(password);

    return prisma.identifier.create({
        data: {
            label: label,
            username: username,
            password: encryptedPassword,
            userId: userId!.id
        }
    });
}

export const deleteIdentifier = async (id: string) => {
    return prisma.identifier.delete({
        where: {
            id: parseInt(id)
        }
    });
}