import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function JobTable({jobs, setJobs}) {


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
              <th scope="col" className="px-6 py-3">
                                Job Title
              </th>
              <th scope="col" className="px-6 py-3">
                                Company
              </th>
              <th scope="col" className="px-6 py-3">
                                Salary Range
              </th>
              <th scope="col" className="px-6 py-3">
                                Date Applied
              </th>
              <th scope="col" className="px-6 py-3">
                                Status
              </th>
              <th scope="col" className="px-6 py-3">
                                Interview Stage
              </th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {job.job_title}
                </th>
                <td className="px-6 py-4">
                  {job.company}
                </td>
                <td className="px-6 py-4">
                  {job.salary}
                </td>
                <td className="px-6 py-4">
                  {new Date(job.date_applied).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  {job.status}
                </td>
                <td className="px-6 py-4">
                  {job.interview_stage}
                </td>
                <td className="px-6 py-4">
                  <button onClick={() => handleDelete(job.id)} className="text-red-500 hover:text-red-700">
                  Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}