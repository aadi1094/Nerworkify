import { useEffect, useState } from "react";
import { Loader, Pencil } from "lucide-react";
import useUser from "../hooks/useUser";
import { axiosInstance } from "../utils/axios";
import Nav_Home from "../components/Home/Nav_Home";
import Education from "../components/ProfilePage/Education";
import WorkExperience from "../components/ProfilePage/WorkExperience";

const ProfilePage = () => {
  const { user } = useUser();
  const [isEditing, setIsEditing] = useState(false); 
  const [updatedUser, setUpdatedUser] = useState({
    username: user?.username || "",
    about: user?.about || "",
    address: user?.address || "",
  });

  // Handle input change for editable fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save updated user info
  const saveChanges = async () => {
    try {
      await axiosInstance.put("/user/updateinfo", updatedUser);
      window.location.reload(); // Reload the page to reflect updates
    } catch (error) {
      console.error("Error updating user info:", error);
    } finally {
      setIsEditing(false); // Exit edit mode
    }
  };

  useEffect(()=>{
    setUpdatedUser({
      username: user?.username || "",
      about: user?.about || "",
      address: user?.address || ""
    })
  },[user])

  return (
    <>
    <Nav_Home />
    <div className="flex flex-col justify-start items-center p-6 bg-[#e1f6ff] min-h-screen">
      {user ? (
        <div className="bg-[#003044] p-6 shadow-md rounded-md w-[80%] grid grid-cols-1 md:grid-cols-3 ">
          {/* Profile Photo */}
          <div className="flex flex-col items-center justify-center ">
            <label htmlFor="profile-upload" className="cursor-pointer relative flex justify-center items-center">
              <img
                src={user.image || "/default-profile.png"}
                alt="Profile"
                className="w-[50%] aspect-square rounded-full border-2 border-indigo-500 hover:opacity-80"
              />
            </label>
            <input
              type="file"
              id="profile-upload"
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  const formData = new FormData();
                  formData.append("profile", e.target.files[0]);
                  axiosInstance.put("/user/updateprofile", formData).then(() => {
                    window.location.reload();
                  });
                }
              }}
            />
          </div>

          {/* Editable User Details */}
          <div className=" col-span-2">
            {isEditing ? (
              <div className="flex flex-col mt-3 gap-4">
                {/* Editable Username */}
                <input
                  type="text"
                  name="username"
                  value={updatedUser.username}
                  onChange={handleChange}
                  className="p-2 border rounded"
                  placeholder="Enter username"
                />
                {/* Editable About */}
                <textarea
                  name="about"
                  value={updatedUser.about}
                  onChange={handleChange}
                  className="p-2 border rounded"
                  placeholder="Enter bio"
                  maxLength={255}
                />
                {/* Editable Address */}
                <input
                  type="text"
                  name="address"
                  value={updatedUser.address}
                  onChange={handleChange}
                  className="p-2 border rounded"
                  placeholder="Enter address"
                />

                {/* Save & Cancel Buttons */}
                <div className="flex justify-between">
                  <button
                    onClick={saveChanges}
                    className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-3">
                
                <h2 className="text-3xl font-bold text-white flex justify-between">{user.username}
                <button
                  onClick={() => setIsEditing(true)}
                  className="  text-white px-4 py-2 rounded "
                >
                  <Pencil className="w-4 h-4" />
                </button>
                </h2>
                <p className="text-gray-300">{user.about || "No bio available"}</p>
                <p className="text-gray-400">{user.address || "No address provided"}</p>
                <p className="text-white mt-2">{user.connections?.length || 0} connections</p>

                
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <Loader className="animate-spin" size={32} />
        </div>
      )}



      <Education />
      <WorkExperience />
    </div>

    </>

  );
};

export default ProfilePage;
