import './Sidebar.css';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import { useState } from 'react';
import Settings from '../Settings/Settings';
import Profile from '../Profile/Profile';
import FeedPage from '../FeedPage/FeedPage';

const Sidebar = (props) => {
    const {currentAccount} = props;
    const [selectedTab, setSelectedTab] = useState(0);

  return (
        <div className='sidebarMainContainer'>
            <div className='sidebarMenu'>
            <div className={`sidebarMenuItem ${(selectedTab===0?'Active':'')}`} onClick={()=>{setSelectedTab(0)}}><DynamicFeedIcon/> Feed</div>
            <div className={`sidebarMenuItem ${(selectedTab===1?'Active':'')}`} onClick={()=>{setSelectedTab(1)}}><PersonIcon/> Profile</div>
            <div className={`sidebarMenuItem ${(selectedTab===2?'Active':'')}`}  onClick={()=>{setSelectedTab(2)}}><SettingsIcon/> Settings</div>
            </div>
            <div className='sidebarMainPage'>
                {selectedTab===0 && <FeedPage />}
                {selectedTab===1 && <Profile />}
                {selectedTab===2 && <Settings />}
            </div>
        </div>
  )
};

export default Sidebar;