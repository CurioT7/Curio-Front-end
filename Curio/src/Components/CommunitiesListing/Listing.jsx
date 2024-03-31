
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

  function TopBy() {
    document.getElementById("SortTop").classList.toggle("show");
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
  const [sortTop, setSortTop] = React.useState("Today");

  React.useEffect(() => {
    setListValue('Hot');
  }, [Community]);
  console.log(listValue);
  React.useEffect(() => {
    setCommunity(Community);
  }, [Community]);
  
  function changeListValue(value) {
    setListValue(value);
    props.onChangeSort(value);
  }
  function changeSortTop(value) {
    setSortTop(value);
   
  }
  return (
    <div className="dropdown">
      <div>
        <button onClick={List} className="dropbtn"> {listValue} <IoIosArrowDown className="arrow-icon"/></button>
        <div id="myDropdown" className="dropdown-content">
          <p className="Sort-title">Sort By</p>
          <Link to={`/r/${community}/hot`} onClick={() => changeListValue("Hot")} className="link-sort">Hot</Link>
          <Link to={`/r/${community}/new`} onClick={() => changeListValue("New")} className="link-sort">New</Link>
          <Link to={`/r/${community}/top`} onClick={() => changeListValue("Top")} className="link-sort">Top</Link>
          <Link to={`/r/${community}/rising`} onClick={() => changeListValue("Random")} className="link-sort">Random</Link>
        </div>
      </div>
      {/* <div>
        <button onClick={TopBy} className="dropbtn"> {sortTop} <IoIosArrowDown className="arrow-icon"/></button>
        <div id="SortTop" className="dropdown-content">
          <p className="Sort-title">Sort By</p>
          <Link to={`/r/${community}/top`}  className="link-sort">Today</Link>
          <Link to={`/r/${community}/top`}  className="link-sort">Week</Link>
          <Link to={`/r/${community}/top`}  className="link-sort">Month</Link>
          <Link to={`/r/${community}/top`}  className="link-sort">Year</Link>
        </div>
      </div> */}
    </div>
  );
}

export default Listing;