import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-200">
        © 2022{' '}
        <a href="/" className="uppercase hover:text-switch-sky">
          Vacations™.{' '}
        </a>{' '}
        All Rights Reserved.
      </span>
      <ul>
        <li>
          <a href="#" className="link ">
            About
          </a>
        </li>
        <li>
          <a href="#" className="link">
            Privacy Policy
          </a>
        </li>
        <li>
          <a href="#" className="link">
            Licensing
          </a>
        </li>
        <li>
          <a href="#" className="link">
            Contact
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
