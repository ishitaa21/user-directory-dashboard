import { useEffect, useState } from "react";
import { getUsers } from "../services/api";
import UserTable from "../components/UserTable";
import SearchBar from "../components/SearchBar";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUsers();
      setUsers(data);
    };
    fetchData();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const fieldA =
      sortField === "company" ? a.company.name : a[sortField];
    const fieldB =
      sortField === "company" ? b.company.name : b[sortField];

    return sortOrder === "asc"
      ? fieldA.localeCompare(fieldB)
      : fieldB.localeCompare(fieldA);
  });

  return (
  <div className="min-h-screen bg-gray-100 p-6">
    <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow">

      <h1 className="text-3xl font-bold mb-6 text-black">
        User Directory
      </h1>

      <SearchBar search={search} setSearch={setSearch} />

      <div className="flex gap-3 my-4 flex-wrap">
        <button
          onClick={() => setSortField("name")}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Sort by Name
        </button>

        <button
          onClick={() => setSortField("company")}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          Sort by Company
        </button>

        <button
          onClick={() =>
            setSortOrder(sortOrder === "asc" ? "desc" : "asc")
          }
          className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
        >
          {sortOrder === "asc" ? "Ascending" : "Descending"}
        </button>
      </div>

      <div className="mt-4">
        <UserTable users={sortedUsers} />
      </div>

    </div>
  </div>
);
}

export default Dashboard;