import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#050713] text-white text-center py-4 inset-x-0 bottom-0">
      <div className="container mx-auto">
        <p>All rights reserved © {new Date().getFullYear()} Deep Bug Divers</p>
        <p>
          <a
            target="_blank"
            href="https://github.com/HackRx-4-0/Stock-Charts"
            rel="noreferrer"
          >
            <i class="fa fa-github"></i>
          </a>
          <a
            href="https://github.com/HackRx-4-0/Stock-Charts"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white"
          >
            GitHub
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
