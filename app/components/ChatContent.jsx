import { Avatar, IconButton } from '@mui/material'
import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search'
import MoreVertIcon from '@mui/icons-material/MoreVert'

const ChatContent = () => { 
    return (
        <Container>
            <Header>
                <Avatar />
                <HeaderInfo>
                    <h3>Travis</h3>
                    <div>Last Active: 3 hours ago</div>
                </HeaderInfo>
                <IconButton>
                    <SearchIcon />
                </IconButton>
                <IconButton>
                    <MoreVertIcon />
                </IconButton>
            </Header>
        </Container>
    )
    
}

export default ChatContent

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const Header = styled.div`
    position: sticky;
    background-color: white;
    z-index: 100;
    top: 0;
    display: flex;
    padding: 11px;
    height: 80px;
    align-items: center;
    border-bottom: 1px solid whitesmoke;
`

const HeaderInfo = styled.div`
    margin-left: 15px;
    flex: 1;

    >h3{
        margin-bottom: 3px;
    }

    >div{
        font-size: 14px;
        color: gray;
    }
`