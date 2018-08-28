<template>
    <div class="network-widget">
        <table @click="onMockReq">
            <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Method</th>
                <th>Size</th>
                <th>Type</th>
            </tr>
            <tbody>
                <tr v-for="chunk in networkChunk">
                    <td v-text="chunk.url"></td>
                    <td v-text="chunk.status"></td>
                    <td v-text="chunk.method"></td>
                    <td v-text="chunk.data && chunk.data.length"></td>
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
        xhr.open('GET', `http://127.0.0.1:8080`)
        xhr.open('GET', `https://eruda.liriliri.io/test.json?`)
        xhr.send()
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
            let resTxt = text

            if (resTxt) {
              size = lenToUtf8Bytes(resTxt)
            }
          }
        }

        const suffixList = ['', 'K', 'M', 'G', 'T'];
        function getFileSize(bytes) {
          if (bytes <= 0) return '0';

          var suffixIdx = Math.floor(Math.log(bytes) / Math.log(1024)),
            val = bytes / Math.pow(2, suffixIdx * 10);
console.log(suffixIdx, 'suffixIdx', bytes, val)
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
        req._hook.size = this.getSize(req.xhr, true,req.url)
        this.$set(this.networkChunk, [id], req)
        callback()
      })

      this.$xhook.after((req, res) => {
        req._hook.size = this.getSize(req.xhr, false, req.url, res.text)
        console.log(req, res, res.text)
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

<style scoped>

</style>