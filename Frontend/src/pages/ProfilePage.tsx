import  { useEffect, useState } from 'react';
import { Loader, Pencil, Mail, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Nav_Home from "../components/Home/Nav_Home";
import { axiosInstance } from '@/utils/axios';
import Education from '@/components/ProfilePage/Education';
import WorkExperience from '@/components/ProfilePage/WorkExperience';

import useUser from '@/hooks/useUser';
import PostsProfile  from '@/components/ProfilePage/Posts';
const ProfilePage = () => {
  const { user } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    username: user?.username || "",
    about: user?.about || "",
    address: user?.address || "",
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveChanges = async () => {
    try {
      await axiosInstance.put("/user/updateinfo", updatedUser);
      window.location.reload();
    } catch (error) {
      console.error("Error updating user info:", error);
    } finally {
      setIsEditing(false);
    }
  };

  useEffect(() => {
    setUpdatedUser({
      username: user?.username || "",
      about: user?.about || "",
      address: user?.address || ""
    });
  }, [user]);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-violet-50">
        <Loader className="animate-spin text-violet-600" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50">
      <Nav_Home />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="overflow-hidden bg-white/80 backdrop-blur-sm">
          <CardContent className="p-0">
            {/* Hero Section */}
            <div className="relative h-48 bg-gradient-to-r from-violet-600 to-fuchsia-600">
              <div className="absolute -bottom-16 left-8">
                <div className="relative">
                  <img
                    src={user.image || "/default-profile.png"}
                    alt="Profile"
                    className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover"
                  />
                  <label htmlFor="profile-upload" className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg cursor-pointer hover:bg-violet-50 transition-colors">
                    <Pencil className="w-4 h-4 text-violet-600" />
                  </label>
                  <input
                    type="file"
                    id="profile-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        const formData = new FormData();
                        formData.append("profile", e.target.files[0]);
                        axiosInstance.put("/user/updateprofile", formData)
                          .then(() => window.location.reload());
                      }
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="mt-20 px-8 pb-8">
              {isEditing ? (
                <div className="space-y-6 max-w-2xl">
                  <input
                    type="text"
                    name="username"
                    value={updatedUser.username}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-violet-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none transition-all"
                    placeholder="Enter username"
                  />
                  <textarea
                    name="about"
                    value={updatedUser.about}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-violet-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none transition-all min-h-[120px]"
                    placeholder="Tell us about yourself"
                    maxLength={255}
                  />
                  <input
                    type="text"
                    name="address"
                    value={updatedUser.address}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-violet-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none transition-all"
                    placeholder="Enter location"
                  />
                  <div className="flex justify-end space-x-4">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-6 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all text-gray-700"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={saveChanges}
                      className="px-6 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 transition-all text-white"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900">{user.username}</h1>
                      <div className="mt-4 flex items-center space-x-4 text-gray-600">
                        {user.address && (
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2 text-violet-600" />
                            <span>{user.address}</span>
                          </div>
                        )}
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 mr-2 text-violet-600" />
                          <span>{user.email}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="p-2 rounded-full hover:bg-violet-50 transition-all"
                    >
                      <Pencil className="w-5 h-5 text-violet-600" />
                    </button>
                  </div>
                  
                  <p className="text-gray-600 max-w-2xl leading-relaxed">
                    {user.about || "No bio available"}
                  </p>
                  
                  <div className="flex items-center space-x-6 pt-4 border-t">
                    <div>
                      <span className="text-2xl font-bold text-violet-600">{user.connections?.length || 0}</span>
                      <span className="ml-2 text-gray-600">connections</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Additional Sections */}
        <div className="mt-8 space-y-8">
          <Education />
          <WorkExperience />
          <PostsProfile/>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;