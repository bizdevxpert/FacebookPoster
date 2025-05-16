import React from 'react';

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">
            Facebook Automation Tool © {new Date().getFullYear()}
          </p>
          <div className="flex gap-4 mt-2 md:mt-0">
            <a href="#" className="text-gray-600 hover:text-blue-600 text-sm">Help</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 text-sm">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
