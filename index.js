class ConsoleDebug {
    constructor(config={}) {
        const CONFIG = {
            el: config.el,
            position: {
                top: config.position && config.position.top || '0',
                left: config.position && config.position.left || '0',
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
        RootEl.style.position = 'fixed'
        RootEl.style.top = config.position.top
        RootEl.style.left = config.position.left
        RootEl.style.width = config.size.width
        RootEl.style.height = config.size.height
        RootEl.style.backgroundColor = config.backgroundColor
        RootEl.style.borderTopLeftRadius = '10px'
        RootEl.style.borderTopRightRadius = '10px'
        RootEl.style.overflow ='hidden'
        RootEl.style.boxSizing = 'border-box'

        const TitleBar = document.createElement('div')
        TitleBar.style.height = '25px'
        TitleBar.style.width = '100%'
        TitleBar.style.backgroundColor = 'rgb(218,218,218)'
        TitleBar.style.position = 'relative'
        RootEl.appendChild(TitleBar)

        const buttonWidth = '20px',
              buttonHeight = '20px'

        const MinimizeButton = document.createElement('button')
        // MinimizeButton.innerText = '_'
        MinimizeButton.onclick = () => {}
        MinimizeButton.style.width = buttonWidth
        MinimizeButton.style.height = buttonHeight
        MinimizeButton.style.borderRadius = '50%'
        MinimizeButton.style.marginRight = '50px'
        MinimizeButton.style.backgroundColor = 'RGB(255,193,69)'
        MinimizeButton.style.float = 'right'
        MinimizeButton.style.marginTop = '2px'
        TitleBar.appendChild(MinimizeButton)

        const CloseButton = document.createElement('button')
        // CloseButton.innerText = 'X'
        CloseButton.onclick = () => {}
        CloseButton.style.width = buttonWidth
        CloseButton.style.height = buttonHeight
        CloseButton.style.borderRadius = '50%'
        CloseButton.style.float = 'right'
        CloseButton.style.marginTop = '2px'
        CloseButton.style.marginRight = '8px'
        TitleBar.appendChild(CloseButton)

        const ContentBox = document.createElement('div')
        ContentBox.style.width = '100%'
        ContentBox.style.height = '100%'
        ContentBox.style.overflow = 'auto'
        ContentBox.style.paddingTop = '10px'
        ContentBox.style.paddingBottom = '20px'
        ContentBox.style.paddingLeft = '25px'
        ContentBox.style.paddingRight = '25px'
        ContentBox.style.color = '#fff'
        ContentBox.style.fontFamily = 'sans-serif'
        ContentBox.innerText = 'console.log'

        const FooterMenu = document.createElement('div')
        FooterMenu.style.height = '25px'
        FooterMenu.style.width = '100%'
        FooterMenu.style.position = 'absolute'
        FooterMenu.style.left = '0'
        FooterMenu.style.bottom = '0'
        FooterMenu.style.borderTop = '1px solid #e3e3e3'


        const Network = document.createElement('div')

        RootEl.appendChild(ContentBox)
        RootEl.appendChild(FooterMenu)

        this.trigger(RootEl)
        const Container = config.el ? document.querySelector(config.el) : document.body
        Container.appendChild(RootEl)
    }

    trigger(element, method) {
        // 多点触控
        let touchNumber = 0, event = 'ontouchend' in document ? 'touchend' : 'click'

        // We create a manager object, which is the same as Hammer(), but without the presetted recognizers.
        // const  mc = new Hammer.Manager(element)
        // mc.add(new Hammer.Tap())
        // mc.add(new Hammer.Tap({ event: 'quadrupletap', taps: 4 }))
        // mc.get('quadrupletap').recognizeWith('tap')
        // mc.on("quadrupletap", (ev) => {
        //
        // })

    }

}

const ConsoleLog = new ConsoleDebug()