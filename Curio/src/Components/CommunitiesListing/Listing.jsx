
import { IoIosArrowDown } from "react-icons/io";
import "./CommunityPage.css";
import React from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

/**
 * Renders a dropdown component for sorting and filtering listings.
 *
 * @param {Object} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
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
      setListValue('Best');
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
      setSortTop('Today');
    }, [Community]);
    React.useEffect(() => {
      setCommunity(Community);
    }, [Community]);
    React.useEffect(() => {
      setSortTop('Today');
    },[listValue])
  }
 
  function changeListValue(value) {
    setListValue(value);
    handleListValueChange(value);
    if(props.isCommunity){
    props.onChangeSort(value,"0");}
    else if(props.isHome){
      props.onChangeSort(value,"day");
    }
  }
  function changeSortTop(value) {
    setSortTop(value);
    if(value==="Today"){
      if(props.isCommunity){
      props.onChangeSort("Top","0");
      }else{
        props.onChangeSort("Top","day");
      }
    }
    else if(value==="This Week"){
      if(props.isCommunity){
        props.onChangeSort("Top","7");
      }else{
        props.onChangeSort("Top","week");
      }
      
    }
    else if(value==="This Month"){
      if(props.isCommunity){
        props.onChangeSort("Top","30");
      }else{
        props.onChangeSort("Top","month");
      }
      
    }
    else if(value==="This Year"){
      if(props.isCommunity){
        props.onChangeSort("Top","365");
      }else{
        props.onChangeSort("Top","year");
      }
      
    }
    else if(value==="Now"){
      if(props.isCommunity){
        props.onChangeSort("Top","now");
      }
      else{
        props.onChangeSort("Top","hour");
      }
     
    }
    else{
      if(props.isCommunity){
        props.onChangeSort("Top",value);
      }else{
        props.onChangeSort("Top","all");
      }
    }
    
   
  }
  return (
    <div className="dropdown">
      <div>
        <button data-testid="list-button" onClick={List} className="dropbtn"> {listValue} <IoIosArrowDown className="arrow-icon"/></button>
        <div data-testid="dropdown-content" id="myDropdown" className="dropdown-content">
          <p className="Sort-title">Sort By</p>
         
          {props.isCommunity &&<>{commSortArr.map((Sort)=>(
            <Link to={`/r/${community}/${Sort}`} onClick={() => changeListValue(Sort) } data-testid={`link-sort-${Sort}`} className="link-sort">{Sort}</Link>
          ))}</> }

           {true &&<>{homeSortArr.map((Sort)=>(
            <Link to={`/${Sort}`} onClick={() => changeListValue(Sort)} data-testid={`link-sort-${Sort}`} className="link-sort">{Sort}</Link>
          ))}</> }
        </div>
      </div>
      <div>
        {listValue === "Top" && <div> 
        <button data-testid="time-interval-button" onClick={TopBy} className="dropbtn"> {sortTop} <IoIosArrowDown className="arrow-icon"/></button>
        <div id="SortTop" className="dropdown-content ">
          <p className="Sort-title">Sort By</p>
          {props.isCommunity &&<>{topSortArr.map((Sort)=>(
            <Link to={`/r/${community}/Top`} onClick={() => changeSortTop(Sort)} data-testid={`link-time-interval-${Sort}`} className="link-sort">{Sort}</Link>
          ))} </>  }
          {props.isHome &&<>{topSortArr.map((Sort)=>(
            <Link to={`/Top`} onClick={() => changeSortTop(Sort)} data-testid={`link-time-interval-${Sort}`} className="link-sort">{Sort}</Link>
          ))} </>  }
          
          
        </div>
        </div>}
      </div>
    </div>
  );
}

export default Listing;