<style lang="scss" scoped>
    #__CONSOLE_DEBUG__ {
        position: fixed;
        overflow: hidden;
        /*border-top-left-radius: 5px;*/
        /*border-top-right-radius: 5px;*/
        top: 0;
        right: 0;

        color: #fff;
        font-size: 14px;
        background-color: rgb(49, 49, 49);

        button {
            outline: none;
            border: none;
            color: #f4f4f2;
            background-color: transparent;
        }

        .top-menu-bar {
            height: 28px;
            border-bottom: 1px solid gray;
            padding-top: 6px;
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

            padding-top: 5px;
            background-color: #4a4a4a;
            border-top: 1px solid gray;
        }
    }

</style>

<template>
    <div id="__CONSOLE_DEBUG__" style="width: 50vw;height: 100vh;">
        <header class="top-menu-bar">
            <nav>
                <button>Close</button>
                <button>全屏</button>
                <button>Logs</button>
                <button>Setting</button>
            </nav>
        </header>
        <div class="content" v-html="log"></div>
        <footer class="footer-menu-bar">
            <button class="clear-icon" @click="onClearLogEv">Clear</button>
            <button class="search-icon">Search</button>
            <button class="search-icon">Filter</button>
        </footer>
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
                counter: 0,
                temp: null,
                objectId: 1
            }
        },
        methods: {
            formatLogText(args) {
                const _this = this
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
                            nativeConsole.warn(...text);
                            // Your code
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
                        }
                    };
                })(window.console)

            },
            onClearLogEv() {
                this.log = ''
            }
        },
        created() {
            this.overrideConsole()
        },
        mounted() {
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

<style scoped>

</style>
