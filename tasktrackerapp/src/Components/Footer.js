import React from 'react'
import {Link} from 'react-router-dom'

const Footer = ({text,texttolink,href})  =>{
    return (
        <>
          <label>{text} </label>  
          <Link to={href}>
              <label>{texttolink}</label>
          </Link>
        </>
    )
}

export default Footer;
