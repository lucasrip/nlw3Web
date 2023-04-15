import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import logo from '../images/Local.svg';
import'../styles/components/Sidebar.css';
import { useHistory } from 'react-router-dom';

export default function Sidebar()
{
    const{goBack}=useHistory();
    return (
        <aside className="app-sidebar">
        <img src={logo} alt="Happy" />

        <footer>
          <button type="button" onClick={goBack}>
            <FiArrowLeft size={24} color="#FFF" />
          </button>
        </footer>
      </aside>

    )
}
