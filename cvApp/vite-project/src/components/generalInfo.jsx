    import React, { Children, useState } from "react";
    import Button from './button'

    function GeneralInfo({onDataChange }) {
        const [forms, setData] = useState({
            Skills: "",
        });

        const CreateForm = (e) => {
            setData({...forms, [e.target.name]: e.target.value});
        }

        const [dataArray, setArrayInfo] = useState([]);

        const handleArray = () => {
            const newArray = [...dataArray, forms];
            setArrayInfo(newArray);
            setData({Skills: ""});
            if (onDataChange ) {
                onDataChange (newArray);
            }        
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
                    <h3 style={{fontFamily: 'cursive' }}>General Info</h3>
                    <label>Skills: <input type="text" placeholder="React, JavaScript, CSS" onChange={CreateForm} value={forms.Skills} name="Skills" /></label>
                    <Button handleChange={handleArray} Children={'Add Skill'}/>
                </div>
            </div>
        );
    }

    export default GeneralInfo;