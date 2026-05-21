import { useEffect, useState } from "react";
import SkeletonRow from "../components/admin/SkeletonRow";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : data.users || data.data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleBlockUser = async (user) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/${user._id}/block`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      if (res.ok && data.success) {
        // Optimistic local update so the UI reacts instantly
        setUsers((prev) =>
          prev.map((u) =>
            u._id === user._id ? { ...u, isBlocked: !u.isBlocked } : u
          )
        );
      } else {
        alert("Failed to update user block status: " + (data.message || ""));
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Error updating user status. Please try again.");
    }
  };

  const deleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        setUsers((prev) => prev.filter((u) => u._id !== userId));
      } else {
        alert("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Error deleting user. Please try again.");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">User Management</h2>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 text-gray-900 font-semibold">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              /* ── Skeleton rows while data loads ───────────────────────────── */
              Array.from({ length: 5 }).map((_, i) => (
                <SkeletonRow key={i} cols={5} />
              ))
            ) : users.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {user.name ||
                      `${user.firstName || ""} ${user.lastName || ""}`.trim()}
                  </td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4 capitalize">{user.role || "User"}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        user.isBlocked
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {user.isBlocked ? "Blocked" : "Active"}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex gap-3">
                    <button
                      onClick={() => toggleBlockUser(user)}
                      className={`text-sm font-semibold px-3 py-1 rounded-full border transition-colors ${
                        user.isBlocked
                          ? "border-green-500 text-green-600 hover:bg-green-50"
                          : "border-orange-400 text-orange-600 hover:bg-orange-50"
                      }`}
                    >
                      {user.isBlocked ? "Unblock" : "Block"}
                    </button>
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="text-sm font-semibold px-3 py-1 rounded-full border border-red-400 text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
