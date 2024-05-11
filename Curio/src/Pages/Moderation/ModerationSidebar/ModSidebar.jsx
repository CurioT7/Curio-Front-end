import React, { useState } from 'react'
import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import BackButton from '../../../styles/icons/BackButton';
import GoBack from '../../../styles/icons/GoBack';
import { Link } from 'react-router-dom';
import Queues from '../../../styles/icons/Queues';
import './ModSidebar.css';
import ScheduledPosts from '../../../styles/icons/ScheduledPosts';
import UserManagement from '../../../styles/icons/UserManagement'; 
import RulesandRemoval from '../../../styles/icons/RulesAndRemoval';
import ContentControls from '../../../styles/icons/ContentControls';
import SidebarSetting from '../../../styles/icons/SidbarSettings';

/**
 * Renders the moderation sidebar component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.communityName - The name of the community.
 * @module ModerationSidebar
 */


function ModSidebar({ communityName }) {
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
      <Menu style={{ marginRight: '10px' }}>
        <Link to='/home' style={{ textDecoration: 'none' }}>
          <MenuItem className='ExitModTools' id='exitmodID' style={{ paddingLeft: '5 px' }}><GoBack /> Exit mod tools</MenuItem>
        </Link>
        <span className='overviewText'>OVERVIEW</span>
        <Link to={`/r/${communityName}/about/modqueue`} style={{ textDecoration: 'none' }}>
          <MenuItem className='normalModItem'><Queues />Queues</MenuItem>
        </Link>
        <Link to={`/r/${communityName}/about/scheduledposts`} style={{ textDecoration: 'none' }}>
          <MenuItem className='normalModItem'><ScheduledPosts />Scheduled Posts</MenuItem>
        </Link>
        <Link to={`/r/${communityName}/about/usermanagement`} style={{ textDecoration: 'none' }}>
          <MenuItem className='normalModItem'><UserManagement />User Management</MenuItem>
        </Link>
        <p className='overviewText' style={{ paddingTop: '40px' }}>MODERATION</p>
        <Link to={`/r/${communityName}/about/rules`} style={{ textDecoration: 'none' }}>
        <MenuItem className='normalModItem'><RulesandRemoval />Rules and removal reasons</MenuItem>
        </Link>
        <Link to={`/r/${communityName}/about/rules/contentcontrols`} style={{ textDecoration: 'none' }}>
          <MenuItem className='normalModItem'><ContentControls />Content Controls</MenuItem>
        </Link>
        <p className='overviewText' style={{ paddingTop: '40px' }}>SETTINGS</p>
        <Link to={`/r/${communityName}/about/settings`} style={{ textDecoration: 'none' }}>
          <MenuItem className='normalModItem'><SidebarSetting />General Settings</MenuItem>
        </Link>
      </Menu>
    </Sidebar>
  );
}

export default ModSidebar;