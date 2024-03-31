import React from "react";
import { useState, useEffect } from "react";
import { background } from "@chakra-ui/react";

function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const backToTop = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

const scrollToTop = () => {
    window.scrollTo({
        top: 25,
        behavior: "smooth"
    });
};

  useEffect(() => {
    window.addEventListener("scroll", backToTop);
  }, []);

  return (
    <div className="back-to-top">
      {isVisible && (
       <button 
       onClick={scrollToTop} 
         style={{background: "#EAEDEF",
        position: "fixed",
        bottom: "50px",
        left: "70%",
        color: "black",
        fontSize: "2rem", 
        marginBottom: "0.5rem", 
        marginTop: "0.5rem", 
        borderRadius: "20%",
        width: "2rem",
        }
        }>
        ^
        </button>
      )}
    </div>
  );
}

export default BackToTopButton;