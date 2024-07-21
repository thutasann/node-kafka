'use server';
import { db } from '@/utils/db';
import * as bcrypt from 'bcrypt';

const generateRandomPassword = () => {
	const characters =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()-_=+';
	const charactersLength = 8;

	const uniqueCharacters = [...Array.from(new Set(characters))];

	let password = '';

	for (let i = 0; i < charactersLength; i++) {
		const randomIndex = Math.floor(Math.random() * uniqueCharacters.length);
		password += uniqueCharacters[randomIndex];
	}

	return password;
};

export const registerUser = async (userData: any) => {
	const isUserExist = await db.user.findUnique({
		where: {
			email: userData.email,
		},
	});

	if (isUserExist) {
		return isUserExist;
	}

	const password = generateRandomPassword();

	const hashedPassword = await bcrypt.hash(password, 10);

	const user = await db.user.create({
		data: {
			name: userData.name,
			email: userData.email,
			password: hashedPassword,
			phone_number: 123231,
		},
	});

	return user;
};
