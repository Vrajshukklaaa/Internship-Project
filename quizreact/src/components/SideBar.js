import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import User from "../assests/images/user-1.jpg";
import LeftArrow from "../assests/images/left-arrow.png";
import Dropdown,{NavDropdown} from 'react-bootstrap/';



const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("platformDashToken");
    navigate("/admin/login");
  };
  
  const [show, setShow] = useState(false);
  
  return (
    <>
      <div className="mobile-header">
        <div className="mobile-header-wrap">
          <div className="panel-expand-control">
            <a
              href="javascript:void(0);"
              onClick={toggle}
              className="d-none d-md-block"
            >
              <img src={LeftArrow} />
            </a>
            <a
              href="javascript:void(0);"
              onClick={toggle}
              className="d-block d-md-none hamburger-icon"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
              </svg>
            </a>
          </div>
          <div className="logo d-block d-md-none">
            <NavLink to="/" className="link main-logo">
              <h2>LMS</h2>
            </NavLink>
          </div>
        </div>
        <div className={isOpen ? "sidebar  sidebar-active" : "sidebar"}>
          <div className="sidebar-top">
            <a
              href="javascript:void(0);"
              class="btn-close"
              aria-label="Close"
              onClick={toggle}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
              </svg>
            </a>
            <div className="logo">
              <NavLink to="/" className="link">
                <h2>LMS</h2>
              </NavLink>
            </div>
            <ul>
              <li>
                <NavLink to="/admin/users" className="link">
                  <span className="link-icon">
                    <i class="fa fa-user" aria-hidden="true"></i>
                  </span>
                  <span className="link-text">Users</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/subjects" className="link">
                  <span className="link-icon">
                    <i class="fa fa-book" aria-hidden="true"></i>
                  </span>
                  <span className="link-text">Subjects</span>
                </NavLink>
              </li>
              <li className="custom-drop">

              

                <NavDropdown title="Subject Level" id="basic-nav-dropdown" 
                
                > 
                <NavLink to="/admin/subjectlevel" className="link">
                 
                  <span className="link-text">Level</span>
                </NavLink>

                <NavLink to="/admin/sublevel" className="link">
                  
                  <span className="link-text">Sub Level</span>
                </NavLink>


                 
               </NavDropdown>
              </li>
              <li>
                <NavLink to="/admin/topics" className="link">
                  <span className="link-icon">
                    <i class="fa fa-list-alt" aria-hidden="true"></i>
                  </span>
                  <span className="link-text">Subjects Topics</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/questions" className="link">
                  <span className="link-icon">
                  <i class="fa fa-question-circle" aria-hidden="true"></i>
                  </span>
                  <span className="link-text">Question</span>
                </NavLink>
              </li>
              <li>
                <a onClick={handleLogout} className="link">
                  <span className="link-icon">
                    <i class="fa fa-sign-out" aria-hidden="true"></i>
                  </span>
                  <span className="link-text">Logout</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <main className={isOpen ? "main-left" : ""}>{children}</main>
    </>
  );
};

export default Sidebar;
