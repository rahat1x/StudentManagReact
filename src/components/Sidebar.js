import React, { Children } from 'react'
import { FaTh, FaThList, FaUserAlt} from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import  "./Sidebar.css"
const SideBar = ({children}) => {
  const menuItem = [
    {
      path:"/",
      name:"AddStudent",
      icon:<FaTh/>
    },
    {
      path:"/ManageStudents",
      name:"ManageStudents",
      icon:<FaUserAlt/>
    },
    {
      path:"/Logout",
      name:"Logout",
      icon:<FaThList/>
    }

  ]
  return (
    <div className="container">
      <div className="sidebar">
        {
          menuItem.map((item, index)=>(
            <NavLink to={item.path} key={index} className='link' activeClassName='active'>
              <div className="icon">{item.icon}</div>
              <div className="link_test">{item.name}</div>
            </NavLink>
          ))
        }
      </div>
      <div className="table-area">{children}</div>
    </div>
  )
}

export default SideBar