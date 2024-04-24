"use server";

import jwt from 'jsonwebtoken';

export const checkTokenValidity = (token: string) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
            if (err) {
                return reject(err);
            }
            return resolve(decoded);
        });
    });
};