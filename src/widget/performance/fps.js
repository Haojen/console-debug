(function(i, t) {
    if (typeof define === "function" && define.amd) {
      define([], t)
    } else if (typeof module === "object" && module.exports) {
      module.exports = t()
    } else {
      i.erudaFps = t()
    }
  }
)(this, function() {
  var i = window.innerWidth;
  return function(t) {
    var e = i
      , s = 192
      , a = 12
      , n = 8
      , l = 12
      , h = 40
      , f = i - 24
      , r = 142
      , c = "#fff"
      , o = "#90caf9"
      , _ = 2
      , u = "FPS";
    var p = t.util
      , d = Math.round
      , v = t.config
      , m = t.Tool;
    var g = m.extend({
      name: "fps",
      init: function(i, t) {
        this.callSuper(m, "init", arguments);
        this._style = p.evalCss([".eruda-fps {padding: 10px !important;}", "canvas {width: 100%; border-radius: 4px; box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.05), 0 1px 4px 0 rgba(0, 0, 0, 0.08), 0 3px 1px -2px rgba(0, 0, 0, 0.2);}"].join(".eruda-fps "));
        this._isRunning = false;
        this._beginTime = p.now();
        this._prevTime = this._beginTime;
        this._frames = 0;
        this._min = Infinity;
        this._max = 0;
        this._alwaysActivated = true;
        this._appendTpl();
        this._initCanvas();
        this._initCfg(t)
      },
      show: function() {
        this._start();
        this.callSuper(m, "show", arguments)
      },
      hide: function() {
        if (!this._alwaysActivated)
          this._stop();
        this.callSuper(m, "hide", arguments)
      },
      destroy: function() {
        this._stop();
        p.evalCss.remove(this._style);
        this.callSuper(m, "destroy", arguments)
      },
      _start: function() {
        if (this._isRunning)
          return;
        var i = this;
        this._isRunning = true;
        function t() {
          if (!i._isRunning)
            return;
          i._update();
          requestAnimationFrame(t)
        }
        t()
      },
      _stop: function() {
        this._isRunning = false;
        this._beginTime = p.now();
        this._prevTime = this._beginTime;
        this._frames = 0
      },
      _appendTpl: function() {
        this._$el.html("<canvas></canvas>");
        this._canvas = this._$el.find("canvas").get(0);
        this._ctx = this._canvas.getContext("2d")
      },
      _initCanvas: function() {
        var i = this._canvas
          , t = this._ctx;
        i.width = e;
        i.height = s;
        t.font = "bold 18px Helvetica,Arial,sans-serif";
        t.textBaseline = "top";
        t.fillStyle = c;
        t.fillRect(0, 0, e, s);
        t.fillStyle = o;
        t.fillText(u, a, n);
        t.fillRect(l, h, f, r);
        t.fillStyle = c;
        t.globalAlpha = .9;
        t.fillRect(l, h, f, r)
      },
      _initCfg: function(i) {
        var t = this.config = v.create("eruda-fps", {
          alwaysActivated: true
        });
        if (!t.get("alwaysActivated"))
          this._alwaysActivated = false;
        var e = this;
        t.on("change", function(i, t) {
          switch (i) {
            case "alwaysActivated":
              e._alwaysActivated = t;
              return
          }
        });
        var s = i.get("settings");
        s.text("Fps").switch(t, "alwaysActivated", "Always Activated").separator()
      },
      _update: function() {
        this._frames++;
        var i = this._prevTime
          , t = p.now();
        if (t > i + 1e3) {
          this._draw(this._frames * 1e3 / (t - i), 100);
          this._prevTime = t;
          this._frames = 0
        }
        this._beginTime = t
      },
      _draw: function(i, t) {
        this._min = Math.min(this._min, i);
        this._max = Math.max(this._max, i);
        var s = this._min
          , p = this._max
          , v = this._canvas
          , m = this._ctx;
        m.fillStyle = c;
        m.globalAlpha = 1;
        m.fillRect(0, 0, e, h);
        m.fillStyle = o;
        m.fillText(d(i) + "" + u + " (" + d(s) + "-" + d(p) + ")", a, n);
        m.drawImage(v, l + _, h, f - _, r, l, h, f - _, r);
        m.fillRect(l + f - _, h, _, r);
        m.fillStyle = c;
        m.globalAlpha = .9;
        m.fillRect(l + f - _, h, _, d((1 - i / t) * r))
      }
    });
    return new g
  }
});
