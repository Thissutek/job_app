import React, {useState, useEffect} from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

import { UserCircleIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

export default function NavBar() {
  const [username, setUsername] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUsername(decodedToken.username);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUsername(null);
    navigate('/');
  }

  return (
    <header>
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {username ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="text-sm font-semibold leading-6 text-gray-900 flex items-center space-x-3 p-4"
              >
                <UserCircleIcon aria-hidden="true" className="h-5 w-5 flex-none text-gray-900" />
                <span>{username}</span>
                <ChevronDownIcon aria-hidden="true" className="h-5 w-5 flex-none text-gray-900" />
              </button>

              {/* Dropdown for log out */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <a
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                    Profile
                    </a>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                    Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <a href="/login" className="text-sm font-semibold leading-6 text-gray-900 flex items-center space-x-2 p-4">
              <UserCircleIcon aria-hidden="true" className="h-5 w-5 flex-none text-gray-900" />
              <span>Log In</span>
            </a>
          )}
        </div>
      </nav>
    </header>
  )
}