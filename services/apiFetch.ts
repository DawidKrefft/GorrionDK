import { ITEMS_PER_PAGE } from "@/utils/constants";
import { User } from "../pages/api/people";

type FetchPeopleResponse = {
  people: User[];
};

export const fetchPeople = async (
  page: number
): Promise<FetchPeopleResponse> => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/people?page=${page}&limit=${ITEMS_PER_PAGE}`
    );
    const totalData = response.headers.get("X-Total-Count");
    const data = await response.json();

    return {
      people: data,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch people");
  }
};
