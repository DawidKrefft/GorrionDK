import { faker } from "@faker-js/faker";
import type { NextApiRequest, NextApiResponse } from "next";

/**
 * TODO: Prepare an endpoint to return a list of users
 * User faker.js or similar library to generate fake data, the minimal number of users is 100
 * The endpoint should return a pagination of 10 users per page
 * The endpoint should accept a query parameter "page" to return the corresponding page
 */

// setting up fake users data
export type User = {
  name: string;
  email: string;
  title: string;
  role: string;
};
export function createRandomUser(): User {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    title: faker.person.jobTitle(),
    role: faker.person.jobType(),
  };
}
export const USERS: User[] = faker.helpers.multiple(createRandomUser, {
  count: 118,
});

const sortedUsers = USERS.sort((a, b) => a.name.localeCompare(b.name));

// creating api endpoint for pagination
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { page = 1, limit = 10 } = req.query;

  const startIndex = (Number(page) - 1) * Number(limit);
  const endIndex = startIndex + Number(limit);

  const paginatedUsers = sortedUsers.slice(startIndex, endIndex);
  const totalPages = Math.ceil(sortedUsers.length / Number(limit));

  if (req.method === "GET") {
    const totalRecords = sortedUsers.length;

    res.status(200).json([paginatedUsers, totalPages, totalRecords]);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
