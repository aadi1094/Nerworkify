import  { useEffect, useState } from 'react';
import { Plus, Trash, X, Save } from 'lucide-react';
import useUser from '../../hooks/useUser';
import { axiosInstance } from '../../utils/axios';

const Education = () => {
  const { user } = useUser();
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState([
    {
      instituteName: "",
      qualification: "",
      to: "",
      from: ""
    }
  ]);

  const onChangeFormData = (e: React.ChangeEvent<HTMLInputElement>, index:number) => {
    setFormData(formData.map((data, i) => {
      if (i === index) {
        return {
          ...data,
          [e.target.name]: e.target.value
        };
      }
      return data;
    }));
  };

  const saveEducation = async () => {
    try {
      const education = formData.filter(data => data.instituteName.length !== 0);
      await axiosInstance.put("/user/addeducation", { education });
      window.location.reload();
    } catch (error) {
      console.log("Error in save edu ", error);
    } finally {
      setIsAdding(false);
    }
  };

  const deleteEducation = async (id:string) => {
    try {
      await axiosInstance.put("/user/deleteeducation", { educationId: id });
      window.location.reload();
    } catch (error) {
      console.error("Error deleting education:", error);
    }
  };

  useEffect(() => {
    if (user && formData.length === 1) {
      setFormData([...user.education, ...formData]);
    }
  }, [user]);

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Education</h2>
          {!isAdding && (
            <button
              onClick={() => setIsAdding(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
              <Plus className="w-5 h-5" />
              <span>Add Education</span>
            </button>
          )}
        </div>

        {!isAdding && (
          <div className="space-y-6">
            {user && user.education.length > 0 ? (
              user.education.map((ed:any, index:number) => (
                <div
                  key={index}
                  className="flex justify-between items-start p-4 border rounded-lg hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800">{ed.instituteName}</h3>
                    <p className="text-gray-600 mt-1">{ed.qualification}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      {ed.from} - {ed.to}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteEducation(ed._id)}
                    className="p-2 hover:bg-red-50 rounded-full group transition-colors duration-200"
                  >
                    <Trash className="w-5 h-5 text-gray-400 group-hover:text-red-500" />
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500 italic">
                No education details added yet
              </div>
            )}
          </div>
        )}

        {isAdding && (
          <div className="space-y-6">
            {formData.map((data, index) => (
              <div key={index} className="p-4 border rounded-lg bg-gray-50">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Institute Name
                    </label>
                    <input
                      type="text"
                      name="instituteName"
                      value={data.instituteName}
                      onChange={(e) => onChangeFormData(e, index)}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Qualification
                    </label>
                    <input
                      type="text"
                      name="qualification"
                      value={data.qualification}
                      onChange={(e) => onChangeFormData(e, index)}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        From Year
                      </label>
                      <input
                        type="number"
                        name="from"
                        min="1900"
                        max="2099"
                        value={data.from}
                        onChange={(e) => onChangeFormData(e, index)}
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        To Year
                      </label>
                      <input
                        type="number"
                        name="to"
                        min="1900"
                        max="2099"
                        value={data.to}
                        onChange={(e) => onChangeFormData(e, index)}
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => setIsAdding(false)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <X className="w-5 h-5" />
                <span>Cancel</span>
              </button>
              <button
                onClick={saveEducation}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                <Save className="w-5 h-5" />
                <span>Save</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Education;