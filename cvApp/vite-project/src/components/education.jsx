import React, { useState } from "react";

function Education() {
    const [forms, setData] = useState({
        school: "",
        title: "",
        gpa: "",
        link: "",
    });

    const CreateForm = (e) => {
        setData({ ...forms, [e.target.name]: e.target.value });
    };

    const [dataArray, setArrayInfo] = useState([]);

    const handleArray = () => {
        setArrayInfo(prevArray => [...prevArray, forms]);
        setData({ school: "", title: "", gpa: "", link: "" });
    };

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
                <h3 style={{fontFamily: 'cursive' }}>Education</h3>
                <label>School Name: <input type="text" placeholder="Harvard" onChange={CreateForm} value={forms.school} name="school" /></label>
                <label>GPA: <input type="number" min="1" max="5" placeholder="3.8" onChange={CreateForm} value={forms.gpa} name="gpa" /></label>

                {/*Title  dropdown */}
                <label>Degree:
                    <select name="title" onChange={CreateForm} value={forms.title}>
                        <option value="">Degree Title</option>
                        <option value="PHD">PHD</option>
                        <option value="MASTER">MASTER</option>
                        <option value="BACHELOR">BACHELOR</option>
                    </select>
                </label>
                <label>Link: <input type="url" placeholder="https://google.com" onChange={CreateForm} value={forms.link} name="link" /></label>
                <button onClick={handleArray}>Add Education</button>
            </div>
        </div>
    );
}

export default Education;