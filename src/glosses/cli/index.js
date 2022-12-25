const __ = ateos.lazify({
  progress: "cli-progress",
  esc: "./esc",
  Chalk: () => __.chalk.Instance,
  chalk: "chalk",
  chalkify: "chalk-pipe",
  style: "ansi-colors",
  prompts: "enquirer",
  theme: "./theme",
  spinner: "ora",
  ability: "./ability"
}, exports, require);

const _attr = (param, val) => {
  let parts;

  if (ateos.isArray(param)) {
    parts = param;
    param = parts[0] || "normal";
  } else {
    param = param || "normal";
    parts = param.split(/\s*[,;]\s*/);
  }

  if (parts.length > 1) {
    const used = {};
    const out = [];

    parts.forEach((part) => {
      part = _attr(part, val).slice(2, -1);
      if (part === "") {
        return;
      }
      if (used[part]) {
        return;
      }
      used[part] = true;
      out.push(part);
    });

    return `\x1b[${out.join(";")}m`;
  }

  if (param.indexOf("no ") === 0) {
    param = param.substring(3);
    val = false;
  } else if (param.indexOf("!") === 0) {
    param = param.substring(1);
    val = false;
  }

  const { esc } = ateos.cli;
  const color = esc.color;
  const bgColor = esc.bgColor;

  switch (param) {
    // attributes
    case "normal":
    case "default":
      return val === false ? "" : esc.normal.open;
    case "bold":
      return val === false ? esc.bold.close : esc.bold.open;
    case "italic":
      return val === false ? esc.italic.close : esc.italic.open;
    case "dim":
      return val === false ? esc.dim.close : esc.dim.open;
    case "ul":
    case "underline":
      return val === false ? esc.underline.close : esc.underline.open;
    case "blink":
      return val === false ? esc.blink.close : esc.blink.open;
    case "inverse":
      return val === false ? esc.inverse.close : esc.inverse.open;
    case "hidden":
      return val === false ? esc.hidden.close : esc.hidden.open;

    // 8-color foreground
    case "black fg":
      return val === false ? esc.black.close : esc.black.open;
    case "red fg":
      return val === false ? esc.red.close : esc.red.open;
    case "green fg":
      return val === false ? esc.green.close : esc.green.open;
    case "yellow fg":
      return val === false ? esc.yellow.close : esc.yellow.open;
    case "blue fg":
      return val === false ? esc.blue.close : esc.blue.open;
    case "magenta fg":
      return val === false ? esc.magenta.close : esc.magenta.open;
    case "cyan fg":
      return val === false ? esc.cyan.close : esc.cyan.open;
    case "white fg":
      return val === false ? esc.white.close : esc.white.open;
    case "default fg":
      return val === false ? "" : esc.defaultColor.open;

    // 8-color background
    case "black bg":
      return val === false ? esc.bgBlack.close : esc.bgBlack.open;
    case "red bg":
      return val === false ? esc.bgRed.close : esc.bgRed.open;
    case "green bg":
      return val === false ? esc.bgGreen.close : esc.bgGreen.open;
    case "yellow bg":
      return val === false ? esc.bgYellow.close : esc.bgYellow.open;
    case "blue bg":
      return val === false ? esc.bgBlue.close : esc.bgBlue.open;
    case "magenta bg":
      return val === false ? esc.bgMagenta.close : esc.bgMagenta.open;
    case "cyan bg":
      return val === false ? esc.bgCyan.close : esc.bgCyan.open;
    case "white bg":
      return val === false ? esc.bgWhite.close : esc.bgWhite.open;
    case "default bg":
      return val === false ? "" : esc.bgDefaultColor.open;

    // 16-color foreground
    case "brightblack fg":
    case "grey fg":
    case "gray fg":
      return val === false ? esc.gray.close : esc.gray.open;
    case "redbright fg":
      return val === false ? esc.redBright.close : esc.redBright.open;
    case "greenbright fg":
      return val === false ? esc.greenBright.close : esc.greenBright.open;
    case "yellowbright fg":
      return val === false ? esc.yellowBright.close : esc.yellowBright.open;
    case "bluebright fg":
      return val === false ? esc.blueBright.close : esc.blueBright.open;
    case "magentabright fg":
      return val === false ? esc.magentaBright.close : esc.magentaBright.open;
    case "cyanbright fg":
      return val === false ? esc.cyanBright.close : esc.cyanBright.open;
    case "whitebright fg":
      return val === false ? esc.whiteBright.close : esc.whiteBright.open;

    // 16-color background
    case "brightblack bg":
    case "grey bg":
    case "gray bg":
      return val === false ? esc.bgGray.close : esc.bgGray.open;
    case "redbright bg":
      return val === false ? esc.bgRedBright.close : esc.bgRedBright.open;
    case "greenbright bg":
      return val === false ? esc.bgGreenBright.close : esc.bgGreenBright.open;
    case "yellowbright bg":
      return val === false ? esc.bgYellowBright.close : esc.bgYellowBright.open;
    case "bluebright bg":
      return val === false ? esc.bgBlueBright.close : esc.bgBlueBright.open;
    case "magentabright bg":
      return val === false ? esc.bgMagentaBright.close : esc.bgMagentaBright.open;
    case "cyanbright bg":
      return val === false ? esc.bgCyanBright.close : esc.bgCyanBright.open;
    case "whitebright bg":
      return val === false ? esc.bgWhiteBright.close : esc.bgWhiteBright.open;
    // non-16-color rxvt default fg and bg
    case "default fg bg":
      if (val === false) {
        return "";
      }
      return "\x1b[39;49m";
    default: {
      // 256/24bit -color fg and bg
      param = param.toLowerCase();

      let m = /^(#(?:[0-9a-f]{3}){1,2}) (fg|bg)$/.exec(param);
      if (m) {
        if (m[2] === "fg") {
          return color.ansi16m.hex(m[1]);
        }
        if (m[2] === "bg") {
          return bgColor.ansi16m.hex(m[1]);
        }
      }
      m = /^(=|~)([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5]) (fg|bg)$/.exec(param);
      if (m) {
        const colorVal = Number.parseInt(m[2], 10);
        if (m[1] === "=") {
          if (m[3] === "fg") {
            return color.ansi256.rgb(colorVal, colorVal, colorVal);
          }
          if (m[3] === "bg") {
            return bgColor.ansi256.rgb(colorVal, colorVal, colorVal);
          }
        } else if (m[1] === "~") {
          if (m[3] === "fg") {
            return color.ansi16m.rgb(colorVal, colorVal, colorVal);
          }
          if (m[3] === "bg") {
            return bgColor.ansi16m.rgb(colorVal, colorVal, colorVal);
          }
        } else {
          return null;
        }
      }

      if (/^[\d;]*$/.test(param)) {
        return `\x1b[${param}m`;
      }
      return null;
    }
  }
};

export const parse = (text) => {
  if (!/{\/?[\w\-,;!#=~]*}/.test(text)) {
    return text;
  }

  let out = "";
  let state;
  const bg = [];
  const fg = [];
  const flag = [];
  let cap;
  let slash;
  let param;
  let attr;
  let esc;

  for (; ;) {
    if (!esc && (cap = /^{escape}/.exec(text))) {
      text = text.substring(cap[0].length);
      esc = true;
      continue;
    }

    if (esc && (cap = /^([\s\S]*?){\/escape}/.exec(text))) {
      text = text.substring(cap[0].length);
      out += cap[1];
      esc = false;
      continue;
    }

    if (esc) {
      // throw new Error('Unterminated escape tag.');
      out += text;
      break;
    }

    cap = /^{(\/?)([\w\-,;!#=~]*)}/.exec(text);
    if (cap) {
      text = text.substring(cap[0].length);
      slash = cap[1] === "/";
      param = cap[2].replace(/-/g, " ");

      if (param === "open") {
        out += "{";
        continue;
      } else if (param === "close") {
        out += "}";
        continue;
      }

      if (param.slice(-3) === " bg") {
        state = bg;
      } else if (param.slice(-3) === " fg") {
        state = fg;
      } else {
        state = flag;
      }

      if (slash) {
        if (!param) {
          out += _attr("normal");
          bg.length = 0;
          fg.length = 0;
          flag.length = 0;
        } else {
          attr = _attr(param, false);
          if (ateos.isNull(attr)) {
            out += cap[0];
          } else {
            // if (param !== state[state.length - 1]) {
            //   throw new Error('Misnested tags.');
            // }
            state.pop();
            if (state.length) {
              out += _attr(state[state.length - 1]);
            } else {
              out += attr;
            }
          }
        }
      } else {
        if (!param) {
          out += cap[0];
        } else {
          attr = _attr(param);
          if (ateos.isNull(attr)) {
            out += cap[0];
          } else {
            state.push(param);
            out += attr;
          }
        }
      }

      continue;
    }

    cap = /^[\s\S]+?(?={\/?[\w\-,;!#=~]*})/.exec(text);
    if (cap) {
      text = text.substring(cap[0].length);
      out += cap[0];
      continue;
    }

    out += text;
    break;
  }

  return out;
};
