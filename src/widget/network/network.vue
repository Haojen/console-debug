<style scoped lang="scss">
    .network-widget {
        thead {
            background-color: #1b1a1a;
        }
        tr {
            text-align: center;
            &:nth-of-type(even) {
                background-color: #1b1a1a;
            }
        }
    }
</style>
<template>
    <div class="network-widget is-full-width">
        <table @click="onMockReq" cellpadding="0" cellspacing="0" class="is-full-width">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Method</th>
                    <th>Size</th>
                    <th>Type</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="chunk in networkChunk">
                    <td v-text="chunk._hook.name"></td>
                    <td v-text="chunk.status"></td>
                    <td v-text="chunk.method"></td>
                    <td v-text="chunk._hook.size"></td>
                    <td v-text="chunk.headers['content-type']"></td>
                    <!--<td v-text="chunk._xhook.costTime"></td>-->
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
  export default {
    name: "network",
    data() {
      return {
        networkChunk: {}
      }
    },
    methods: {
      onMockReq() {
        console.log('onMockReq')
        const xhr = new XMLHttpRequest()
        // xhr.open('GET', `http://127.0.0.1:8080`)
        xhr.open('GET', `https://eruda.liriliri.io/test.json`)
        // xhr.open('GET', `http://at.alicdn.com/t/font_757844_ce8xj73c288.css`)
        xhr.send()
      },
      getResourceName(url) {
        let ret = url.split('/')

        if (ret[ret.length-1].indexOf('?') > -1){
          ret = ret[ret.length-1].split('?')[0].trim
        }else {
          ret = ret[ret.length-1]
        }

        return ret === '' ? 'unknown' : ret
      },
      isCrossOrig(url) {
        const origin = window.location.origin

        function startWith(str, prefix) {
            return str.indexOf(prefix) === 0;
        }

        return !startWith(url, origin)

      },
      getSize(xhr, headersOnly, url, text) {
        let size = 0

        function lenToUtf8Bytes(str) {
          let m = encodeURIComponent(str).match(/%[89ABab]/g)
          return str.length + (m ? m.length : 0)
        }

        function getStrSize() {
          if (!headersOnly) {
            if (text) {
              size = lenToUtf8Bytes(text)
            }
          }
        }

        const suffixList = ['', 'K', 'M', 'G', 'T'];
        function getFileSize(bytes) {
          if (bytes <= 0) return '0';

          const suffixIdx = Math.floor(Math.log(bytes) / Math.log(1024)),
                val = bytes / Math.pow(2, suffixIdx * 10);
          return val.toFixed(2) + suffixList[suffixIdx];
        }

        if (this.isCrossOrig(url)) {
          getStrSize()
        } else {
          try {
            size = xhr.getResponseHeader('Content-Length')
          } catch (e) {
            getStrSize()
          }
        }

        if (size === 0) getStrSize()

        return `${getFileSize(size)}B`
      },
      getUniqueID() {
        let id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          let r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
          return v.toString(16);
        });
        return id;
      }
    },
    mounted() {
      this.$xhook.before((req, callback) => {
        const id = this.getUniqueID()

        req._hook = {}
        req._hook.uniqueID = id
        req._hook.name = this.getResourceName(req.url)
        req._hook.size = this.getSize(req.xhr, true,req.url)
        this.$set(this.networkChunk, [id], req)
        callback()
      })

      this.$xhook.after((req, res) => {
        req._hook.size = this.getSize(req.xhr, false, req.url, res.text)
        console.log(req, res, xhr.getAllResponseHeaders())
        this.$set(this.networkChunk, [req._hook.uniqueID], Object.assign(req, res))
      })


      const xhr = new XMLHttpRequest()

      let count = 0
      xhr.open('GET', `http://127.0.0.1:8080`)
      xhr.send()
      count+=1
      // setTimeout(() => {
      //   xhr.open('GET', `http://ww.baidu.com/`)
      //   xhr.send()
      //   count+=1
      // }, 1000)
    }
  }
</script>
