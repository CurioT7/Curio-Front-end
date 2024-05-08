import React from 'react';
import "./PostingRules.css"
import logo from "../../../../assets/Curio_logo.png";


function Posting_rules() {
  return (
    <div>
      <div className='curioPostingHeader'>
        <div className='headerContent'>
            <img src={logo} alt="Logo Curio" className='logoImg'/>Posting to Curio
        </div>
        <ol className='rulesList'>
            <li className='ruleItem'>Remember the human</li>
            <li className='ruleItem'>Behave like you would in real life</li>
            <li className='ruleItem'>Look for the original source of content</li>
            <li className='ruleItem'>Search for duplicates before posting</li>
            <li className='ruleItem'>Read the community’s rules</li>
        </ol>
      </div>
      <div className='blank-div-rule'></div>
      <div className='redditNotice'>
      Please be mindful of reddit's <a href="https://www.reddit.com/help/contentpolicy" className='contentPolicyLink'>content policy
      </a> and practice good <a href="https://www.reddit.com/wiki/reddiquette" className='reddiquetteLink'>reddiquette</a>.
      </div>
    </div>
  );
}

export default Posting_rules;
