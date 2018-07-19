class ConsoleDebug {
    constructor(config={}) {
        const CONFIG = {
            el: config.el,
            position: {
                top: config.position && config.position.top || '0',
                left: config.position && config.position.left || '100%',
            },
            touchTrigger: config.touchTrigger || 3,
            keyboardTrigger: config.keyboardTrigger || '',
            backgroundColor: config.backgroundColor || 'rgba(0,0,0,0.5)',
            size: {
                height: config.size && config.size.height || '100vh', // half
                width: config.size && config.size.width || '100vw'
            }
        }

        this.initControlPanel(CONFIG)
    }

    initControlPanel(config) {
        const Setting = {

        }

        const RootEl = document.createElement('div')
        RootEl.id = '__CONSOLE_DEBUG_HAOJEN__'
        RootEl.style.position = 'absolute'
        RootEl.style.top = config.position.top
        RootEl.style.left = config.position.left
        RootEl.style.width = config.size.width
        RootEl.style.height = config.size.height
        RootEl.style.backgroundColor = config.backgroundColor

        const TitleBar = document.createElement('div')
        TitleBar.style.height = '40px'
        TitleBar.style.width = '100%'
        TitleBar.style.backgroundColor = 'rgb(218,218,218)'

        const MinimizeButton = document.createElement('button')
        MinimizeButton.innerText = '_'
        MinimizeButton.onclick = () => {}
        MinimizeButton.style.width = '35px'
        MinimizeButton.style.height = '35px'
        MinimizeButton.style.borderRadius = '50%'
        MinimizeButton.style.border = '1px solid red'

        const CloseButton = document.createElement('button')
        CloseButton.innerText = 'X'
        CloseButton.onclick = () => {}
        CloseButton.style.width = '35px'
        CloseButton.style.height = '35px'
        CloseButton.style.borderRadius = '50%'
        CloseButton.style.border = '1px solid red'

        this.trigger(RootEl)

        const Container = config.el ? document.querySelector(config.el) : document.body
        Container.appendChild(RootEl)
    }

    trigger(element, method) {
        // 多点触控
        if (window.ontouchstart) {
            // document.body.ontouchend

        }

        // 配合键盘
        if (window.onclick) {

        }
    }

}

const ConsoleLog = new ConsoleDebug()