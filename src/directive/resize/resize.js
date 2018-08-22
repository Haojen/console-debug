export default {
  inserted(el, binding) {
    console.log(el, 'el')
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

      obj[ev.startDrag] = e => {
        let x = e.pageX,
          y = e.pageY;

        if (e.touches) {
          x = e.touches[0].pageX
          y = e.touches[0].pageY
        }

        let dir = '';  //设置好方向
        let firstX = x;  //获取第一次点击的横坐标
        let firstY = y;   //获取第一次点击的纵坐标
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
        document[ev.startMove] = e => {
          let x = e.pageX,
              y = e.pageY;

          if (e.touches) {
            x = e.touches[0].pageX
            y = e.touches[0].pageY
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
              document.body.style.cursor = 'ns-resize'
              obj.style["height"] = height - (y - firstY) + "px";
              obj.style["top"] = Top + (y - firstY) + "px";
              break;
            case "down":
              document.body.style.cursor = 'ns-resize'
              obj.style["height"] = height + (y - firstY) + "px";
              break;
          }
        }
        obj[ev.endDrag] = () => {
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
    resizer(el)
  }
}