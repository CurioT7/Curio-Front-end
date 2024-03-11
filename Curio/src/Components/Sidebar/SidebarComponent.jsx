import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import Home from '../../styles/icons/Home.jsx';
import Popular from '../../styles/icons/Popular.jsx';
import All from '../../styles/icons/All.jsx';
import Add from '../../styles/icons/Add.jsx';
import AboutReddit from '../../styles/icons/AboutReddit.jsx';
import Advertise from '../../styles/icons/Advertise.jsx';
import Help from '../../styles/icons/Help.jsx';
import Blog from '../../styles/icons/Blog.jsx';
import Careers from '../../styles/icons/Careers.jsx';
import Press from '../../styles/icons/Press.jsx';
import Communities from '../../styles/icons/Communities.jsx';
import BestOfReddit from '../../styles/icons/BestOfReddit.jsx';
import Topics from '../../styles/icons/Topics.jsx';
import ContentPolicy from '../../styles/icons/ContentPolicy.jsx';
import PrivacyPolicy from '../../styles/icons/PrivacyPolicy.jsx';
import UserAgreement from '../../styles/icons/UserAgreement.jsx';
import DownArrow from '../../styles/icons/DownArrow.jsx';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import  FavouriteButton  from './FavouriteButton.jsx';
import CommunityImageSideBar from './CommunityImageSideBar.jsx';
import CreateCommunity from './CreateCommunity.jsx';
import SignupInfo from '../Signup/SignupInfo.jsx';
import UsernameInfo from '../Signup/UsernameInfo.jsx';
import SignupWrapper from '../Signup/SignupWrapper.jsx';
import Gender from '../Signup/Gender.jsx';
import Preferences from '../Signup/Preferences.jsx';


function SidebarComponent() {
  const [isCreateCommunityModalOpen, setCreateCommunityModalOpen] = useState(false);
  const [isSignupInfoModalOpen, setSignupInfoModalOpen] = useState(false);
  const [isUsernameInfoModalOpen, setUsernameInfoModalOpen] = useState(false);
  const [isGenderModal, setGenderModalOpen] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState('');
  const [username, setEnteredUsername] = useState('');
  const [password, setEnteredPassword] = useState('');
  const [isPreferencesModalOpen, setPreferencesModalOpen] = useState(false);


  const handleCreateCommunityClick = () => {
    setCreateCommunityModalOpen(true);
  };

  const handleSignupInfoClick = () => {
    setSignupInfoModalOpen(true);
  }

  const handleOpenUsernameInfo = () => {
    setSignupInfoModalOpen(false); 
    setUsernameInfoModalOpen(true); 
  }

  const handleBackToSignupInfo = () => {
    setSignupInfoModalOpen(true);
    setUsernameInfoModalOpen(false);
  }

  const handleEnteredEmail = (email) => {
    setEnteredEmail(email);
  }

  const handleContinueToGender = () => {
    setUsernameInfoModalOpen(false);
    setGenderModalOpen(true);
  }

  const handleEnteredUsername = (username) => {
    setEnteredUsername(username);
  }

  const handleEnteredPassword = (password) => {
    setEnteredPassword(password);
  }

  const handleBackToGender = () => {
    setGenderModalOpen(true);
    setPreferencesModalOpen(false);
  }

  const handleContinueToPreferences = () => {
    setGenderModalOpen(false);
    setPreferencesModalOpen(true);
  }


  return (
    <div>
      <Sidebar backgroundColor='#FFFFFF' rootStyles={{
        marginTop: '60px',
        color: '#000000',
        marginLeft: '90px',
        borderRadius: '0px',
        width: '300px',
        border: 'none',
        fontSize: '18px',
        height: '100vh',
        overflowY: 'auto',
        borderRight: '1px solid #BFBFBF',
        ":hover": {
          overflowY: 'auto',
          width: '300px',
        }
      }}>
      <Menu renderExpandIcon={({ open }) => <span>{open ? <KeyboardArrowUpIcon /> : <DownArrow />}</span>}
      menuItemStyles={{
        button: {
          [`&.active`]: {
            backgroundColor: '#EAEDEF',
          },
          [`&:hover`]: {
            backgroundColor: '#F2F4F5',
          },
          borderRadius: '10px',
          padding: '20px',
        },
      }}>
        <MenuItem icon={<Home />}> Home </MenuItem>
        <MenuItem icon={<Popular />}> Popular </MenuItem>
        <MenuItem icon={<All />}> All </MenuItem>
        <hr className='mt-3'></hr>
        <SubMenu label="YOUR COMMUNITIES" rootStyles={{
            color: '#576F76',
            backgroundColor: '#FFFFFF',
            fontSize: '16px',
          }} menuItemStyles={{
          button: {
            [`&.active`]: {
              backgroundColor: '#EAEDEF',
            },
            [`&:hover`]: {
              backgroundColor: '#F2F4F5',
            },
            borderRadius: '10px',
            paddingLeft: '10px',
          },
        }}>
          <MenuItem onClick={handleCreateCommunityClick} rootStyles={{backgroundColor: '#FFFFFF', color: '#000000', fontSize: '18px'}} icon={<Add />}>Create a community</MenuItem>
          <MenuItem onClick={handleSignupInfoClick} rootStyles={{backgroundColor: '#FFFFFF', color: '#000000', fontSize: '18px'}}>SignUp</MenuItem>
          <MenuItem prefix={<CommunityImageSideBar imageUrl={"https://styles.redditmedia.com/t5_2r0ij/styles/communityIcon_yor9myhxz5x11.png"} />} suffix={<FavouriteButton />} rootStyles={{backgroundColor: '#FFFFFF', color: '#000000', fontSize: '18px'}}>r/announcements</MenuItem>
          <MenuItem prefix={<CommunityImageSideBar imageUrl={"https://styles.redditmedia.com/t5_2s887/styles/communityIcon_px0xl1vnj0ka1.png"} />} suffix={<FavouriteButton />} rootStyles={{backgroundColor: '#FFFFFF', color: '#000000', fontSize: '18px'}}>r/PS5</MenuItem>
        </SubMenu>
        <hr className='mt-3'></hr>
        <SubMenu label="RESOURCES" rootStyles={{
          fontSize: '16px',
          color: '#576F76',
          backgroundColor: '#FFFFFF',
        }} menuItemStyles={{
        button: {
          [`&.active`]: {
            backgroundColor: '#EAEDEF',
          },
          [`&:hover`]: {
            backgroundColor: '#F2F4F5',
          },
          borderRadius: '10px',
        },
      }}>
          <MenuItem icon={<AboutReddit />} rootStyles={{backgroundColor: '#FFFFFF', color: '#000000', fontSize: '18px'}}>About Reddit</MenuItem>
          <MenuItem icon={<Advertise />} rootStyles={{backgroundColor: '#FFFFFF', color: '#000000', fontSize: '18px'}}>Advertise</MenuItem>
          <MenuItem icon={<Help />} rootStyles={{backgroundColor: '#FFFFFF', color: '#000000', fontSize: '18px'}}>Help</MenuItem>
          <MenuItem icon={<Blog />} rootStyles={{backgroundColor: '#FFFFFF', color: '#000000', fontSize: '18px'}}>Blog</MenuItem>
          <MenuItem icon={<Careers />}rootStyles={{backgroundColor: '#FFFFFF', color: '#000000', fontSize: '18px'}}>Careers</MenuItem>
          <MenuItem icon={<Press />} rootStyles={{backgroundColor: '#FFFFFF', color: '#000000', fontSize: '18px'}}>Press</MenuItem>
          <div style={{height: '20px', backgroundColor: '#FFFFFF', margin: '0', display: 'flex', alignItems: 'center'}}>
            <div style={{width: '100%', height: '1px', backgroundColor: '#BFBFBF', padding: '0px'}}></div>
          </div>
          <MenuItem icon={<Communities />} rootStyles={{backgroundColor: '#FFFFFF', color: '#000000', fontSize: '18px'}}>Communities</MenuItem>
          <MenuItem icon={<BestOfReddit />} rootStyles={{backgroundColor: '#FFFFFF', color: '#000000', fontSize: '18px'}}>Best of Reddit</MenuItem>
          <MenuItem icon={<Topics />} rootStyles={{backgroundColor: '#FFFFFF', color: '#000000', fontSize: '18px'}}>Topics</MenuItem>
          <div style={{height: '20px', backgroundColor: '#FFFFFF', margin: '0', display: 'flex', alignItems: 'center'}}>
            <div style={{width: '100%', height: '1px', backgroundColor: '#BFBFBF', padding: '0px'}}></div>
          </div>
          <MenuItem icon={<ContentPolicy />} rootStyles={{backgroundColor: '#FFFFFF', color: '#000000', fontSize: '18px'}}>Content Policy</MenuItem>
          <MenuItem icon={<PrivacyPolicy />} rootStyles={{backgroundColor: '#FFFFFF', color: '#000000', fontSize: '18px'}}>Privacy Policy</MenuItem>
          <MenuItem icon={<UserAgreement />} rootStyles={{backgroundColor: '#FFFFFF', color: '#000000', fontSize: '18px'}}>User Agreement</MenuItem>
        </SubMenu>
      </Menu>
      <div className='mt-4 mb-2'>
        <a className='rights-reserved ms-4'>Reddit, Inc. © 2024. All rights reserved.</a>
      </div>
    </Sidebar>
    <SignupWrapper />
    {isCreateCommunityModalOpen && <CreateCommunity show={isCreateCommunityModalOpen} onHide={() => setCreateCommunityModalOpen(false)} />}
    {isSignupInfoModalOpen && <SignupInfo show={isSignupInfoModalOpen} onHide={() => setSignupInfoModalOpen(false)} onContinue={handleOpenUsernameInfo} onEnteredEmail={handleEnteredEmail} enteredEmail={enteredEmail} />}
    {isUsernameInfoModalOpen && <UsernameInfo show={isUsernameInfoModalOpen} onHide={() => setUsernameInfoModalOpen(false)} onContinueToGender={handleContinueToGender} onEnteredUsername={handleEnteredUsername} onEnteredPassword={handleEnteredPassword} enteredUsername={username} enteredPassword={password} onBack={handleBackToSignupInfo} />}
    {isGenderModal && <Gender show={isGenderModal} onHide={() => setGenderModalOpen(false)} onContinueToPreferences={handleContinueToPreferences} />}
    {isPreferencesModalOpen && <Preferences show={isPreferencesModalOpen} onHide={() => setPreferencesModalOpen(false)} onBackToGender={handleBackToGender} />}
    </div>

  )
}

export default SidebarComponent
