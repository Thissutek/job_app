import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import NavBar from "../../components/nav-bar/NavBar";


export default function MainApp() {
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [salary, setSalary] = useState('');
  const [dateApplied, setDateApplied] = useState('');
  const [status, setStatus] = useState('');
  const [interviewStage, setInterviewStage] = useState('')
  const [jobs, setJobs] = useState([])

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          jobTitle,
          company,
          salary,
          dateApplied: dateApplied.toISOString(),
          status,
          interviewStage
        }),
      });

      if (response.ok) {
        const savedJob = await response.json();
        setJobs([...jobs, savedJob]);
        alert('Job application added successfully');
        window.location.reload();
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`)
      }
    } catch (error) {
      console.error('Error submitting form', error)
      alert('An error occurred. Please try again.')
    }
  };

  return (
    <div>
      <NavBar />
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
        <h1 className='text-2xl font-bold mb-6 text-center'> Add Job Applications</h1>
                    
        <div className='mb-4'>
          <label className="block text-gray-700">Job Title</label>
          <input type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} className='w-full px-4 py-2 border rounded-md' placeholder="Enter the job title" required/>
        </div>
        <div className='mb-4'>
          <label className="block text-gray-700">Company</label>
          <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} className='w-full px-4 py-2 border rounded-md' placeholder="Enter the company name" required/>
        </div>
        <div className='mb-4'>
          <label className="block text-gray-700">Salary Range</label>
          <input type="text" value={salary} onChange={(e) => setSalary(e.target.value)} className='w-full px-4 py-2 border rounded-md' placeholder="Enter the salary range (e.g., $60,000 - $80,000)" />
        </div>
        <div className='mb-4'>
          <label className="block text-gray-700">Date Applied</label>
          <DatePicker selected={dateApplied} onChange={(date) => setDateApplied(date)} dateFormat="yyyy-MM-dd" className='w-full px-4 py-2 border rounded-md' required/>
        </div>
        <div className='mb-4'>
          <label className="block text-gray-700">Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className='w-full px-4 py-2 border rounded-md' required>
            <option value="">Select Status</option>
            <option value="applied">Applied</option>
            <option value="interviewing">Interviewing</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <div className='mb-4'>
          <label className="block text-gray-700">Interview Stage</label>
          <select value={interviewStage} onChange={(e) => setInterviewStage(e.target.value)} className='w-full px-4 py-2 border rounded-md' required>
            <option value="">Select Status</option>
            <option value="pending">Pending</option>
            <option value="phone interview">Phone Interview</option>
            <option value="technical interview">Technical Interview</option>
            <option value="onsite interview">Onsite Interview</option>
            <option value="final interview">Final Interview</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-md">
                        Submit
        </button>
      </form>
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
    </div>
  )
}