import React from 'react';
import { FaFacebook, FaLink, FaUnlink, FaCog } from 'react-icons/fa';

function Header({ isConnected, toggleConnection }) {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FaFacebook className="text-blue-600 text-3xl" />
            <h1 className="text-xl font-bold">Facebook Automation Tool</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              className={`btn flex items-center gap-2 ${isConnected ? 'btn-danger' : 'btn-primary'}`}
              onClick={toggleConnection}
            >
              {isConnected ? (
                <>
                  <FaUnlink /> Disconnect
                </>
              ) : (
                <>
                  <FaLink /> Connect to Facebook
                </>
              )}
            </button>
            
            <button className="btn btn-secondary flex items-center gap-2">
              <FaCog /> Settings
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
