import './style/index.scss'

const DomKit = {
    createEl(el) {
        return document.createElement(el)
    },
    resizer(el) {
        el.onmousedown = () => {
            el.onmousemove = () => {}
            el.onmouseup = () => {el.onmousemove = null}
        }
    }
}

const RootEl = DomKit.createEl('div')
RootEl.id = '__ZEN_LOG__'

const ResizerEl = DomKit.createEl('div')
ResizerEl.classList.add('resizer')


document.body.appendChild(RootEl)