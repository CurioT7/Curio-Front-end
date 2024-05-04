import React from "react";

import cat_blep from "../../assets/cat_blep.png";

function CleanQueue() {
  return (
    <div className="mx-auto">
      <img src={cat_blep} className="mx-auto" alt="cat blep" style={{width: "190px"}}/>
      <h1 className="text-center" style={{fontSize: '24px', fontWeight: '700'}}>Queue is clean.</h1>
      <p className="text-center" style={{fontSize: '18px', color: 'rgb(87, 111, 118)'}}>Kitteh is pleased.</p>
    </div>
  );
}

export default CleanQueue;