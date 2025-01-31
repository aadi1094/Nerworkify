import { useState, useEffect } from 'react';

import { Building2, MapPin, ArrowUpRight, Search, Briefcase, Clock } from 'lucide-react';
import { axiosInstance } from '@/utils/axios';
import Nav_Home from '@/components/Home/Nav_Home';

const JobsPage = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const getJobPosts = async () => {
    try {
      const res = await axiosInstance.get('/post/getpost');
      // Filter only posts that have links (assuming these are job posts)
      const jobPosts = res.data.post.filter((post: any) => post.link);
      setJobs(jobPosts);
    } catch (error) {
      console.log('Error fetching jobs', error);
    }
  };

  useEffect(() => {
    getJobPosts();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
  };

  const filteredJobs = jobs.filter(job => 
    job.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
        <Nav_Home />
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Briefcase className="w-8 h-8 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-900">Find Your Next Opportunity</h1>
          </div>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Search jobs by keyword or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-4 pl-12 rounded-lg border border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
            />
            <Search className="w-6 h-6 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
          </div>
        </div>

        <div className="space-y-6">
          {filteredJobs.map((job, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-purple-100 p-6 hover:shadow-md transition-all duration-200">
              <div className="flex justify-between items-start">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl text-gray-900 mb-1">{job.role || "Unspecified"}</h3>
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>{formatDate(job.createdAt)}</span>
                    </div>
                  </div>
                </div>
                <a
                  href={job.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <span>Apply</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>

             
            </div>
          )).reverse()}

          {filteredJobs.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm">
              <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
              <p className="text-gray-500">Try adjusting your search terms or check back later for new opportunities.</p>
            </div>
          )}
        </div>
      </div>
    </div>
    </>

  );
};

export default JobsPage;