import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import Home from '../styles/icons/Home.jsx';
import Popular from '../styles/icons/Popular.jsx';
import All from '../styles/icons/All.jsx';
import Add from '../styles/icons/Add.jsx';
import AboutReddit from '../styles/icons/AboutReddit.jsx';
import Advertise from '../styles/icons/Advertise.jsx';
import Help from '../styles/icons/Help.jsx';
import Blog from '../styles/icons/Blog.jsx';
import Careers from '../styles/icons/Careers.jsx';
import Press from '../styles/icons/Press.jsx';
import Communities from '../styles/icons/Communities.jsx';
import BestOfReddit from '../styles/icons/BestOfReddit.jsx';
import Topics from '../styles/icons/Topics.jsx';
import ContentPolicy from '../styles/icons/ContentPolicy.jsx';
import PrivacyPolicy from '../styles/icons/PrivacyPolicy.jsx';
import UserAgreement from '../styles/icons/UserAgreement.jsx';
import UpArrow from '../styles/icons/UpArrow.jsx';
import DownArrow from '../styles/icons/DownArrow.jsx';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import  FavouriteButton  from './FavouriteButton';
import CommunityImageSideBar from './CommunityImageSideBar.jsx';


function SidebarComponent() {
  return (
    <div>
      <Sidebar backgroundColor='#0B1416' rootStyles={{
        marginTop: '70px',
        color: '#FFFFFF',
        marginLeft: '90px',
        borderRadius: '0px',
        width: '300px',
        border: 'none',
        fontSize: '18px'
      }}>
      <Menu renderExpandIcon={({ open }) => <span>{open ? <KeyboardArrowUpIcon /> : <DownArrow />}</span>}
      menuItemStyles={{
        button: {
          [`&.active`]: {
            backgroundColor: '#1A282D',
          },
          [`&:hover`]: {
            backgroundColor: '#131F23',
          },
          borderRadius: '10px',
          padding: '20px',
        },
      }}>
        <MenuItem icon={<Home />}> Home </MenuItem>
        <MenuItem icon={<Popular />}> Popular </MenuItem>
        <MenuItem icon={<All />}> All </MenuItem>
        <hr></hr>
        <SubMenu label="YOUR COMMUNITIES" rootStyles={{
            color: '#82959B',
            backgroundColor: '#0B1416',
            fontSize: '16px',
          }} menuItemStyles={{
          button: {
            [`&.active`]: {
              backgroundColor: '#1A282D',
            },
            [`&:hover`]: {
              backgroundColor: '#131F23',
            },
            borderRadius: '10px',
            paddingLeft: '10px',
          },
        }}>
          <MenuItem rootStyles={{backgroundColor: '#0B1416', color: '#f2f4f5', fontSize: '18px'}} icon={<Add />}>Create a community</MenuItem>
          <MenuItem prefix={<CommunityImageSideBar imageUrl={"https://styles.redditmedia.com/t5_2r0ij/styles/communityIcon_yor9myhxz5x11.png"} />} suffix={<FavouriteButton />} rootStyles={{backgroundColor: '#0B1416', color: '#f2f4f5', fontSize: '18px'}}>r/announcements</MenuItem>
          <MenuItem prefix={<CommunityImageSideBar imageUrl={"https://styles.redditmedia.com/t5_2s887/styles/communityIcon_px0xl1vnj0ka1.png"} />} suffix={<FavouriteButton />} rootStyles={{backgroundColor: '#0B1416', color: '#f2f4f5', fontSize: '18px'}}>r/PS5</MenuItem>
        </SubMenu>
        <hr></hr>
        <SubMenu label="RESOURCES" rootStyles={{
          fontSize: '16px',
          color: '#82959B',
          backgroundColor: '#0B1416',
        }} menuItemStyles={{
        button: {
          [`&.active`]: {
            backgroundColor: '#1A282D',
          },
          [`&:hover`]: {
            backgroundColor: '#131F23',
          },
          borderRadius: '10px',
        },
      }}>
          <MenuItem icon={<AboutReddit />} rootStyles={{backgroundColor: '#0B1416', color: '#f2f4f5', fontSize: '18px'}}>About Reddit</MenuItem>
          <MenuItem icon={<Advertise />} rootStyles={{backgroundColor: '#0B1416', color: '#f2f4f5', fontSize: '18px'}}>Advertise</MenuItem>
          <MenuItem icon={<Help />} rootStyles={{backgroundColor: '#0B1416', color: '#f2f4f5', fontSize: '18px'}}>Help</MenuItem>
          <MenuItem icon={<Blog />} rootStyles={{backgroundColor: '#0B1416', color: '#f2f4f5', fontSize: '18px'}}>Blog</MenuItem>
          <MenuItem icon={<Careers />}rootStyles={{backgroundColor: '#0B1416', color: '#f2f4f5', fontSize: '18px'}}>Careers</MenuItem>
          <MenuItem icon={<Press />} rootStyles={{backgroundColor: '#0B1416', color: '#f2f4f5', fontSize: '18px'}}>Press</MenuItem>
          <div style={{height: '20px', backgroundColor: '#0B1416', margin: '0', display: 'flex', alignItems: 'center'}}>
            <div style={{width: '100%', height: '1px', backgroundColor: '#4d5859', padding: '0px'}}></div>
          </div>
          <MenuItem icon={<Communities />} rootStyles={{backgroundColor: '#0B1416', color: '#f2f4f5', fontSize: '18px'}}>Communities</MenuItem>
          <MenuItem icon={<BestOfReddit />} rootStyles={{backgroundColor: '#0B1416', color: '#f2f4f5', fontSize: '18px'}}>Best of Reddit</MenuItem>
          <MenuItem icon={<Topics />} rootStyles={{backgroundColor: '#0B1416', color: '#f2f4f5', fontSize: '18px'}}>Topics</MenuItem>
          <MenuItem icon={<ContentPolicy />} rootStyles={{backgroundColor: '#0B1416', color: '#f2f4f5', fontSize: '18px'}}>Content Policy</MenuItem>
          <MenuItem icon={<PrivacyPolicy />} rootStyles={{backgroundColor: '#0B1416', color: '#f2f4f5', fontSize: '18px'}}>Privacy Policy</MenuItem>
          <MenuItem icon={<UserAgreement />} rootStyles={{backgroundColor: '#0B1416', color: '#f2f4f5', fontSize: '18px'}}>User Agreement</MenuItem>
        </SubMenu>
      </Menu>
      <div className='mt-4 mb-2'>
        <a className='rights-reserved ms-4'>Reddit, Inc. © 2024. All rights reserved.</a>
      </div>
    </Sidebar>
    </div>
  )
}

export default SidebarComponent
