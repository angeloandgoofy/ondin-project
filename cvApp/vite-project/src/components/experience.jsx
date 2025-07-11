import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Experience() {
    const [forms, setData] = useState({
        CompanyName: "",
        jobTitle: "",
        Description: "",
        StartDate: new Date(),
        EndDate: new Date(),
    });
    const CreateForm = (e) => {
        setData({ ...forms, [e.target.name]: e.target.value });
    };

    const [dataArray, setArrayInfo] = useState([]);
    
    const handleArray = () =>{
        setArrayInfo(prevArray => [...prevArray, forms]);
        setData({CompanyName: "", jobTitle: "", Description: "", StartDate: new Date(), EndDate: new Date()});
    }


    return (
        <div style={{padding: '10px'}}>
            <div className="Container" 
            style={
                {   
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: 'inset 0px 20px 5px rgba(148, 56, 56, 0.2)',
                    border: '2px solid black',
                    padding: '10px',
                    maxWidth: '300px',
                }
            }>
                <h3 style={{fontFamily: 'cursive' }}>Experience</h3>
                <label>Company Name: <input type="text" placeholder="Netflix" onChange={CreateForm} value={forms.CompanyName} name="CompanyName" /></label>
                <label>Date Started: <DatePicker selected={forms.StartDate} onChange={(date) => setData({ ...forms, StartDate: date })} /></label>
                <label>Date Ended: <DatePicker selected={forms.EndDate} onChange={(date) => setData({ ...forms, EndDate: date })} /></label>

                {/* Job Title dropdown */}
                <label>Job Title:
                    <select name="jobTitle" onChange={CreateForm} value={forms.jobTitle}>
                        <option value="">Select Title</option>
                        <option value="Senior">Senior</option>
                        <option value="Junior">Junior</option>
                        <option value="Entry">Entry</option>
                    </select>
                </label>
                <label>Description: 
                    <textarea name="Description" placeholder="describe your role" onChange={CreateForm} value={forms.Description} style={{maxWidth: '300px'}}/>
                </label>
                <button onClick={handleArray}>Add Experience</button>
            </div>
        </div>
    );
}

export default Experience;