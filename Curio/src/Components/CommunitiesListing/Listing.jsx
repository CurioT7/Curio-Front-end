
import { IoIosArrowDown } from "react-icons/io";
import "./CommunityPage.css";
import React from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

function Listing(props) {
 
  
  function List() {
    document.getElementById("myDropdown").classList.toggle("show");
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

 
  const commSortArr = ["Hot", "New", "Top", "Random"];
  const topSortArr = ["Now", "Today", "This Week", "This Month", "This Year", "All Time"];
  const homeSortArr = ["Best", "Hot", "New", "Top","Random"];
  const profileSortArr = ["Hot", "New", "Top"];
  const { Community } = useParams();
  const [listValue, setListValue] = React.useState('Hot');
  const [community, setCommunity] = React.useState("Community");
  const [sortTop, setSortTop] = React.useState("Today");

  React.useEffect(() => {
    const savedListValue = localStorage.getItem('listValue');
    
    if (props.isHome) {
      setListValue(savedListValue);
      if (savedListValue === null) {
        localStorage.setItem('listValue', 'Best');
       
      }
    } 
     else if (props.isProfile) {
      setListValue(savedListValue);
    }
  }, []);
  
  const handleListValueChange = (value) => {
    if (props.isHome) {
      localStorage.setItem('listValue', value);
      // navigate.push(`/${value}`);
    }
  };
  
  if (props.isCommunity) {
    React.useEffect(() => {
      
      setListValue('Hot');
      
    }, [Community]);
    React.useEffect(() => {
      setCommunity(Community);
    }, [Community]);
  }
 
  function changeListValue(value) {
    setListValue(value);
    handleListValueChange(value);
    props.onChangeSort(value,sortTop);
  }
  function changeSortTop(value) {
    setSortTop(value);
    if(value==="Today"){
      props.onChangeSort("Top","0");
    }
    else if(value==="This Week"){
      props.onChangeSort("Top","7");
    }
    else if(value==="This Month"){
      props.onChangeSort("Top","30");
    }
    else if(value==="This Year"){
      props.onChangeSort("Top","365");
    }
    else if(value==="Now"){
      props.onChangeSort("Top","now");
    }
    else{
      props.onChangeSort("Top",value);
    }
    
   
  }
  return (
    <div className="dropdown">
      <div>
        <button onClick={List} className="dropbtn"> {listValue} <IoIosArrowDown className="arrow-icon"/></button>
        <div id="myDropdown" className="dropdown-content">
          <p className="Sort-title">Sort By</p>
         
          {props.isCommunity &&<>{commSortArr.map((Sort)=>(
            <Link to={`/r/${community}/${Sort}`} onClick={() => changeListValue(Sort)} className="link-sort">{Sort}</Link>
          ))}</> }

           {props.isHome &&<>{homeSortArr.map((Sort)=>(
            <Link to={`/${Sort}`} onClick={() => changeListValue(Sort)} className="link-sort">{Sort}</Link>
          ))}</> }
        </div>
      </div>
      <div>
        {listValue === "Top" && <div> 
        <button onClick={TopBy} className="dropbtn"> {sortTop} <IoIosArrowDown className="arrow-icon"/></button>
        <div id="SortTop" className="dropdown-content ">
          <p className="Sort-title">Sort By</p>
          {props.isCommunity &&<>{topSortArr.map((Sort)=>(
            <Link to={`/r/${community}/Top`} onClick={() => changeSortTop(Sort)} className="link-sort">{Sort}</Link>
          ))} </>  }
          
          
        </div>
        </div>}
      </div>
    </div>
  );
}

export default Listing;