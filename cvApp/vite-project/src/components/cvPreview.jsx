import { useState } from 'react';
import Button from './button';

function cvPreview(prompt){
    const [selectedEdit, setSelectedEdit] = useState(null);
    const [inputValue, setInputValue] = useState('');

    const changeData = (index) => {
        if(selectedEdit != null){
            prompt.general[index].Skills = inputValue;
            setSelectedEdit(null);
        }else{
            setSelectedEdit(index);
            setInputValue('');
        }

    };

    return(
        <>
        <div className="Header" style={{display:'flex', justifyContent:'center', fontFamily: 'cursive'}}>
            <h1>Skills</h1>
            {prompt.general.length > 0 ? (
                <div>
                    <ul> 
                    {prompt.general.map((element, index) => 
                        <li key={index}>
                            {selectedEdit === index ? (
                                <input
                                type='text'
                                placeholder='skill'
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                />
                            ) : <> {element.Skills} </>}
                            <Button handleChange={() => changeData(index)} Children={selectedEdit === index  ? 'submit' : 'edit'}/>
                        </li>
                    )}
                    </ul>
                </div>)
            :(
                <div>

                </div>
            )}
        </div>
        <hr style={{
            color: 'black',
            width:'20%'
            }}/>      
        </>

  );
}

export default cvPreview;