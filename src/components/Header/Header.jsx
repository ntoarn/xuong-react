import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import './style.scss';

function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const nav = useNavigate();
	const email = JSON.parse(localStorage.getItem("user"))?.user?.email;
	const handleLogout = () => {
		if (confirm("Đăng xuất")) {
			localStorage.removeItem("user");
      toast.success("Đăng xuất thanh công");
			nav("/");   
		}
	};
  return (
    <>
      <header>
      <Link to="/">
        <img src="https://shop.mixigaming.com/wp-content/uploads/2019/06/logo-mixi-t%C3%A9t.png" alt="" width={150} />
      </Link>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/admin">Admin</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
      <div className="form-inline my-2 my-lg-0">
        <div className="user-menu" onClick={toggleDropdown} >
          <FaUserCircle size={30} />
          {dropdownOpen && (
            <div className="dropdown-menu">
              {email ? (
                <li>
                  <Link to="/*" className="dropdown-item">My account</Link>
                  <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                </li>
              ) : (
                <li>
                  <Link to="/login" className="dropdown-item"> Login</Link>
                  <Link to="/register" className="dropdown-item">Register</Link>
                </li>
                
              )}
              
            </div>
          )}
        </div>
      </div>
    </header>
    <ToastContainer/>
    </>
  );
}

export default Header;
