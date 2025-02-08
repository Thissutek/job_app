import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

import NavBar from "../../components/nav-bar/NavBar";
import JobForm from "../../components/JobForm";
import JobTable from "../../components/JobTable";

export default function MainApp() {
  const [jobs, setJobs] = useState([])  


  return (
    <div>
      <NavBar />
      <JobForm jobs={jobs} setJobs={setJobs} />
      <JobTable jobs={jobs} setJobs={setJobs}/>
    </div>
  )
}