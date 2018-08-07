import {h, render, Component} from 'preact'
import Statusbar from './statusbar'
import styled from 'styled-components'


const Header = styled.h1`
  color: #F51963;
`;


class Console extends Component {
    render() {
        return (
            <div>
                <Header>123</Header>
            </div>
        )
    }
}


render(<Console></Console>, document.body)