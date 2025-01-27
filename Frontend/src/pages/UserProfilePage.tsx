import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserPlus, UserMinus, Mail, MapPin, Loader } from 'lucide-react';
import { axiosInstance } from '../utils/axios';
import useUser from '../hooks/useUser';
import Posts from '../components/ProfilePage/Posts';

interface Education {
  instituteName: string;
  qualification: string;
  from: string;
  to: string;
}

interface Experience {
  companyName: string;
  companyRole: string;
  expfrom: string;
  expto: string;
}

interface User {
  _id: string;
  username: string;
  email: string;
  image: string;
  about?: string;
  address?: string;
  connections?: string[];
  education?: Education[];
  experience?: Experience[];
}

interface CurrentUser extends User {
  connections: string[];
}

interface UseUserHook {
  user: CurrentUser | null;
}

const UserProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user: currentUser } = useUser() as UseUserHook;
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async (): Promise<void> => {
      try {
        const response = await axiosInstance.get<{ user: User }>(`/user/${id}`);
        setUser(response.data.user);
        setIsConnected(currentUser?.connections?.includes(id || '') || false);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id, currentUser]);

  const handleConnect = async (): Promise<void> => {
    try {
      await axiosInstance.post('/user/connections/add', { connectionId: id });
      setIsConnected(true);
    } catch (error) {
      console.error('Error connecting with user:', error);
    }
  };

  const handleDisconnect = async (): Promise<void> => {
    try {
      await axiosInstance.post('/user/connections/remove', { connectionId: id });
      setIsConnected(false);
    } catch (error) {
      console.error('Error disconnecting from user:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-600">User not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile Header */}
      <div className="bg-white shadow">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Profile Image */}
            <div className="w-32 h-32 md:w-40 md:h-40">
              <img
                src={user.image}
                alt={user.username}
                className="w-full h-full rounded-full object-cover border-4 border-gray-100"
              />
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900">{user.username}</h1>
              
              {user.about && (
                <p className="mt-2 text-gray-600 max-w-2xl">{user.about}</p>
              )}
              
              <div className="mt-4 flex flex-wrap items-center justify-center md:justify-start gap-4">
                {user.address && (
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{user.address}</span>
                  </div>
                )}
                
                <div className="flex items-center text-gray-600">
                  <Mail className="w-4 h-4 mr-1" />
                  <span>{user.email}</span>
                </div>
              </div>

              {/* Connection Stats */}
              <div className="mt-4 flex items-center justify-center md:justify-start gap-6">
                <div className="text-center">
                  <div className="text-xl font-semibold text-gray-900">
                    {user.connections?.length || 0}
                  </div>
                  <div className="text-sm text-gray-500">Connections</div>
                </div>
              </div>
            </div>

            {/* Connect Button */}
            <div className="flex-shrink-0">
              {currentUser && currentUser._id !== id && (
                <button
                  onClick={isConnected ? handleDisconnect : handleConnect}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-colors
                    ${isConnected 
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                      : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                >
                  {isConnected ? (
                    <>
                      <UserMinus className="w-4 h-4" />
                      Disconnect
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4" />
                      Connect
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Education & Experience */}
          <div className="space-y-6">
            {/* Education Section */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Education</h2>
              {user.education && user.education.length > 0 ? (
                <div className="space-y-4">
                  {user.education.map((edu, index) => (
                    <div key={index} className="border-b last:border-0 pb-4 last:pb-0">
                      <h3 className="font-medium text-gray-900">{edu.instituteName}</h3>
                      <p className="text-gray-600">{edu.qualification}</p>
                      <p className="text-sm text-gray-500">{edu.from} - {edu.to}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">No education details available</p>
              )}
            </div>

            {/* Experience Section */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Experience</h2>
              {user.experience && user.experience.length > 0 ? (
                <div className="space-y-4">
                  {user.experience.map((exp, index) => (
                    <div key={index} className="border-b last:border-0 pb-4 last:pb-0">
                      <h3 className="font-medium text-gray-900">{exp.companyRole}</h3>
                      <p className="text-gray-600">{exp.companyName}</p>
                      <p className="text-sm text-gray-500">{exp.expfrom} - {exp.expto}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">No experience details available</p>
              )}
            </div>
          </div>

          {/* Right Column - Posts */}
          <div className="lg:col-span-2">
            {/* <Posts userId={id || ''} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;