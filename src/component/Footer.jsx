import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#050713] text-white text-center py-4 absolute inset-x-0 bottom-0">
      <div className="container mx-auto">
        <p>© {new Date().getFullYear()} Bajaj Finserv. All rights reserved.</p>
        <p>
          <a
            target="_blank"
            href="https://github.com/HackRx-4-0/Stock_Frontend" rel="noreferrer"
          >
            <i class="fa fa-github"></i>
          </a>
          <a
            href="https://github.com/your-github-username"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:underline"
          >
            GitHub
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
