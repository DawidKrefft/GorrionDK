import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchPeople } from "../services/apiFetch";
import { User } from "./api/people";
import Pagination from "./../components/Pagination";

export default function Task() {
  /**  TODO: Create an endpoint that returns a list of people, and use that here.
   * Use tanstack/react-query to fetch the data
   */

  // page state
  const [currentPage, setCurrentPage] = useState<number>(1);

  // data fetch
  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    useQuery(["people", currentPage], () => fetchPeople(currentPage), {
      keepPreviousData: true,
    });
  // variables for fetched data
  const totalPeople = data?.people[0];
  const totalPages = Number(data?.people[1]);
  const totalRecords = Number(data?.people[2]);

  // loading and error state
  if (isLoading) return "Loading...";
  if (isError && error instanceof Error) return error.message;

  // change pages
  const nextPage = () => setCurrentPage((prev) => prev + 1);
  const prevPage = () => setCurrentPage((prev) => prev - 1);

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full min-h-[580px] divide-y divide-gray-700">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                  >
                    Role
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {/* I am not sure if this is the best choice to check if it's array. 
                I've recently started using TS in every proj and I will be comfortable with it soon. */}
                {Array.isArray(totalPeople) ? (
                  totalPeople.map((person: User) => (
                    <tr key={person.email}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                        {person.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                        {person.title}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                        {person.email}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                        {person.role}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4}>No people found.</td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* TODO: Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalRecords={totalRecords}
              isPreviousData={isPreviousData}
              prevPage={prevPage}
              nextPage={nextPage}
            />
            {isFetching ? "Loading..." : null}
          </div>
        </div>
      </div>
    </div>
  );
}
