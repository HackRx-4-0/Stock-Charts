import React from "react";

const MyComponent = () => {
  return (
    <nav className="bg-[#050713] p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">Bajaj Finserv</div>
        <ul className="flex space-x-4">
          <li>
            <a
              href="asdf"
              className="text-white hover:bg-gray-700 px-3 py-2 rounded"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="asdf"
              className="text-white hover:bg-gray-700 px-3 py-2 rounded"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="afdsa"
              className="text-white hover:bg-gray-700 px-3 py-2 rounded"
            >
              Services
            </a>
          </li>
          <li>
            <a
              href="adkfj"
              className="text-white hover:bg-gray-700 px-3 py-2 rounded"
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default MyComponent;
