import { useEffect, useState } from "react";
import { getUsers } from "../services/api";
import UserTable from "../components/UserTable";
import SearchBar from "../components/SearchBar";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [loading, setLoading] = useState(true);

  // ✅ timeout wrapper
  const fetchWithTimeout = (promise, timeout = 5000) => {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error("Request timed out"));
      }, timeout);

      promise
        .then((res) => {
          clearTimeout(timer);
          resolve(res);
        })
        .catch((err) => {
          clearTimeout(timer);
          reject(err);
        });
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(" Fetch started");
        setLoading(true);
    
        const data = await fetchWithTimeout(getUsers(), 5000);
        setUsers(data);

      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
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

  //  spinner UI
  // if (loading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-gray-100">
  //       <div className="loader"></div>
  //     </div>
  //   );
  // }

  //return (
    //<div className="min-h-screen bg-gray-100 p-6">
      //<div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow">
//
  //       <h1 className="text-3xl font-bold mb-6 text-black">
  //         User Directory
  //       </h1>

  //       <SearchBar search={search} setSearch={setSearch} />

  //       <div className="flex gap-3 my-4 flex-wrap">
  //         <button
  //           onClick={() => setSortField("name")}
  //           className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
  //         >
  //           Sort by Name
  //         </button>

  //         <button
  //           onClick={() => setSortField("company")}
  //           className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
  //         >
  //           Sort by Company
  //         </button>

  //         <button
  //           onClick={() =>
  //             setSortOrder(sortOrder === "asc" ? "desc" : "asc")
  //           }
  //           className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
  //         >
  //           {sortOrder === "asc" ? "Ascending" : "Descending"}
  //         </button>
  //       </div>

  //       <div className="mt-4">
  //         <UserTable users={sortedUsers} />
  //       </div>

  //     </div>
  //   </div>
  // );
}

export default Dashboard;