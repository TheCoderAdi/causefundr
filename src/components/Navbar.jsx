import { CrowdFundingContext } from "../context/CrowdFunding.context";
import { useContext, useState } from "react";

import { Logo, Menu, Close } from "./index.js";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { currentAccount, connectWallet, dappName } =
    useContext(CrowdFundingContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuList = [
    { text: "All Campaigns", href: "/all-campaigns" },
    { text: "My Campaigns", href: "/my-campaigns" },
    { text: "Top Donors", href: "/top-donors" },
  ];

  return (
    <div className="bg-[#1b1b1b] border-b border-gray-800 sticky top-0 z-50">
      <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="relative flex items-center justify-between">
          <div className="flex items-center">
            <Link
              to="/"
              aria-label={dappName}
              title={dappName}
              className="inline-flex items-center mr-8"
            >
              <Logo />
              <span className="ml-2 text-xl font-bold tracking-wide text-gray-100">
                {dappName}
              </span>
            </Link>

            <ul className="items-center hidden space-x-8 lg:flex">
              {menuList.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.href}
                    aria-label={item.text}
                    title={item.text}
                    className="font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-400"
                  >
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {!currentAccount ? (
            <ul className="items-center hidden space-x-8 lg:flex">
              <li>
                <button
                  onClick={connectWallet}
                  className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-400 hover:bg-deep-purple-700 focus:shadow-outline focus:outline-none bg-[#644df6]"
                  aria-label="Sign Up"
                >
                  Connect Wallet
                </button>
              </li>
            </ul>
          ) : (
            <p className="text-white">{currentAccount?.substring(0, 15)}...</p>
          )}

          <div className="lg:hidden z-40">
            <button
              aria-label="Open Menu"
              title="Open Menu"
              className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu />
            </button>
          </div>
          {isMenuOpen && (
            <div className="absolute top-0 left-0 w-full">
              <div className="p-5 bg-white border rounded shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <Link
                      to="/"
                      aria-label={dappName}
                      title={dappName}
                      className="inline-flex items-center"
                    >
                      <Logo color="text-back" />
                      <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
                        {dappName}
                      </span>
                    </Link>
                  </div>
                  <div>
                    <button
                      aria-label="Close Menu"
                      title="Close Menu"
                      className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Close />
                    </button>
                  </div>
                </div>

                <nav>
                  <ul className="space-y-4">
                    {menuList.map((item, index) => (
                      <li key={index}>
                        <Link
                          to={item.href}
                          aria-label={item.text}
                          title={item.text}
                          className="font-medium tracking-wide text-gray-900 transition-colors duration-200 hover:text-teal-400"
                        >
                          {item.text}
                        </Link>
                      </li>
                    ))}

                    <li>
                      {!currentAccount ? (
                        <Link
                          to="/"
                          className="inline-flex items-center bg-[#644df6] justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-400 hover:bg-deep-purple-700 focus:shadow-outline focus:outline-none"
                          aria-label="Sign Up"
                          title="Sign Up"
                        >
                          Connect Wallet
                        </Link>
                      ) : (
                        <p className="text-black">
                          {currentAccount?.substring(0, 15)}...
                        </p>
                      )}
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
