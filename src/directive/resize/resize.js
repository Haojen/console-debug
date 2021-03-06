export default {
  inserted(el, binding) {
    function resizer(obj) {
      const eventType = {
        pc: {
          startDrag: 'onmousedown',
          startMove: 'onmousemove',
          endDrag: 'onmouseup'
        },

        mobile: {
          startDrag: 'ontouchstart',
          startMove: 'ontouchmove',
          endDrag: 'ontouchend'
        },
      }

      const ev = eventType['ontouchstart' in document ? 'mobile' : 'pc']

      const screenHeight = window.screen.height - 30
      let startDragFirstX = null,
          startDragFirstY = null
      obj[ev.startDrag] = e => {
        let x = e.pageX,
            y = e.pageY;

        if (e.touches) {
          x = e.touches[0].pageX
          y = e.touches[0].pageY
        }

        if (startDragFirstX === null && startDragFirstY === null) {
          startDragFirstX = parseInt(x)
          startDragFirstY = parseInt(y)
        }

        let dir = '';  //设置好方向
        let firstX = x;  //获取第一次点击的横坐标
        let firstY = y;   //获取第一次点击的纵坐标
        let width = obj.offsetWidth;  //获取到元素的宽度
        let height = obj.offsetHeight;  //获取到元素的高度
        let Left = obj.offsetLeft;   //获取到距离左边的距离
        let Top = obj.offsetTop;   //获取到距离上边的距离
        //下一步判断方向距离左边的距离+元素的宽度减去自己设定的宽度，只要点击的时候大于在这个区间，他就算右边

        const trigger = 25

        if (firstX > Left + width - trigger) {
          dir = "right";
        } else if (firstX < Left + trigger) {
          dir = "left";
        }
        if (firstY > Top + height - trigger) {
          // dir = "down";
        } else if (firstY < Top + trigger) {
          dir = "top";
        }

        document[ev.startMove] = e => {
          let x = parseInt(e.pageX),
              y = parseInt(e.pageY);

          if (e.touches) {
            x = parseInt(e.touches[0].pageX)
            y = parseInt(e.touches[0].pageY)
          }

          const triggerX = startDragFirstX - x > 1 || x - startDragFirstX > 1,
                triggerY = startDragFirstY - y > 1 || y - startDragFirstY > 1

          if(!triggerY || !triggerX) {
            return
          }

          switch (dir) {
              case "right":
                document.body.style.cursor = 'ew-resize'
                obj.style["width"] = width + (x - firstX) + "px";
                break;
              case "left":
                document.body.style.cursor = 'ew-resize'
                obj.style["width"] = width - (x - firstX) + "px";
                obj.style["left"] = Left + (x - firstX) + "px";
                break;
              case "top":
                const topOffset = Top + (y - firstY)
                if (topOffset> 0 && topOffset < screenHeight) {
                  document.body.style.cursor = 'ns-resize'
                  obj.style["height"] = height - (y - firstY) + "px";
                  obj.style["top"] = topOffset + "px";
                }
                break;
              case "down":
                document.body.style.cursor = 'ns-resize'
                obj.style["height"] = height + (y - firstY) + "px";
                break;
            }
        }

        obj[ev.endDrag] = () => {
          startDragFirstX = null
          startDragFirstY = null
          document[ev.startMove] = null
          document.body.style.cursor = 'default'
        }
        document.onmouseleave = () => {
          startDragFirstX = null
          startDragFirstY = null
          document.onmousemove = null
          document.body.style.cursor = 'default'
        }
      }
    }
    resizer(el)
  }
}