import React, { useState } from "react";
import { Link } from 'react-scroll';
import { FaArrowCircleUp } from 'react-icons/fa';

//// Function for button on homepage to go back to top of the page ////////////
export const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

      const toggleVisible = () => {

        const scroll = document.documentElement.scrollTop;
        if(scroll > 300){
          setVisible(true);
        } else if(scroll <= 300){
          setVisible(false);
        }
      };

      const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      };

      window.addEventListener('scroll', toggleVisible);

  return (
 
    <Link className={`scroll-top-btn cursor-pointer`} spy={true} to='NavBar' smooth={true} >
        <FaArrowCircleUp className="arrow-up" size={'4rem'} onClick={scrollToTop} style={{display: visible ? 'flex' : 'none', position: 'fixed', bottom: 60, right:10}} />
        </Link>
 
  );
};