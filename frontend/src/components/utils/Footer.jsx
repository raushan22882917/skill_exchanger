import React from 'react';
import bulb from '../../assets/logo.png';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="select-none bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between items-center space-y-4 md:space-y-0">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <img src={bulb} className="h-8" alt="Skill Exchange Logo" />
            <span className="text-2xl font-semibold">Skill Exchange</span>
          </div>

          {/* Social Media Links */}
          <div className="flex space-x-4">
            <a
              href="h#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <FaLinkedinIn size={20} />
            </a>
          </div>
        </div>

        <hr className="my-4 border-gray-600" />

        {/* Footer Bottom */}
        
      </div>
    </footer>
  );
}

export default Footer;
