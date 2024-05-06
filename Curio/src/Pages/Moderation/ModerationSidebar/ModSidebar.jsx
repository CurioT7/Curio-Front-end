import React, { useState } from 'react'
import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import './ModSidebar.css'
import BackButton from '../../../styles/icons/BackButton';
import GoBack from '../../../styles/icons/GoBack';
import { Link } from 'react-router-dom';
import Queues from '../../../styles/icons/Queues';


function ModSidebar( {communityName}) {
  return (
    <Sidebar backgroundColor='#FFFFFF' rootStyles={{
      color: '#000000',
      marginLeft: '5px',
      borderRadius: '0px',
      border: 'none',
      fontSize: '0.875rem',
      position: 'fixed',
      height: '100vh',
      overflowY: 'auto',
      borderRight: '1px solid #0000001a',
    }}>
      <Menu style={{marginRight: '10px'}}>
        <Link to='/home' style={{ textDecoration: 'none' }}>
        <MenuItem className='ExitModTools' id='exitmodID' style={{paddingLeft: '5 px'}}><GoBack /> Exit mod tools</MenuItem>
        </Link>
        <span className='overviewText'>OVERVIEW</span>
        <MenuItem component={<Link to={`/r/${communityName}/about/modqueue`}/>} className='normalModItem'><Queues />Queues</MenuItem>
        <Link to={`/r/${communityName}/about/scheduledposts`} style={{ textDecoration: 'none' }}>
        <MenuItem className='normalModItem'>Scheduled Posts</MenuItem>
        </Link>
        <MenuItem component={<Link to={`/r/${communityName}/about/usermanagement`}/>} className='normalModItem'>User Management</MenuItem>
        <p className='overviewText' style={{paddingTop: '40px'}}>MODERATION</p>
        <MenuItem  className='normalModItem'>Rules and removal reasons</MenuItem>
        <MenuItem component={<Link to={`/r/${communityName}/about/rules/contentcontrols`}/>} className='normalModItem'>Content Controls</MenuItem>
        <p className='overviewText' style={{paddingTop: '40px'}}>SETTINGS</p>
        <MenuItem component={<Link to={`/r/${communityName}/about/settings`}/>} className='normalModItem'>General Settings</MenuItem>
      </Menu>
    </Sidebar>
  );
}

export default ModSidebar;