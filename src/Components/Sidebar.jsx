import ConversationItem from './ConversationItem';
import IconButton from '@mui/material/IconButton';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NightlightIcon from '@mui/icons-material/Nightlight';
import { AccountCircle } from '@mui/icons-material';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import './myStyles.css';

const Sidebar = ({ conversations }) => {
  return (
    <div className='sidebar-container'>
      <div className='sb-header'>
        <div>
          <IconButton>
            <AccountCircle />
          </IconButton>
        </div>
        <div>
          <IconButton>
            <PersonAddIcon />
          </IconButton>
          <IconButton>
            <GroupAddIcon />
          </IconButton>
          <IconButton>
            <AddCircleIcon />
          </IconButton>
          <IconButton>
            <NightlightIcon />
          </IconButton>
        </div>
      </div>
      <div className='sb-search'>
        <IconButton>
          <PersonSearchIcon />
        </IconButton>
        <input type='text' placeholder='Search' className='search-box' />
      </div>
      <div className='sb-conversations'>
        {conversations.map((conversation, index) => {
          return <ConversationItem key={index} props={conversation} />;
        })}
      </div>
    </div>
  );
};

export default Sidebar;
