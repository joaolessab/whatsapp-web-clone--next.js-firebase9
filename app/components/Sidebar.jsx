import styled from 'styled-components'
import { Avatar, IconButton } from '@mui/material'
import ChatIcon from '@mui/icons-material/Chat'
import CustomMoreVertical from './CustomMoreVertical'
import SearchIcon from '@mui/icons-material/Search'
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

const Sidebar = () => { 
    return (
        <Container>
            <Header>
                <UserAvatar src="/avatar.png" />
                <IconsGroup>
                    <IconButton>
                        <img src="/story.svg" alt="" />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <CustomMoreVertical />
                </IconsGroup>
            </Header>
            <Notification>
                <NotificationAvatar>
                    <NotificationsOffIcon style={{ color: '#9DE1FE' }} />
                </NotificationAvatar>
                <NotificationText>
                    <div>Get Notification of New Messages</div>
                    <div style={{ display: 'flex', alignItems: 'center'}}>
                        <a href="#"><u>Turn on Desktop notifications</u></a>
                        <IconButton>
                            <ArrowForwardIosIcon style={{width: 15, height: 15}} />
                        </IconButton>
                    </div>
                </NotificationText>
            </Notification>
            <SearchChat>
                <SearchBar>
                    <SearchIcon />
                    <SearchInput />
                </SearchBar>
            </SearchChat>
        </Container>
    )
}

export default Sidebar

const Container = styled.div`
    background-color: #FFFFFF;
    min-width: 320px;
    max-width: 450px;
    height: 100%;
`

const Header = styled.div`
    display: flex;
    position: sticky;
    top: 0;
    background-color: white;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    height: 80px;
    border-bottom: 1px solid whitesmoke;
    width: 100%;
`

const UserAvatar = styled(Avatar)`
    cursor: pointer;
    :hover{
        opacity: 0.8;
    }
`

const IconsGroup = styled.div``

const SearchChat = styled.div`
    background-color: #f6f6f6;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding: 20px;
`

const SearchBar = styled.div`
    display: flex;
    padding: 5px;
    border-radius: 10px;
    border-bottom: 1px solid #ededed;
    background: white;
`

const SearchInput = styled.input`
    width: 100%;
    border: none;
`

const Notification = styled.div`
    display: flex;
    justify-content: space-around;
    aling-items: center;
    padding: 10px;
    background-color: #9DE1FE;
`

const NotificationAvatar = styled(Avatar)`
    background-color: white;
`

const NotificationText = styled.div`
    display: flex;
    flex-direction: column;
`