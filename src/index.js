import './style/index.scss'

const DomKit = {
    createEl(el) {
        return document.createElement(el)
    },
    resizer(obj) {
        obj.onmousedown = e => {
            let dir = '';  //设置好方向
            let firstX = e.clientX;  //获取第一次点击的横坐标
            let firstY = e.clientY;   //获取第一次点击的纵坐标
            let width = obj.offsetWidth;  //获取到元素的宽度
            let height = obj.offsetHeight;  //获取到元素的高度
            let Left = obj.offsetLeft;   //获取到距离左边的距离
            let Top = obj.offsetTop;   //获取到距离上边的距离
            //下一步判断方向距离左边的距离+元素的宽度减去自己设定的宽度，只要点击的时候大于在这个区间，他就算右边

            if (firstX > Left + width - 30) {
                dir = "right";
            } else if (firstX < Left + 30) {
                dir = "left";
            }
            if (firstY > Top + height - 30) {
                dir = "down";
            } else if (firstY < Top + 30) {
                dir = "top";
            }
            //判断方向结束
            document.onmousemove = e => {
                switch (dir) {
                    case "right":
                        document.body.style.cursor = 'ew-resize'
                        obj.style["width"] = width + (e.clientX - firstX) + "px";
                        break;
                    case "left":
                        document.body.style.cursor = 'ew-resize'
                        obj.style["width"] = width - (e.clientX - firstX) + "px";
                        obj.style["left"] = Left + (e.clientX - firstX) + "px";
                        break;
                    case "top":
                        document.body.style.cursor = 'ns-resize'
                        obj.style["height"] = height - (e.clientY - firstY) + "px";
                        obj.style["top"] = Top + (e.clientY - firstY) + "px";
                        break;
                    case "down":
                        document.body.style.cursor = 'ns-resize'
                        obj.style["height"] = height + (e.clientY - firstY) + "px";
                        break;
                }
            }
            obj.onmouseup = () => {
                document.onmousemove = null
                document.body.style.cursor = 'default'
            }
            document.onmouseleave = () => {
                document.onmousemove = null
                document.body.style.cursor = 'default'
            }
            return false;
        }
    }
}

const RootEl = DomKit.createEl('div')
RootEl.id = '__ZEN_LOG__'

const ResizerEl = DomKit.createEl('div')
ResizerEl.classList.add('resizer')
ResizerEl.classList.add('resizer-horizontal')

let beforeY = 0;

DomKit.resizer(RootEl)

RootEl.appendChild(ResizerEl)

document.body.appendChild(RootEl)