import  { useEffect, useState } from 'react';
import { Plus, Trash, X, Save, GraduationCap } from 'lucide-react';
import useUser from '../../hooks/useUser';
import { axiosInstance } from '../../utils/axios';
import { Card, CardContent } from '../ui/card';

export const Education = () => {
  const { user } = useUser();
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState([{
    instituteName: "",
    qualification: "",
    to: "",
    from: ""
  }]);

  const onChangeFormData = (e:any, index:number) => {
    setFormData(formData.map((data, i) => {
      if (i === index) {
        return { ...data, [e.target.name]: e.target.value };
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

  useEffect(() => {
    if (user && formData.length === 1) {
      setFormData([...user.education, ...formData]);
    }
  }, [user]);

  const deleteEducation = async (id:string) => {
    try {
      await axiosInstance.put("/user/deleteeducation", { educationId:id });
      window.location.reload();
    } catch (error) {
      console.log("Error in delete edu ", error);
    }
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <GraduationCap className="w-6 h-6 text-violet-600" />
            <h2 className="text-2xl font-bold text-gray-800">Education</h2>
          </div>
          {!isAdding && (
            <button
              onClick={() => setIsAdding(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-all duration-200 shadow-sm hover:shadow"
            >
              <Plus className="w-5 h-5" />
              <span>Add Education</span>
            </button>
          )}
        </div>

        {!isAdding ? (
          <div className="space-y-4">
            {user?.education?.length > 0 ? (
              user.education.map((ed:any, index:number) => (
                <div
                  key={index}
                  className="p-4 border border-violet-100 rounded-lg hover:bg-violet-50/50 transition-all duration-200"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-violet-800">{ed.instituteName}</h3>
                      <p className="text-gray-700 mt-1">{ed.qualification}</p>
                      <p className="text-sm text-gray-500 mt-2">{ed.from} - {ed.to}</p>
                    </div>
                    <button
                      onClick={() => deleteEducation(ed._id)}
                      className="p-2 hover:bg-red-50 rounded-full group transition-colors duration-200"
                    >
                      <Trash className="w-5 h-5 text-gray-400 group-hover:text-red-500" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500 italic bg-violet-50/50 rounded-lg">
                No education details added yet
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {formData.map((data, index) => (
              <div key={index} className="p-6 border border-violet-100 rounded-lg bg-violet-50/50">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Institute Name</label>
                    <input
                      type="text"
                      name="instituteName"
                      value={data.instituteName}
                      onChange={(e) => onChangeFormData(e, index)}
                      className="w-full p-3 border border-violet-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Qualification</label>
                    <input
                      type="text"
                      name="qualification"
                      value={data.qualification}
                      onChange={(e) => onChangeFormData(e, index)}
                      className="w-full p-3 border border-violet-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">From Year</label>
                      <input
                        type="number"
                        name="from"
                        min="1900"
                        max="2099"
                        value={data.from}
                        onChange={(e) => onChangeFormData(e, index)}
                        className="w-full p-3 border border-violet-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">To Year</label>
                      <input
                        type="number"
                        name="to"
                        min="1900"
                        max="2099"
                        value={data.to}
                        onChange={(e) => onChangeFormData(e, index)}
                        className="w-full p-3 border border-violet-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsAdding(false)}
                className="flex items-center space-x-2 px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200"
              >
                <X className="w-5 h-5" />
                <span>Cancel</span>
              </button>
              <button
                onClick={saveEducation}
                className="flex items-center space-x-2 px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-all duration-200"
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

export default Education;