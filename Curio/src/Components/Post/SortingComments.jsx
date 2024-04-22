import React from 'react';
import"./SortingComments.css";
import { IoIosArrowDown } from "react-icons/io";
import { BsRocket } from "react-icons/bs";
import { TbArrowBigUpLines } from "react-icons/tb";
import { LuBadge } from "react-icons/lu";
function SortingComments(props){
    function Sort() {
        document.getElementById("sortComments").classList.toggle("show");
       
      }
      window.onclick = function(event) {
        if (!event.target.matches('.sortbtn')) {
          var dropdowns = document.getElementsByClassName("sort-content");
          var i;
          for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
              openDropdown.classList.remove('show');
            }
          }
        }
      }

    const [sortValue, setSortValue] = React.useState('New');
    function ChangeSortValue(value){
        props.onChangeSort(value)
        let capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
        setSortValue(capitalizedValue);
    }

    return(
        <div className='sorting-comments'>  
        <span className='sort-by'>Sort By:</span>
            <div>
                <button onClick={Sort} className="sortbtn"> {sortValue} <IoIosArrowDown className="arrow-icon"/></button>
                <div id='sortComments' className='sort-content'>
                    <h6 className='sort-title'>Sort By</h6>
                    <p className='sort-item' onClick={()=>ChangeSortValue('best')}><div><BsRocket className='item-icon'/> <span>Best</span></div></p>
                    <p className='sort-item' onClick={()=>ChangeSortValue('top')}><div><TbArrowBigUpLines className='item-icon'/> <span>Top</span></div></p>
                    <p className='sort-item' onClick={()=>ChangeSortValue('new')}><div><LuBadge className='item-icon'/><span>New</span></div></p>
                </div>
            </div>
        </div>
    )

}

export default SortingComments;