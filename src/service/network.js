export default class overrideAJAX {
  constructor(callback) {
    let that = this;
    that._open = window.XMLHttpRequest.prototype.open;
    that._send = window.XMLHttpRequest.prototype.send;

    that.reqList = {}
    that.callback = callback

    window.XMLHttpRequest.prototype.open = function() {
      let XMLReq = this,
          args = [].slice.call(arguments),
          method = args[0],
          url = args[1],
          id = that.getUniqueID(),
          timer = null
      // may be used by other functions
      XMLReq._url = url;
      XMLReq._requestID = id;
      XMLReq._method = method;

      // mock onreadystatechange
      let _onreadystatechange = XMLReq.onreadystatechange || function() {}
      let onreadystatechange = function() {
        let item = {}
        // update status
        item.readyState = XMLReq.readyState;
        item.status = 0;
        if (XMLReq.readyState > 1) {
          item.status = XMLReq.status;
        }
        item.responseType = XMLReq.responseType;

        switch (XMLReq.readyState) {
          case 0:
            // UNSENT
            item.startTime = new Date();
            console.log('UNSENT')
            break;
          case 1:
            // OPENED
            item.startTime = new Date();
            console.log('OPENED', item.startTime)
            break;
          case 2:
            // HEADERS_RECEIVED
            item.header = {}
            let header = XMLReq.getAllResponseHeaders() || '',
              headerArr = header.split("\n");

            // extract plain text to key-value format
            for (let i=0; i<headerArr.length; i++) {
              let line = headerArr[i];
              if (!line) { continue; }
              let arr = line.split(': ');
              let key = arr[0],
                value = arr.slice(1).join(': ');
              item.header[key] = value;
            }
            break;
          case 3:
            // LOADING
            break;
          case 4:
            item.endTime = new Date()
            item.costTime = item.endTime - (item.startTime || item.endTime);
            item.response = XMLReq.response;
            clearInterval(timer);
            break;
          default:
            clearInterval(timer);
        }

        that.reqList[id] = item
        // console.log(that.reqList[id])
        that.emitRequestChunkInfo(that.reqList)
        return _onreadystatechange.apply(XMLReq, arguments);
      };
      XMLReq.onreadystatechange = onreadystatechange;

      // some 3rd libraries will change XHR's default function
      // so we use a timer to avoid lost tracking of readyState
      let preState = -1;
      timer = setInterval(() => {
        if (preState !== XMLReq.readyState) {
          preState = XMLReq.readyState;
          onreadystatechange.call(XMLReq);
        }
      }, 10);
      return that._open.apply(XMLReq, args);
    };
    window.XMLHttpRequest.prototype.send = function() {
      let XMLReq = this,
          args = [].slice.call(arguments),
          data = args[0],
          item = {};

      item.method = XMLReq._method.toUpperCase();

      let query = XMLReq._url.split('?'); // a.php?b=c&d=?e => ['a.php', 'b=c&d=', '?e']
      item.url = query.shift(); // => ['b=c&d=', '?e']

      if (query.length > 0) {
        item.getData = {};
        query = query.join('?'); // => 'b=c&d=?e'
        query = query.split('&'); // => ['b=c', 'd=?e']
        for (let q of query) {
          q = q.split('=');
          item.getData[q[0]] = q[1];
        }
      } else if (item.method === 'POST') {

        // save POST data
        if (tool.isString(data)) {
          let arr = data.split('&');
          item.postData = {};
          for (let q of arr) {
            q = q.split('=');
            item.postData[ q[0] ] = q[1];
          }
        } else if (tool.isPlainObject(data)) {
          item.postData = data;
        }
      }

      that.reqList[XMLReq._requestID] = Object.assign(that.reqList[XMLReq._requestID], item)

      // that.emitRequestChunkInfo(XM, item);

      return that._send.apply(XMLReq, args);
    };
  }

  /**
   * generate an unique id string (32)
   * @private
   * @return string
   */
  getUniqueID() {
    let id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      let r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
    return id;
  }

  emitRequestChunkInfo(chunkInfo) {
    // console.log(chunkInfo, 'emitRequestChunkInfo', this.reqList)
    console.log(chunkInfo, 'emitRequestChunkInfo')

    this.callback && this.callback(chunkInfo, requestEntries)
  }
}