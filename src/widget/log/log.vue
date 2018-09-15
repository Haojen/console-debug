<template>
    <div class="log-widget is-full-height use-flex is-column is-relative">
        <section class="flex-1">
            <ul>
                <li v-for="logItem in logList" :class="`log-level-${logItem.type}`">
                    <div class="log-chunk" :class="single.type"
                        v-for="single in logItem.data">
                        <div v-if="single.type === 'object'" v-for="obj in single.data" @click="onExpand(obj._value)">
                            <span v-text="obj.key+':'"></span>
                            <span v-text="obj.value" :class="obj.type"></span>
                        </div>
                        <p v-if="single.type !=='object'" v-text="single.data"></p>
                    </div>
                </li>
            </ul>
        </section>
        <footer class="is-full-height is-full-width use-flex is-align-center is-justify-between">
            <div>
                <button @click="onClearEv"><i class="iconfont icon-clear"></i></button>
            </div>
            <div>
                <i class="iconfont icon-cuowu"></i>
                <span v-text="amount.error"></span>
                <i class="iconfont icon-jinggao1"></i>
                <span v-text="amount.warn"></span>
            </div>
        </footer>
    </div>
</template>

<script>
  export default {
    name: "log",
    data() {
      return {
        logList: [],
        amount: {
          warn: 0,
          error: 0
        }
      }
    },
    methods: {
      onClearEv() {
        this.logList = []
        this.amount = {
            warn: 0,
            error: 0
        }
      },
      onExpand(value) {
        console.log(value, 'onExpand type')
      },
      formatObj(obj) {
        const keys = []
        for (let key in obj) {
          const item = {key}
          typeof obj[key] === 'number' && (item.value = obj[key])
          typeof obj[key] === 'string' && (item.value = obj[key])
          typeof obj[key] === 'boolean' && (item.value = obj[key])

          item.type = typeof obj[key]
          if (typeof obj[key] === 'object') {
            if (obj[key] === null) {
              item.type = 'null'
              item.value = 'null'
            }

            else {
              item.id = ''
              item.value = '(...)'
              item._value = obj[key]
            }
          }
          keys.push(item)
        }
        return keys
      },
      overrideConsole() {
        const _this = this

        function formatLog(args) {
          if (!args || args.length === 0) return

          return args.map(item => {
            const singleLog = {type: typeof item}

            if (typeof item === 'object') {
              // singleLog.data = JSON.stringify(item, null, 4)
              singleLog.data = _this.formatObj(item)
            }

            else {
              singleLog.data = item
            }

            return singleLog
          })
        }

        window.console = ( nativeConsole => {
          return {
            log:(...text) =>{
              nativeConsole.log(...text)
              _this.logList.push({
                type: 'log',
                data:formatLog(text)
              })
            },
            info: (...text) => {
              nativeConsole.info(...text)
              _this.logList.push({
                type: 'info',
                data:formatLog(text)
              })
            },
            debug(...text) {
              nativeConsole.debug(...text)
              _this.logList.push({
                type: 'debug',
                data:formatLog(text)
              })
            },
            warn(...text) {
              nativeConsole.warn(...text)
              _this.logList.push({
                type: 'warn',
                data:formatLog(text)
              })
              _this.amount.warn += 1
              _this.$emit('logAmount', _this.amount)
            },
            error(...text) {
              nativeConsole.error(...text)
              _this.logList.push({
                type: 'error',
                data:formatLog(text)
              })
              _this.amount.error += 1
              _this.$emit('logAmount', _this.amount)
            },
            count(...text) {
              nativeConsole.count(...text)
              _this.logList.push({
                type: 'count',
                data: formatLog(text)
              })
            }
          };
        })(window.console)
      },
    },
    created() {
      this.overrideConsole()
      // console.log('begin', 12312)
      // console.info(this.logList)
      // console.debug(this.logList)
      // console.warn(this.logList)
      // console.error(this.logList)
      // setInterval(() => {
      //   // console.log('文本', {bar: {child: 'xxxxxxx', barNum: 666}, cool: 'haha', numbers: 1}, new Date())
      //   // console.warn('xxxx warn xxxx')
      // }, 15000)
    }
  }
</script>

<style lang="scss">
    .log-widget {

        > section {
            overflow: hidden;
            .log-chunk {
                margin: 0 3px;

                .number, .boolean {
                    color: #a967e9;
                }
                .string {
                    color: #e1e1e1;
                }
                .null  {
                    color: rgba(69, 144, 162, 0.8);
                }
                .object {
                    border-left: 2px solid lawngreen;
                }
            }

            ul {
                height: 100%;
                overflow: auto;
                word-break: break-all;
                li {
                    padding: 4px 5px;
                    border-left: 3px solid;
                    border-bottom: 1px solid rgba(255,255,255,0.15);

                    &.log-level-log {
                        border-left-color: gray;
                    }

                    &.log-level-info {
                        border-left-color: rgba(69, 144, 162, 0.8);
                    }

                    &.log-level-warn {
                        border-left-color: rgba(255, 157, 0, 0.3);
                        background-color: rgba(255, 157, 0, 0.3);
                    }

                    &.log-level-debug {
                        border-left-color: #b32cff;
                        background-color: rgba(179, 44, 255, 0.3);
                    }

                    &.log-level-error {
                        border-left-color: rgba(255, 0, 0, 0.3);
                        background-color: rgba(255, 17, 49, 0.3);
                    }
                }
            }
        }

        > footer {
            height: 26px;
            padding: 0 8px;

            .icon-clear {
                color: #C4C4C4;
            }

            .icon-cuowu {
                color: red;
            }

            .icon-jinggao1 {
                color: yellow;
            }
        }

    }

</style>