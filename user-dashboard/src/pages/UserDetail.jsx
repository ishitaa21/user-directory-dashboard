import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserById } from "../services/api";

function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  
  const passedUser = location.state;

  
  const [user, setUser] = useState(passedUser || null);

  useEffect(() => {
   
    if (!user) {
      const fetchUser = async () => {
        const data = await getUserById(id);
        setUser(data);
      };
      fetchUser();
    }
  }, [id, user]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-slate-100 p-6">
  <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow">

    <button
      onClick={() => navigate("/")}
      className="mb-6 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
    >
      ← Back
    </button>

    <div className="flex flex-col md:flex-row gap-6">

      {/* LEFT SIDE - USER INFO */}
      <div className="flex-1 ml-20">
        <h2 className="text-2xl font-bold mb-4 text-slate-800">
          {user.name}
        </h2>

        <div className="space-y-2 text-slate-700">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Website:</strong> {user.website}</p>
        </div>

        <div className="mt-4">
          <h3 className="font-semibold">Company</h3>
          <p>{user.company.name}</p>
        </div>

        <div className="mt-4">
          <h3 className="font-semibold">Address</h3>
          <p>
            {user.address.street}, {user.address.city}, {user.address.zipcode}
          </p>
        </div>
      </div>

      {/* RIGHT SIDE - AVATAR */}
      <div className="flex justify-center items-start mr-30">
        <img
          src={`https://i.pravatar.cc/200?img=${user.id}`}
          alt="avatar"
          className="w-40 h-40 rounded-full shadow-md border ring-2 ring-indigo-200 hover:scale-105 transition duration-300"
        />
      </div>

    </div>

  </div>
</div>
  );
}

export default UserDetail;