import React, { useEffect, useState } from 'react';
import { Plus, Trash, X, Save, Briefcase } from 'lucide-react';
import useUser from '../../hooks/useUser';
import { axiosInstance } from '../../utils/axios';
import { Card, CardContent } from '@/components/ui/card';

export const WorkExperience = () => {
  const { user } = useUser();
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState([{
    companyRole: "",
    companyName: "",
    expto: "",
    expfrom: ""
  }]);

  const onChangeFormData = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
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

  const saveExperience = async () => {
    try {
      const experience = formData.filter(data => data.companyRole.length !== 0);
      await axiosInstance.put("/user/addexperience", { experience });
      window.location.reload();
    } catch (error) {
      console.log("Error in save exp ", error);
    } finally {
      setIsAdding(false);
    }
  };

  const deleteExperience = async (id: string) => {
    try {
      await axiosInstance.put("/user/deleteexperience", { experienceId: id });
      window.location.reload();
    } catch (error) {
      console.error("Error deleting experience:", error);
    }
  };

  useEffect(() => {
    if (user && formData.length === 1) {
      setFormData([...user.experience, ...formData]);
    }
  }, [user]);

  return (
    <Card className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Briefcase className="w-6 h-6 text-fuchsia-600" />
            <h2 className="text-2xl font-bold text-gray-800">Work Experience</h2>
          </div>
          {!isAdding && (
            <button
              onClick={() => setIsAdding(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-fuchsia-600 text-white rounded-lg hover:bg-fuchsia-700 transition-all duration-200 shadow-sm hover:shadow"
            >
              <Plus className="w-5 h-5" />
              <span>Add Experience</span>
            </button>
          )}
        </div>

        {!isAdding && (
          <div className="space-y-6">
            {user && user.experience.length > 0 ? (
              user.experience.map((exp: any, index: number) => (
                <div
                  key={index}
                  className="flex justify-between items-start p-4 border rounded-lg hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <Briefcase className="w-5 h-5 text-fuchsia-600" />
                      <h3 className="text-xl font-semibold text-gray-800">{exp.companyRole}</h3>
                    </div>
                    <p className="text-gray-600 mt-1">{exp.companyName}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      {exp.expfrom} - {exp.expto}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteExperience(exp._id)}
                    className="p-2 hover:bg-red-50 rounded-full group transition-colors duration-200"
                  >
                    <Trash className="w-5 h-5 text-gray-400 group-hover:text-red-500" />
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500 italic">
                No work experience added yet
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
                      Role/Position
                    </label>
                    <input
                      type="text"
                      name="companyRole"
                      value={data.companyRole}
                      onChange={(e) => onChangeFormData(e, index)}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500"
                      placeholder="e.g. Software Engineer"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={data.companyName}
                      onChange={(e) => onChangeFormData(e, index)}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500"
                      placeholder="e.g. Tech Corp Inc."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        From Year
                      </label>
                      <input
                        type="text"
                        name="expfrom"
                        value={data.expfrom}
                        onChange={(e) => onChangeFormData(e, index)}
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500"
                        placeholder="e.g. 2020"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        To Year
                      </label>
                      <input
                        type="text"
                        name="expto"
                        value={data.expto}
                        onChange={(e) => onChangeFormData(e, index)}
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500"
                        placeholder="e.g. 2023 or Present"
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
                onClick={saveExperience}
                className="flex items-center space-x-2 px-4 py-2 bg-fuchsia-600 text-white rounded-lg hover:bg-fuchsia-700 transition-all duration-200"
              >
                <Save className="w-5 h-5" />
                <span>Save</span>
              </button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WorkExperience;