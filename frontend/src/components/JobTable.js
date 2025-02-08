import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function JobTable({ jobs, setJobs }) {
  const [editingJobId, setEditingJobId] = useState(null)
  const [formData, setFormData] = useState({
    job_title: "",
    company: "",
    salary: "",
    status: "",
    interview_stage: "",
    date_applied: "",
  })

  const handleEdit = (job) => {
    setEditingJobId(job.id);
    setFormData({
      job_title: job.job_title,
      company: job.company,
      salary: job.salary,
      status: job.status,
      interview_stage: job.interview_stage,
      date_applied: job.date_applied
    })
  }

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:5000/api/jobs/${editingJobId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const updatedJob = await response.json();

        setJobs((prevJobs) => prevJobs.map((job) => job.id === updatedJob.id ? updatedJob : job));
        setEditingJobId(null);
        alert('Job applicaton updated successfully')
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`)
      }
    } catch (error) {
      console.error('Error saving job', error);
      alert('An error occurred. Please try again.')
    }
  }

  useEffect(() => {
    const fetchJobs = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await fetch('http://localhost:5000/api/jobs', {
          headers: {
            Authorization: `Bearer ${token}`
          },
        });

        if (response.ok) {
          const data = await response.json();
          setJobs(data);
        }
      } catch (error) {
        console.error("Error in fetching jobs", error);
      }
    };

    fetchJobs();
  }, []);

  const handleDelete = async (jobId) => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:5000/api/jobs/${jobId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setJobs(jobs.filter(job => job.id !== jobId));
        alert('Job application deleted successfully')
      } else {
        const error = await response.json();
        alert(`Error, ${error.message}`);
      }
    } catch (error) {
      console.error('Error deleting job', error);
      alert('An error occurred. Please try again.')
    }
  }

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-20">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Job Title</th>
              <th scope="col" className="px-6 py-3">Company</th>
              <th scope="col" className="px-6 py-3">Salary Range</th>
              <th scope="col" className="px-6 py-3">Date Applied</th>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3">Interview Stage</th>
              <th scope="col" className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {editingJobId === job.id ? (
                    <input
                      type="text"
                      value={formData.job_title}
                      onChange={(e) => setFormData({ ...formData, job_title: e.target.value })}
                      className="w-full px-2 py-1 border rounded-md"
                    />
                  ) : (
                    job.job_title
                  )}
                </th>
                <td className="px-6 py-4">
                  {editingJobId === job.id ? (
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-2 py-1 border rounded-md"
                    />
                  ) : (
                    job.company
                  )}
                </td>
                <td className="px-6 py-4">
                  {editingJobId === job.id ? (
                    <input
                      type="text"
                      value={formData.salary}
                      onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                      className="w-full px-2 py-1 border rounded-md"
                    />
                  ) : (
                    job.salary
                  )}
                </td>
                <td className="px-6 py-4">
                  {editingJobId === job.id ? (
                    <input
                      type="date"
                      value={formData.date_applied}
                      onChange={(e) => setFormData({ ...formData, date_applied: e.target.value })}
                      className="w-full px-2 py-1 border rounded-md"
                    />
                  ) : (
                    new Date(job.date_applied).toLocaleDateString()
                  )}
                </td>
                <td className="px-6 py-4">
                  {editingJobId === job.id ? (
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-2 py-1 border rounded-md"
                    >
                      <option value="applied">Applied</option>
                      <option value="interviewing">Interviewing</option>
                      <option value="offer">Offer</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  ) : (
                    job.status
                  )}
                </td>
                <td className="px-6 py-4">
                  {editingJobId === job.id ? (
                    <select
                      value={formData.interview_stage}
                      onChange={(e) => setFormData({ ...formData, interview_stage: e.target.value })}
                      className="w-full px-2 py-1 border rounded-md"
                    >
                      <option value="pending">Pending</option>
                      <option value="phone interview">Phone Interview</option>
                      <option value="technical interview">Technical Interview</option>
                      <option value="onsite interview">Onsite Interview</option>
                      <option value="final interview">Final Interview</option>
                    </select>
                  ) : (
                    job.interview_stage
                  )}
                </td>
                <td className="px-6 py-4">
                  {editingJobId === job.id ? (
                    <>
                      <button onClick={handleSave} className="text-blue-500 hover:text-blue-700">Save</button>
                      <button onClick={() => setEditingJobId(null)} className="text-gray-500 hover:text-gray-700 ml-2">Cancel</button>
                    </>
                  ) : (
                    <button onClick={() => handleEdit(job)} className="text-blue-500 hover:text-blue-700">Edit</button>
                  )}
                  <button onClick={() => handleDelete(job.id)} className="text-red-500 hover:text-red-700 ml-2">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}