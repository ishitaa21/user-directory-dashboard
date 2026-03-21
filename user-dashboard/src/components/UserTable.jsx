import { useNavigate } from "react-router-dom";


function UserTable({ users }) {
  const navigate = useNavigate();

  return (
   <table className="w-full border rounded-lg overflow-hidden shadow-sm">
  <thead className="bg-slate-100 text-slate-700">
    <tr className="cursor-pointer hover:bg-indigo-50 transition border-t">
      <th className="p-3 text-left">Name</th>
      <th className="p-3 text-left">Email</th>
      <th className="p-3 text-left">Phone</th>
      <th className="p-3 text-left">Company</th>
    </tr>
  </thead>

  <tbody>
    {users.map((user) => (
      <tr
        key={user.id}
        onClick={() =>
  navigate(`/user/${user.id}`, { state: user })
}
        className="cursor-pointer hover:bg-blue-50 transition border-t"
      >
        <td className="p-3 font-medium text-gray-800">{user.name}</td>
        <td className="p-3 text-gray-600">{user.email}</td>
        <td className="p-3 text-gray-600">{user.phone}</td>
        <td className="p-3 text-gray-600">{user.company.name}</td>
      </tr>
    ))}
  </tbody>
</table>
  );
}

export default UserTable;