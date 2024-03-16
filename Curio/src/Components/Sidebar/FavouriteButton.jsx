import React from 'react'
import { useState } from 'react'


function FavouriteButton() {
  const [favourite, setFavourite] = useState(false);

  const handleButtonClick = () => {
    setFavourite(!favourite);
  }
  return (
    <div>
      <button className='favourite-button d-flex align-items-center justify-content-center' onClick={handleButtonClick}>
        {favourite ? (
            <svg rpl="" fill="currentColor" height="20" icon-name="star-fill" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.943 7.659a1.142 1.142 0 0 0-.871-.771l-5.4-1.046L11 1.024a1.191 1.191 0 0 0-2 0L6.333 5.842.928 6.888a1.145 1.145 0 0 0-.619 1.9l3.757 4.024-.674 5.468a1.144 1.144 0 0 0 1.62 1.178L10 17.127l4.988 2.331a1.145 1.145 0 0 0 1.62-1.177l-.674-5.464 3.757-4.024a1.14 1.14 0 0 0 .252-1.134Z">
              </path>
            </svg>
        ) : (
            <svg rpl="" fill="currentColor" height="20" icon-name="star-outline" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.473 19.566c-.168 0-.333-.036-.485-.107L10 17.127l-4.988 2.332a1.145 1.145 0 0 1-1.62-1.179l.674-5.463L.309 8.793a1.145 1.145 0 0 1 .619-1.9l5.405-1.051L9 1.024a1.192 1.192 0 0 1 2 0l2.665 4.818 5.4 1.046a1.145 1.145 0 0 1 .619 1.9l-3.757 4.024.674 5.464a1.143 1.143 0 0 1-1.135 1.285l.007.005ZM10 15.748l5.345 2.5-.724-5.855 4.026-4.313-5.791-1.122L10 1.8 7.144 6.958 1.353 8.08l4.026 4.311-.724 5.855L10 15.748Z">
              </path>
            </svg>
        )}
      </button>
    </div>
  )
}

export default FavouriteButton