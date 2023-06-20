import React from 'react';
import './Dashboard.css'
import { useLocation } from 'react-router';
export default function Dashboard() {
  const location = useLocation();
  const { powerbiLink, username } = location.state;
  return(
    <div >
    
    <p>{username}</p>
    <iframe src={powerbiLink} width="auto" height="auto" title="Power BI Dashboard"></iframe>

    </div>
  );
}