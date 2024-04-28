"use server";

import {PrismaClient} from '@prisma/client';
import crypto from 'crypto-js';

const prisma = new PrismaClient();

const SECRET_KEY = process.env.CRYPTO_SECRET || 'secret';

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

export const updateIdentifier = async (id: string, label: string, username: string, password: string) => {
    const encryptedPassword = encryptPassword(password);

    return prisma.identifier.update({
        where: {
            id: parseInt(id)
        },
        data: {
            label: label,
            username: username,
            password: encryptedPassword
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

export const exportData = async (userMail: string) => {
    const userId = await getUserId(userMail);

    const identifiers = await prisma.identifier.findMany({
        where: {
            userId: userId!.id
        },
        select: {
            id: true,
            label: true,
            username: true,
            password: true,
            createdAt: true,
            updatedAt: true
        }
    });

    const decryptedIdentifiers = identifiers.map((identifier) => ({
        ...identifier,
        password: decryptPassword(identifier.password)
    }));

    return crypto.AES.encrypt(
        JSON.stringify(decryptedIdentifiers),
        SECRET_KEY
    ).toString();
}

export const importData = async (encryptedData: string, userMail: string) => {
    try {
        const userId = await getUserId(userMail);

        const bytes = crypto.AES.decrypt(encryptedData, SECRET_KEY);
        const decryptedData = JSON.parse(bytes.toString(crypto.enc.Utf8));

        const existingLabels = await prisma.identifier.findMany({
            where: {
                userId: userId!.id,
            },
            select: {
                label: true,
            },
        });

        return await Promise.all(
            decryptedData.filter(
                (identifier: any) =>
                    !existingLabels.some((label) => label.label === identifier.label)
            ).map(async (identifier: any) => {
                const encryptedPassword = encryptPassword(identifier.password);
                return prisma.identifier.create({
                    data: {
                        label: identifier.label,
                        username: identifier.username,
                        password: encryptedPassword,
                        userId: userId!.id,
                        createdAt: identifier.createdAt,
                        updatedAt: identifier.updatedAt,
                    },
                });
            })
        );
    } catch (error) {
        console.error('Erreur lors de l\'importation des données :', error);
        throw error;
    }
};