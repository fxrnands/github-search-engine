import "./App.css";
import { useState } from "react";
import { searchUsers, getUserRepositories } from "./api/api";

const SearchUser = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [repositories, setRepositories] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const handleSearch = async () => {
    try {
      const response = await searchUsers(searchQuery);
      setUsers(response.data.items);
    } catch (error) {
      setError("User tidak ditemukan.");
    }
  };

  const handleUserClick = async (username) => {
    try {
      const response = await getUserRepositories(username);
      setRepositories(response.data);
      setSelectedUser(username);
      toggleExpanded();
    } catch (error) {
      setError(`Error saat memuat repositories dari user ${username}.`);
    }
  };

  return (
    <div className="px-5 pt-10 md:px-20">
      <div>
        <h1 className="text-center mb-10 text-xl font-serif">
          GITHUB SEARCH ENGINE
        </h1>
      </div>
      <div>
        <input
          type="text"
          className="block h-12 border rounded-md p-2 w-full border-gray-800 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
          placeholder="Enter Username"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <ul>
          <button
            onClick={handleSearch}
            type="button"
            className="inline-flex mt-3 w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            SEARCH
          </button>
        </ul>
      </div>

      {error && <p className="m-2">{error}</p>}

      <ul className="mt-5">
        {users.map((user) => (
          <>
            <li
              key={user.id}
              className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm mt-2 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 w-full"
            >
              <button
                className="w-full"
                onClick={() => handleUserClick(user.login)}
              >
                <div className="flex justify-between items-center">
                  <div>{user.login}</div>
                  <div>
                    {selectedUser === user.login && expanded ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 cursor-pointer"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        onClick={() => setExpanded(false)}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 cursor-pointer"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        onClick={() => setExpanded(true)}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 8h16M4 16h16"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              </button>
            </li>
            <li>
              {selectedUser === user.login && expanded && (
                <ul className="ml-5">
                  {repositories.map((repo) => (
                    <li
                      className="border bg-white p-2 rounded-md m-2"
                      key={repo.id}
                    >
                      <span className="text-lg">{repo.name}</span>
                      <div className="mt-5">
                        <span className="text-xs w-[80%]">{repo.description}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </>
        ))}
      </ul>
    </div>
  );
};

export default SearchUser;
