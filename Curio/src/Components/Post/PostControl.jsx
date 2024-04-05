import React from "react";
import { useState } from "react";
import Ellipsis from "../../styles/icons/Elippsis";
import SaveButton from "../../styles/icons/SaveButton";
import ReportPost from "../../styles/icons/ReportPost";
import Hide from "../../styles/icons/Hide";


function PostControl(props) {

  const [showControls, setShowControls] = useState(false);
  const handleEllipsisClick = () => {
    setShowControls(!showControls);
  };
  return (
    <div>
      <button className="post-dropdown-control d-flex justify-content-center align-items-center" onClick={handleEllipsisClick}>
        <Ellipsis className="ellipsis-img" />
      </button>
      {showControls && <div className="post-dropdown" style={{ 
                                        display: showControls ? 'flex' : 'none',
                                        flexDirection: 'column',
                                        alignItems: 'flex-start',
                                        position: 'absolute',
                                        top: '0',
                                        right: '0',
                                        backgroundColor: '#FFFFFF',
                                        borderRadius: '10px',
                                        boxShadow: '2px 6px 10px rgba(0, 0, 0, 0.4)',
                                        marginTop: '2.5rem',
                                        marginRight: '1rem',
                                        padding: '0px',
                                        width: '0.5rem!important',
                                        height: '0.5rem!important',
                                        zIndex: '1'
                                    }}>
                                        <ul className='drop-down-list w-100 px-0'>
                                            <li className="drop-down-item ps-3 dropdown-list-post-control d-flex align-items-center">
                                                    <SaveButton />
                                                    <div className="d-flex align-items-center justify-content-center"><p className='mt-3 text-text d-flex'>Save</p></div>
                                            </li>
                                            <li className="drop-down-item ps-3 dropdown-list-post-control d-flex align-items-center">
                                                    <Hide />
                                                    <div><p className='mt-3 text-text'>Hide</p></div>
                                            </li>
                                            <li className="drop-down-item ps-3 dropdown-list-post-control d-flex align-items-center">
                                                    <ReportPost />
                                                    <div><p className='mt-3 text-text'>Report</p></div>
                                            </li>
                                        </ul>   
                                    </div>
            }
    </div>
  );
}

export default PostControl;