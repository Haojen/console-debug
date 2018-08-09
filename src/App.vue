<style lang="scss" scoped>
    @font-face {
        font-family: 'iconfont';  /* project id 757844 */
        src: url('//at.alicdn.com/t/font_757844_ief7xr2ovtm.eot');
        src: url('//at.alicdn.com/t/font_757844_ief7xr2ovtm.eot?#iefix') format('embedded-opentype'),
        url('//at.alicdn.com/t/font_757844_ief7xr2ovtm.woff') format('woff'),
        url('//at.alicdn.com/t/font_757844_ief7xr2ovtm.ttf') format('truetype'),
        url('//at.alicdn.com/t/font_757844_ief7xr2ovtm.svg#iconfont') format('svg');
    }
    #__CONSOLE_DEBUG__ {
        font-family: sans-serif,'iconfont';
        .console-panel {
            position: fixed;
            overflow: hidden;
            z-index: 999999;
            /*border-top-left-radius: 5px;*/
            /*border-top-right-radius: 5px;*/
            top: 0;
            right: 0;
            color: #fff;
            font-size: 14px;
            background-color: rgba(49, 49, 49, 0.9);
            transition: width, height, 400ms;
            &.full-screen {
                width: 100vw;
                height: 100vh;
            }
            &.default-screen {
                width: 40vw;
                height: 50vh;
            }
        }
        button {
            outline: none;
            border: none;
            color: #f4f4f2;
            background-color: transparent;
        }
        .console-trigger {
            /*会做成可配置项*/
            position: fixed;
            top: 0;
            right: 0;
            width: 25px;
            height: 25px;
            cursor: default;
            z-index: 999999;
        }
        .trigger-minimize {
            position: fixed;
            top: -55px;
            right: -55px;
            z-index: 999999;
            width: 100px;
            height: 100px;
            cursor: pointer;
            border-radius: 50%;
            background-color: rgba(0,0,0,.25);
            span {
                position: absolute;
                top: 64px;
                left: 20px;
            }
        }
        .top-menu-bar {
            height: 28px;
            border-bottom: 1px solid gray;
            padding-top: 6px;
            .right-bar {
                margin-right: 10px;
                button {
                    width: 15px;
                    height: 15px;
                    padding: 0;
                    margin-right: 5px;
                    border-radius: 50%;
                }
            }
        }
        .content {
            height: 100%;
            width: 100%;
            padding: 10px;
            overflow-y: auto;
            overflow-x: hidden;
            -webkit-overflow-scrolling: touch;
            padding-bottom: 50px;
        }
        .footer-menu-bar {
            position: absolute;
            left: 0;
            bottom: 0;
            height: 28px;
            width: 100%;
            padding: 0;
            font-size: 13px;
            padding-top: 5px;
            background-color: #4a4a4a;
            border-top: 1px solid gray;
            padding-left: 10px;
            button {
                padding-left: 0px;
            }
        }
    }
</style>

<template>
    <div id="__CONSOLE_DEBUG__">
        <button v-if="!minimize" class="console-trigger" ref="consoleTrigger"></button>
        <button v-else class="console-trigger trigger-minimize" @click="onShowControlPanel"><span>&#xe61b;</span></button>
        <div class="console-panel" v-show="controlPanelDisplayState" :class="consoleClassState">
            <header class="top-menu-bar">
                <nav>
                    <div style="float: right" class="right-bar">
                        <button @click="onFullscreenEv" style="background-color: limegreen; color: #259525">&#xe7ef;</button>
                        <button @click="onCloseConsolePanelEv" style="background-color: #ff1131;color: #8a0b1c">&#xe600;</button>
                        <button @click="onMinimizeEv" style="background-color: #ffd200; color: #917800">&#xe62b;</button>
                    </div>
                    <button @click="onRefreshEv"><span>&#xe62c;</span></button>
                    <!--<button><span>&#xe657;</span></button>-->
                    <button @click="onSwitchConsolePanelEv">Console</button>
                    <button @click="onSwitchNetworkPanelEv">Network</button>
                </nav>
            </header>
            <div class="content">
                <div v-show="panelType === 'log'" v-html="log"></div>
                <div v-show="panelType === 'network'">
                    network
                </div>
            </div>
            <footer class="footer-menu-bar">
                <button class="clear-icon" @click="onClearLogEv"><span>&#xe64a;</span></button>
                <span><span style="color: red;">&#xe632; </span><span v-text="errorNumber"></span></span>
                <span><span style="color: #ecb92b">&#xe686; </span><span v-text="warningNumber"></span></span>
                <!--<button class="search-icon"><span>&#xe629;</span></button>-->
                <!--<button class="filter-icon"><span>&#xe65e;</span></button>-->
            </footer>
        </div>
    </div>
</template>

<script>
  export default {
    name: "consolog",
    props: {
    },
    data() {
      return {
        log: '',
        panelType: 'log',
        minimize: false,
        errorNumber: 0,
        warningNumber: 0,
        controlPanelDisplayState: false,
        // temp var
        counter: 0,
        temp: null,
        consoleClassState: 'default-screen'
      }
    },
    methods: {
      formatLogText(args) {
        if (!args || args.length === 0) return
        let html = ''
        args.forEach(item => {
          if (typeof item === 'object') {
            html += `<span style="color: #f4f4f2;">${ JSON.stringify(item) }</span>`
          }
          if (typeof item === 'number') {
            html += `<span style="color: rgb(152, 128, 251);"> ${item} </span>`
          }
          if (typeof item === 'string') {
            html += `<span> ${item} </span>`
          }
        })
        return html
      },
      onRefreshEv() {
        window.location.reload()
      },
      onSwitchConsolePanelEv() {
        this.panelType = 'log'
      },
      onSwitchNetworkPanelEv() {
        this.panelType = 'network'
      },
      overrideConsole() {
        const _this = this
        window.console = ((nativeConsole) =>{
          return {
            log: function(...text){
              _this.temp = text
              nativeConsole.log(...text);
              const logStringHtml = _this.formatLogText(text)
              const ParagraphStyle = `
                               width: 100%;
                               margin-bottom: 10px;
                               word-break: break-all;
                               word-wrap: break-word;
                               border-bottom: 1px solid rgba(255,255,255,0.05)
                           `
              const TagStyle = `
                               border-radius: 3px;
                               padding: 1px 5px;
                               background-color: dodgerblue;
                           `
              // ${JSON.stringify(text)}
              _this.log += `<p class="log-info" style="${ParagraphStyle}">
                                            <span class="log-info-tag" style="${TagStyle}">info</span>
                                                ${logStringHtml}
                                            </p>`
              // Your code
            },
            info: function (...text) {
              nativeConsole.info(...text);
              // Your code
            },
            debug: function (...text) {
              _this.temp = text
              nativeConsole.log(...text);
              const logStringHtml = _this.formatLogText(text)
              const ParagraphStyle = `
                               width: 100%;
                               margin-bottom: 10px;
                               word-break: break-all;
                               word-wrap: break-word;
                               border-bottom: 1px solid rgba(255,255,255,0.05)
                           `
              const TagStyle = `
                               border-radius: 3px;
                               padding: 1px 5px;
                               background-color: #2bcb06;
                           `
              // ${JSON.stringify(text)}
              _this.log += `<p class="log-info" style="${ParagraphStyle}">
                                            <span class="log-info-tag" style="${TagStyle}">debug</span>
                                                ${logStringHtml}
                                            </p>`
            },
            warn: function (...text) {
              nativeConsole.warn(...text)
              _this.warningNumber += 1
            },
            error: function (...text) {
              nativeConsole.error(...text);
              const ParagraphStyle = `
                               width: 100%;
                               margin-bottom: 10px;
                               word-break: break-all;
                               word-wrap: break-word;
                               border-bottom: 1px solid rgba(255,255,255,0.1)
                           `
              const TagStyle = `
                               border-radius: 3px;
                               padding: 1px 5px;
                               background-color: red;
                           `
              _this.log += `<p class="log-info" style="${ParagraphStyle}">
                                            <span class="log-info-tag" style="${TagStyle}">error</span>
                                                ${JSON.stringify(text)}
                                         </p>`
              _this.errorNumber += 1
            }
          };
        })(window.console)
      },
      onClearLogEv() {
        this.log = ''
        this.errorNumber = 0
        this.warningNumber = 0
      },
      onCloseConsolePanelEv(){
        this.minimize = false
        this.controlPanelDisplayState = false
      },
      onShowControlPanel() {
        this.controlPanelDisplayState = true
      },
      onMinimizeEv() {
        this.onCloseConsolePanelEv()
        this.minimize = true
      },
      onFullscreenEv(){
        this.consoleClassState = this.consoleClassState === 'default-screen'? 'full-screen':  'default-screen'
      }
    },
    created() {
      this.overrideConsole()
    },
    mounted() {
      // 多点触控
      // let touchNumber = 0, event = 'ontouchend' in document ? 'touchend' : 'click'
      // We create a manager object, which is the same as Hammer(), but without the presetted recognizers.
      // const  mc = new Hammer.Manager(this.$refs.consoleTrigger)
      // mc.add(new Hammer.Tap())
      // mc.add(new Hammer.Tap({ event: 'quadrupletap', taps: 4 }))
      // mc.get('quadrupletap').recognizeWith('tap')
      // mc.on("quadrupletap", ev => {
      //   this.controlPanelDisplayState = true
      // })
      this.controlPanelDisplayState = true
      const _this = this
      setInterval(() => {
          console.log('文本', {foo: _this.counter, bar: {child: 'xxxxxxx', barNum: 666}, cool: 'haha', numbers: 1}, _this.counter)
          this.formatLogText(this.temp)
          _this.counter += 1
          console.debug('hahahah')
      }, 10000)
    }
  }
</script>