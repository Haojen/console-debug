import * as tool from './common'

export default function getFoldedLine(obj, outer) {
  let that = this;
  if (!outer) {
    let json = tool.JSONStringify(obj);
    let preview = json.substr(0, 26);
    outer = tool.getObjName(obj);
    if (json.length > 26) {
      preview += '...';
    }
    outer += ' ' + preview;
  }
  let $line = $.render(tplFold, {
    outer: outer,
    lineType: 'obj'
  });
  $.bind($.one('.vc-fold-outer', $line), 'click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    if ($.hasClass($line, 'vc-toggle')) {
      $.removeClass($line, 'vc-toggle');
      $.removeClass($.one('.vc-fold-inner', $line), 'vc-toggle');
      $.removeClass($.one('.vc-fold-outer', $line), 'vc-toggle');
    } else {
      $.addClass($line, 'vc-toggle');
      $.addClass($.one('.vc-fold-inner', $line), 'vc-toggle');
      $.addClass($.one('.vc-fold-outer', $line), 'vc-toggle');
    }
    let $content = $.one('.vc-fold-inner', $line);
    setTimeout(function () {
      if ($content.children.length == 0 && !!obj) {
        // render object's keys
        let keys = tool.getObjAllKeys(obj);
        for (let i = 0; i < keys.length; i++) {
          let val,
            valueType = 'undefined',
            keyType = '';
          try {
            val = obj[keys[i]];
          } catch (e) {
            continue;
          }
          // handle value
          if (tool.isString(val)) {
            valueType = 'string';
            val = '"' + val + '"';
          } else if (tool.isNumber(val)) {
            valueType = 'number';
          } else if (tool.isBoolean(val)) {
            valueType = 'boolean';
          } else if (tool.isNull(val)) {
            valueType = 'null';
            val = 'null';
          } else if (tool.isUndefined(val)) {
            valueType = 'undefined';
            val = 'undefined';
          } else if (tool.isFunction(val)) {
            valueType = 'function';
            val = 'function()';
          } else if (tool.isSymbol(val)) {
            valueType = 'symbol';
          }
          // render
          let $sub;
          if (tool.isArray(val)) {
            let name = tool.getObjName(val) + '[' + val.length + ']';
            $sub = that.getFoldedLine(val, $.render(tplFoldCode, {
              key: keys[i],
              keyType: keyType,
              value: name,
              valueType: 'array'
            }, true));
          } else if (tool.isObject(val)) {
            let name = tool.getObjName(val);
            $sub = that.getFoldedLine(val, $.render(tplFoldCode, {
              key: tool.htmlEncode(keys[i]),
              keyType: keyType,
              value: name,
              valueType: 'object'
            }, true));
          } else {
            if (obj.hasOwnProperty && !obj.hasOwnProperty(keys[i])) {
              keyType = 'private';
            }
            let renderData = {
              lineType: 'kv',
              key: tool.htmlEncode(keys[i]),
              keyType: keyType,
              value: tool.htmlEncode(val),
              valueType: valueType
            };
            $sub = $.render(tplFold, renderData);
          }
          $content.insertAdjacentElement('beforeend', $sub);
        }
        // render object's prototype
        if (tool.isObject(obj)) {
          let proto = obj.__proto__,
            $proto;
          if (tool.isObject(proto)) {
            $proto = that.getFoldedLine(proto, $.render(tplFoldCode, {
              key: '__proto__',
              keyType: 'private',
              value: tool.getObjName(proto),
              valueType: 'object'
            }, true));
          } else {
            // if proto is not an object, it should be `null`
            $proto = $.render(tplFoldCode, {
              key: '__proto__',
              keyType: 'private',
              value: 'null',
              valueType: 'null'
            });
          }
          $content.insertAdjacentElement('beforeend', $proto);
        }
      }
    })
    return false;
  });
  return $line;
}