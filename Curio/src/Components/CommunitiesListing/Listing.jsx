
import { IoIosArrowDown } from "react-icons/io";
import "./CommunityPage.css";
import React from 'react'
import { Link, useParams } from 'react-router-dom'

function Listing(props) {
 
  
  function List() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
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

  const { Community } = useParams();
  const [listValue, setListValue] = React.useState('Hot');
  const [community, setCommunity] = React.useState("Community");
  React.useEffect(() => {
    setCommunity(Community);
  }, [Community]);
  console.log(community);
  function changeListValue(value) {
    setListValue(value);
  }
  return (
    <div className="dropdown">
      <button onClick={List} className="dropbtn"> {listValue} <IoIosArrowDown className="arrow-icon"/></button>
      <div id="myDropdown" className="dropdown-content">
        <p>Sort By</p>
        <Link to={`/r/${community}/hot`} onClick={() => changeListValue("Hot")} className="link-sort">Hot</Link>
        <Link to={`/r/${community}/new`} onClick={() => changeListValue("New")} className="link-sort">New</Link>
        <Link to={`/r/${community}/top`} onClick={() => changeListValue("Top")} className="link-sort">Top</Link>
        <Link to={`/r/${community}/rising`} onClick={() => changeListValue("Rising")} className="link-sort">Rising</Link>
      </div>
    </div>
  );
}

export default Listing;