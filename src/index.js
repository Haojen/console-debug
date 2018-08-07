import {h, render, Component} from 'preact'
import styled from 'styled-components'

const Consolebox = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    background: red;
`

const Menubar = styled.header`
    display: flex;
    height: 26px;
    width: 100%;
`

const MenubarItem = styled.nav`
    height: 100%;
    margin: 0 5px;
    
    color: ${props => props.isActive ? '#fff' : '#000'};
`

const MainContainer = styled.section`
    flex: 1;
    border: 1px solid;
    background-color: pink;
`

const Statusbar = styled.footer`
    color: #F51963;
    height: 20px;
    background-color: black;
`;


class Console extends Component {
    constructor() {
        super()

        this.state = {
            menubarId: 'console',
            menubarArray: [
                {
                    id: 'console',
                    name: 'console',
                },
                {
                    id: 'network',
                    name: 'network',
                }
            ],
        }
    }
    handleMenubarItemClick(menuItemId) {
        this.setState(Object.assign(this.state, {
            menubarId: menuItemId
        }))
    }
    render() {
        return (
            <Consolebox>
                <Menubar>
                    {
                        this.state.menubarArray.map(menuItem => {
                            return (
                                <MenubarItem isActive={menuItem.id == this.state.menubarId} onClick={this.handleMenubarItemClick.bind(this, menuItem.id)}>
                                    {menuItem.name}
                                </MenubarItem>
                            )
                        })
                    }
                </Menubar>
                <MainContainer>
                    456
                </MainContainer>
                <Statusbar>123</Statusbar>
            </Consolebox>
        )
    }
}


render(<Console></Console>, document.body)