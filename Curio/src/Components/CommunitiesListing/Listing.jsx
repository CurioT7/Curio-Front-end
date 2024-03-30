
import { IoIosArrowDown } from "react-icons/io";
import "./CommunityPage.css";

import { Link } from 'react-router-dom'
function Listing(props) {
  function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  // Close the dropdown if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }
  return (
    <div className="dropdown">
      <button onClick={myFunction} className="dropbtn"> Hot <IoIosArrowDown className="arrow-icon"/></button>
      <div id="myDropdown" className="dropdown-content">
        <p>Sort By</p>
        <Link to={'/r/:Community/hot'} className="link-sort">Hot</Link>
        <Link to={'/r/:Community/new'} className="link-sort">New</Link>
        <Link to={'/r/:Community/top'} className="link-sort">Top</Link>
        <Link to={'/r/:Community/rising'} className="link-sort">Rising</Link>
      </div>
    </div>
  );
}

export default Listing;