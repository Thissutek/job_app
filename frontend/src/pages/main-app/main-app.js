import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import NavBar from "../../components/NavBar";

import JobForm from "../../components/JobForm";
import JobTable from "../../components/JobTable";


export default function MainApp() {

  return (
    <div>
      <NavBar />
      <JobForm />
      <JobTable />
    </div>
  )
}