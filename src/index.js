import {h, render, Component} from 'preact'
import styled from 'styled-components'
// import './style/index.scss'

const Consolebox = styled.div`
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    height: 40vh;
    width: 100vw;
    background: red;
`

const Menubar = styled.header`
    display: flex;
    height: 26px;
    width: 100%;
`

const MenubarItem = styled.button`
    height: 100%;
    margin: 0 5px;
    
    color: ${props => props.isActive ? '#000' : '#000'};
`

const MainContainer = styled.section`
    flex: 1;
    border: 1px solid;
    background-color: pink;
`

const MainContainerItem = styled.div`
    width: 100%;
    height: 100%;
`

const Statusbar = styled.footer`
    color: #F51963;
    height: 20px;
    background-color: black;
`;

class Log extends Component{
  constructor() {
    super()
  }

  render() {
    const LogItem = styled.span`
      color: ${ props => props.type === 'number' ? 'blue':''};
    `
    const logArray = this.props.logs

    let logRow = []
    logArray.map(log => {
      if (typeof log === 'string') {
        logRow.push(<LogItem> {log} </LogItem>)
      }

      else if (typeof log === 'number') {
        logRow.push(<LogItem type={'number'}> {log} </LogItem>)
      }

      else if (typeof log === 'object') {
        logRow.push(<LogItem> {JSON.stringify(log)} </LogItem>)
      }
    })


    return (
      <div>
        {logRow}
      </div>
    )
  }
}


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
      consoleLogs: [],
    }
  }
  handleMenubarItemClick(menuItemId) {
    this.setState(Object.assign(this.state, {
      menubarId: menuItemId
    }))
  }
  overrideConsole() {
    window.console = ( nativeConsole =>{
      const _this = this
      return {
        log: function(...text){
          nativeConsole.log(...text);
          const consoleLogs = _this.state.consoleLogs
          _this.setState({
            consoleLogs: consoleLogs.concat([text])
          })
        },
        info: function (...text) {
          nativeConsole.info(...text);
        },
        debug: function (...text) {
          nativeConsole.log(...text);
        },
        warn: function (...text) {
          nativeConsole.warn(...text);
        },
        error: function (...text) {
          nativeConsole.error(...text);
        }
      };
    })(window.console)
  }
  render() {
    let Temp = []
    if (this.state.menubarId === 'console') {
      this.state.consoleLogs.map( logs =>  {
        Temp.push(<Log logs={logs}></Log>)
      })
    }
    return (
      <Consolebox>
        <Menubar>
          {
            this.state.menubarArray.map(menuItem => {
              return (
                <MenubarItem isActive={menuItem.id == this.state.menubarId}
                             onClick={this.handleMenubarItemClick.bind(this, menuItem.id)}>
                  {menuItem.name}
                </MenubarItem>
              )
            })
          }
        </Menubar>
        <MainContainer>
          {Temp}
        </MainContainer>
        <Statusbar>123</Statusbar>
      </Consolebox>
    )
  }
  componentDidMount() {
    this.overrideConsole()
    console.log('log1')
    console.log('log2', '123', 456)
    console.log(1)
    console.log({a: 1})
    console.log([1,2,3])
    console.log(this.state.consoleLogs)

  }
}


render(<Console></Console>, document.body)