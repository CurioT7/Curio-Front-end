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
        top: 20,
        behavior: "smooth"
    });
};

  useEffect(() => {
    window.addEventListener("scroll", backToTop);
  }, []);

  return (
    <div className="back-to-top" >
      {isVisible && (
       <button 
       onClick={scrollToTop} 
         style={{background: "#0079d3",
        position: "fixed",
        bottom: "50px",
        left: "70%",
        color: "white",
        fontSize: "0.75rem", 
        borderRadius: "20%",
        width: "5%",
        fontWeight: "bold",
        }
        }>
        Back to Top
        </button>
      )}
    </div>
  );
}

export default BackToTopButton;