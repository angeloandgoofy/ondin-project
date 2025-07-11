import './App.css';
import Education from './components/education';
import GeneralInfo from './components/generalInfo';
import Experience from './components/experience';
import CvApp from './components/cvPreview'
import { useState } from 'react';

function App() {
  const [generalData, setGenInfo] = useState([]);

  return (
    <>
    <div className="Header" 
        style={{
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center', 
            boxShadow: 'inset 0px 20px rgba(231, 221, 221, 0.2)',
            width: '100%', 
        }}>        
        <h1>CV APPLICATION</h1>
        <h3>Fill out the form</h3>
    </div>
    <div style={{display: 'flex', flexDirection:'row'}}>
      <div className='Container' style={{padding: '10px'}}>
        <Education/>
        <Experience/>
        <GeneralInfo onDataChange={setGenInfo}/>  
      </div>
      <div style={{
        width: '100%',
        padding: '20px',
        border: '2px solid rgba(0, 0, 0, 0.3)',
        background: 'rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderRadius: '10px',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        color: '#fff',
      }}>
        <CvApp general={generalData} />  
      </div>
    </div>
    </>
  );
}

export default App;