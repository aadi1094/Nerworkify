import { useState, useEffect } from 'react';
import { UserMinus } from 'lucide-react';
import { axiosInstance } from '../utils/axios';
import Nav_Home from '../components/Home/Nav_Home';

interface Connection {
  _id: string;
  username: string;
  image: string;
  about: string;
}

export default function Network() {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConnections();
  }, []);

  const fetchConnections = async () => {
    try {
      const response = await axiosInstance.get("/user/getuser");
      const data = await response.data;
      const connectionDetails = await Promise.all(
        data.user.connections.map(async (connectionId: string) => {
          const userResponse = await axiosInstance.get(`/user/${connectionId}`);
          return userResponse.data.user;
        })
      );
      setConnections(connectionDetails);
    } catch (error) {
      console.error('Error fetching connections:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = async (connectionId: string) => {
    try {
      const response = await axiosInstance.post('/user/remove-connection', {
        connectionId
      });

      if (response.data) {
        setConnections(prev => prev.filter(conn => conn._id !== connectionId));
      }
    } catch (error) {
      console.error('Error disconnecting:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className='min-h-screen'>
    <Nav_Home/>
    <div className="sm:px-32 px-2  pt-5">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 ">My Network</h1>
      
      {connections.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">You don't have any connections yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {connections.map((connection) => (
            <div key={connection._id} className="bg-[#f9f9f9] rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={connection.image || '/api/placeholder/64/64'}
                    alt={connection.username}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{connection.username}</h3>
                    <p className="text-gray-600 mt-1 line-clamp-2">{connection.about || 'No bio available'}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDisconnect(connection._id)}
                  className="text-gray-600 hover:text-red-600 transition-colors duration-200"
                  title="Disconnect"
                >
                  <UserMinus size={20} />
                </button>
              </div>
              
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => window.location.href = `/user/${connection._id}`}
                  className="text-[#4B0082] hover:text-indigo-700 text-sm font-medium"
                >
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
}