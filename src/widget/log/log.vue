<template>
    <div class="log-widget">
        <ul>
            <li v-for="logItem in logList" :class="`log-level-${logItem.type}`">
                <span class="log-chunk" :class="single.type"
                      v-for="single in logItem.data" v-text="single.data"></span>
            </li>
        </ul>
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
      overrideConsole() {
        function formatLog(args) {
          if (!args || args.length === 0) return

          return args.map(item => {
            const singleLog = {type: typeof item}

            typeof item === 'object' ? singleLog.data = JSON.stringify(item): singleLog.data = item
            return singleLog
          })
        }

        const _this = this
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
              nativeConsole.error(...text);
              _this.logList.push({
                type: 'error',
                data:formatLog(text)
              })
              _this.amount.error += 1
              _this.$emit('logAmount', _this.amount)
            }
          };
        })(window.console)
      },
    },
    created() {
      this.overrideConsole()
      this.$bus.on.clearLogs( () => {
        this.logList = []
        this.amount = {
          warn: 0,
          error: 0
        }
        this.$emit('logAmount', this.amount)
      })
      console.log('begin', 12312)
      console.info(this.logList)
      console.debug(this.logList)
      console.warn(this.logList)
      console.error(this.logList)
      setInterval(() => {
        console.log('文本', {bar: {child: 'xxxxxxx', barNum: 666}, cool: 'haha', numbers: 1}, new Date())
        console.warn('xxxx warn xxxx')
      }, 5000)
    }
  }
</script>

<style lang="scss">
    .log-widget {
        > ul {
            word-break: break-all;
            li {
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
        .log-chunk {
            margin: 0 3px;

            &.number {
                color: #a967e9;
            }
            &.string {
                color: #e1e1e1;
            }
            &.object {

            }
        }

    }
</style>