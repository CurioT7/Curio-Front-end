import React from "react";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import BackButton from '../../styles/icons/BackButton.jsx';

function Preferences(props){

   const [buttonsClicked, setButtonsClicked] = useState([]);

   const handleBackButton = () => {
        props.onBackToGender();
   }

   const handleButtonClick = (e) => {
        const name = e.target.innerText;
        if (buttonsClicked.includes(name)){
            setButtonsClicked(buttonsClicked.filter((button) => button !== name));
        }
        else{
            setButtonsClicked([...buttonsClicked, name]);
        }
   }

    const handlePreferences = () => {
        props.onHide();
    }




  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      contentClassName='signup-modal'
      scrollable={true}
    >
      <Modal.Header className='border-0 mb-0 pb-0 border-bottom w-100'>
        <Modal.Title id="contained-modal-title-vcenter" className='p-3'>
          <button onClick={handleBackButton} className='signup-back-button me-auto d-flex justify-content-center align-items-center'><BackButton /></button>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='pt-0 d-flex flex-column pt-3'>
        <div className="pt-0 mb-3" style={{paddingLeft: '80px', paddingRight: '80px'}}>
          <h1 className='signup-header'>Interests</h1>
          <p className='username-alert'>
            Pick things you'd like to see in your home feed.
          </p>
        </div>

        <div className="d-flex flex-column justify-content-center mb-3" style={{paddingLeft: '80px', paddingRight: '80px'}}>
            <h2 className="interests"> 📈 Trending</h2>
        </div>
        <div className="mb-3" style={{paddingLeft: '80px', paddingRight: '80px'}}>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('NFL') ? 'clicked' : ''}`}>NFL</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('NBA') ? 'clicked' : ''}`}>NBA</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Taylor Swift') ? 'clicked' : ''}`}>Taylor Swift</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Fantasy Football') ? 'clicked' : ''}`}>Fantasy Football</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('UFOs') ? 'clicked' : ''}`}>UFOs</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('ChatGPT') ? 'clicked' : ''}`}>ChatGPT</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('College Football') ? 'clicked' : ''}`}>College Football</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('NHL') ? 'clicked' : ''}`}>NHL</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('MLB') ? 'clicked' : ''}`}>MLB</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('One Piece') ? 'clicked' : ''}`}>One Piece</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Character.AI') ? 'clicked' : ''}`}>Character.AI</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Gaming releases') ? 'clicked' : ''}`}>Gaming releases</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Midjourney') ? 'clicked' : ''}`}>Midjourney</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Formula 1') ? 'clicked' : ''}`}>Formula 1</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Celebrity gossip') ? 'clicked' : ''}`}>Celebrity gossip</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('World news') ? 'clicked' : ''}`}>World news</button>
        </div>

        <div className="d-flex flex-column justify-content-center mb-3" style={{paddingLeft: '80px', paddingRight: '80px'}}>
            <h2 className="interests"> 🤣 Humor & Memes</h2>
        </div>
        <div className="mb-3" style={{paddingLeft: '80px', paddingRight: '80px'}}>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Am I the A**hole?') ? 'clicked' : ''}`}>Am I the A**hole?</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Contagious laughter') ? 'clicked' : ''}`}>Contagious laughter</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Funny videos') ? 'clicked' : ''}`}>Funny videos</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Memes') ? 'clicked' : ''}`}>Memes</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Shower thoughts') ? 'clicked' : ''}`}>Shower thoughts</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Funny animals') ? 'clicked' : ''}`}>Funny animals</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Jokes') ? 'clicked' : ''}`}>Jokes</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('History memes') ? 'clicked' : ''}`}>History memes</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Wholesome memes') ? 'clicked' : ''}`}>Wholesome memes</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Funny & offbeat news') ? 'clicked' : ''}`}>Funny & offbeat news</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Stand-up comedy') ? 'clicked' : ''}`}>Stand-up comedy</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Roast me') ? 'clicked' : ''}`}>Roast me</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Unexpected') ? 'clicked' : ''}`}>Unexpected</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Technically the truth') ? 'clicked' : ''}`}>Technically the truth</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Fails') ? 'clicked' : ''}`}>Fails</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Weird') ? 'clicked' : ''}`}>Weird</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Oddly specific') ? 'clicked' : ''}`}>Oddly specific</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Photoshop battles') ? 'clicked' : ''}`}>Photoshop battles</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Midly infuriating') ? 'clicked' : ''}`}>Midly infuriating</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Expectation vs reality') ? 'clicked' : ''}`}>Expectation vs reality</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Crappy design') ? 'clicked' : ''}`}>Crappy design</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Star Wars memes') ? 'clicked' : ''}`}>Star Wars memes</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Lord of the Rings memes') ? 'clicked' : ''}`}>Lord of the Rings memes</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Marvel memes') ? 'clicked' : ''}`}>Marvel memes</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Starterpacks') ? 'clicked' : ''}`}>Starterpacks</button>
        </div>

        <div className="d-flex flex-column justify-content-center mb-3" style={{paddingLeft: '80px', paddingRight: '80px'}}>
            <h2 className="interests"> 🕹 Gaming</h2>
        </div>
        <div className="mb-3" style={{paddingLeft: '80px', paddingRight: '80px'}}>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Am I the A**hole?') ? 'clicked' : ''}`}>Am I the A**hole?</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Contagious laughter') ? 'clicked' : ''}`}>Contagious laughter</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Funny videos') ? 'clicked' : ''}`}>Funny videos</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Memes') ? 'clicked' : ''}`}>Memes</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Shower thoughts') ? 'clicked' : ''}`}>Shower thoughts</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Funny animals') ? 'clicked' : ''}`}>Funny animals</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Jokes') ? 'clicked' : ''}`}>Jokes</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('History memes') ? 'clicked' : ''}`}>History memes</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Wholesome memes') ? 'clicked' : ''}`}>Wholesome memes</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Funny & offbeat news') ? 'clicked' : ''}`}>Funny & offbeat news</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Stand-up comedy') ? 'clicked' : ''}`}>Stand-up comedy</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Roast me') ? 'clicked' : ''}`}>Roast me</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Unexpected') ? 'clicked' : ''}`}>Unexpected</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Technically the truth') ? 'clicked' : ''}`}>Technically the truth</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Fails') ? 'clicked' : ''}`}>Fails</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Weird') ? 'clicked' : ''}`}>Weird</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Oddly specific') ? 'clicked' : ''}`}>Oddly specific</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Photoshop battles') ? 'clicked' : ''}`}>Photoshop battles</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Midly infuriating') ? 'clicked' : ''}`}>Midly infuriating</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Expectation vs reality') ? 'clicked' : ''}`}>Expectation vs reality</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Crappy design') ? 'clicked' : ''}`}>Crappy design</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Star Wars memes') ? 'clicked' : ''}`}>Star Wars memes</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Lord of the Rings memes') ? 'clicked' : ''}`}>Lord of the Rings memes</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Marvel memes') ? 'clicked' : ''}`}>Marvel memes</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Starterpacks') ? 'clicked' : ''}`}>Starterpacks</button>

            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Call of Duty') ? 'clicked' : ''}`}>Call of Duty</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Fortnite') ? 'clicked' : ''}`}>Fortnite</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Baldur\'s Gate') ? 'clicked' : ''}`}>Baldur's Gate</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('PC gaming') ? 'clicked' : ''}`}>PC gaming</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Overwatch') ? 'clicked' : ''}`}>Overwatch</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('MrBeast') ? 'clicked' : ''}`}>MrBeast</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Minecraft memes') ? 'clicked' : ''}`}>Minecraft memes</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Elden Ring') ? 'clicked' : ''}`}>Elden Ring</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Xbox') ? 'clicked' : ''}`}>Xbox</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Playstation 5') ? 'clicked' : ''}`}>Playstation 5</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Nintendo Switch') ? 'clicked' : ''}`}>Nintendo Switch</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Pokemon Go') ? 'clicked' : ''}`}>Pokemon Go</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Pokemon Scarlet & Violet') ? 'clicked' : ''}`}>Pokemon Scarlet & Violet</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Apex Legends') ? 'clicked' : ''}`}>Apex Legends</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('The Witcher') ? 'clicked' : ''}`}>The Witcher</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Genshin Impact') ? 'clicked' : ''}`}>Genshin Impact</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Stardew Valley') ? 'clicked' : ''}`}>Stardew Valley</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('League of Legends') ? 'clicked' : ''}`}>League of Legends</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Raid: Shadow Legends') ? 'clicked' : ''}`}>Raid: Shadow Legends</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Destiny') ? 'clicked' : ''}`}>Destiny</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('GTA') ? 'clicked' : ''}`}>GTA</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Twitch') ? 'clicked' : ''}`}>Twitch</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Live stream fails') ? 'clicked' : ''}`}>Live stream fails</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Roblox') ? 'clicked' : ''}`}>Roblox</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Red Dead Redemption') ? 'clicked' : ''}`}>Red Dead Redemption</button>
        </div>

        <div className="d-flex flex-column justify-content-center mb-3" style={{paddingLeft: '80px', paddingRight: '80px'}}>
            <h2 className="interests"> 🏈 NFL</h2>
        </div>
        <div className="mb-3" style={{paddingLeft: '80px', paddingRight: '80px'}}>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('NFL') ? 'clicked' : ''}`}>NFL</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('NFL memes') ? 'clicked' : ''}`}>NFL memes</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Fantasy Football') ? 'clicked' : ''}`}>Fantasy Football</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('NFL Draft') ? 'clicked' : ''}`}>NFL Draft</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('College football') ? 'clicked' : ''}`}>College football</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Arizona Cardinals') ? 'clicked' : ''}`}>Arizona Cardinals</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Cincinnati Bengals') ? 'clicked' : ''}`}>Cincinnati Bengals</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Buffalo Bills') ? 'clicked' : ''}`}>Buffalo Bills</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Denver Broncos') ? 'clicked' : ''}`}>Denver Broncos</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Cleveland Browns') ? 'clicked' : ''}`}>Cleveland Browns</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Tampa Bay Buccaneers') ? 'clicked' : ''}`}>Tampa Bay Buccaneers</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Arizona Cardinals memes') ? 'clicked' : ''}`}>Arizona Cardinals memes</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Cincinnati Bengals memes') ? 'clicked' : ''}`}>Cincinnati Bengals memes</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Buffalo Bills memes') ? 'clicked' : ''}`}>Buffalo Bills memes</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Denver Broncos memes') ? 'clicked' : ''}`}>Denver Broncos memes</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Cleveland Browns memes') ? 'clicked' : ''}`}>Cleveland Browns memes</button>
            <button onClick={handleButtonClick} className={`preferences-button p-2 px-3 m-1 ${buttonsClicked.includes('Tampa Bay Buccaneers memes') ? 'clicked' : ''}`}>Tampa Bay Buccaneers memes</button>
        </div>

      </Modal.Body>
    <Modal.Footer className='border-0 pb-4 d-flex justify-content-center border-top' style={{paddingLeft: '80px', paddingRight: '80px'}}>
        <Button onClick={handlePreferences} disabled={buttonsClicked.length===0} className={buttonsClicked.length===0 ? "w-100 continue-button-disabled preferences-disabled" : "w-100 continue-button"}>{buttonsClicked.length===0 ? "Select at least 1 to continue" : "Continue"}</Button>
    </Modal.Footer>
    </Modal>
  );
}
export default Preferences;