import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserPlus, UserMinus, Mail, MapPin, Loader } from 'lucide-react';
import { axiosInstance } from '../utils/axios';
import useUser from '../hooks/useUser';
import Nav_Home from '@/components/Home/Nav_Home';

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
      await axiosInstance.post('/user/add-connection', { connectionId: id });
      setIsConnected(true);
    } catch (error) {
      console.error('Error connecting with user:', error);
    }
  };

  const handleDisconnect = async (): Promise<void> => {
    try {
      await axiosInstance.post('/user/remove-connection', { connectionId: id });
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
    <>
    <Nav_Home/>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Profile Header */}
      <div className="bg-white shadow-md">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Profile Image */}
            <div className="w-40 h-40">
              <img
                src={user.image}
                alt={user.username}
                className="w-full h-full rounded-full object-cover border-4 border-indigo-500 shadow-md transition-transform hover:scale-105 duration-300"
              />
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left space-y-4">
              <h1 className="text-3xl font-bold text-gray-800">{user.username}</h1>
              
              {user.about && (
                <p className="text-gray-600 max-w-2xl leading-relaxed">{user.about}</p>
              )}
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-6">
                {user.address && (
                  <div className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span>{user.address}</span>
                  </div>
                )}
                
                <div className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors">
                  <Mail className="w-5 h-5 mr-2" />
                  <span>{user.email}</span>
                </div>
              </div>

              {/* Connection Stats */}
              <div className="flex items-center justify-center md:justify-start gap-6">
                <div className="text-center md:text-left">
                  <div className="text-2xl font-semibold text-indigo-600">
                    {user.connections?.length || 0}
                  </div>
                  <div className="text-sm text-gray-500 font-medium">Connections</div>
                </div>
              </div>
            </div>

            {/* Connect Button */}
            <div className="flex-shrink-0">
              {currentUser && currentUser._id !== id && (
                <button
                  onClick={isConnected ? handleDisconnect : handleConnect}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300
                    ${isConnected 
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md' 
                      : 'bg-indigo-500 text-white hover:bg-indigo-600 hover:shadow-md'}`}
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
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Education & Experience */}
          <div className="space-y-6">
            {/* Education Section */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Education</h2>
              {user.education && user.education.length > 0 ? (
                <div className="space-y-4">
                  {user.education.map((edu, index) => (
                    <div key={index} className="border-b last:border-0 pb-4 last:pb-0 hover:bg-gray-50 transition-colors rounded-md p-2">
                      <h3 className="font-medium text-indigo-600">{edu.instituteName}</h3>
                      <p className="text-gray-800 font-medium">{edu.qualification}</p>
                      <p className="text-sm text-gray-500">{edu.from} - {edu.to}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">No education details available</p>
              )}
            </div>

            {/* Experience Section */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Experience</h2>
              {user.experience && user.experience.length > 0 ? (
                <div className="space-y-4">
                  {user.experience.map((exp, index) => (
                    <div key={index} className="border-b last:border-0 pb-4 last:pb-0 hover:bg-gray-50 transition-colors rounded-md p-2">
                      <h3 className="font-medium text-indigo-600">{exp.companyRole}</h3>
                      <p className="text-gray-800 font-medium">{exp.companyName}</p>
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
    </>
  );
};

export default UserProfilePage;