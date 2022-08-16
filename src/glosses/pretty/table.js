const {
  is,
  cli,
  error
} = ateos;

const percentRegexp = /^(\d{1,3}(?:.\d+)?)%$/;

const coercePercent = (percent, total) => {
  const match = percent.match(percentRegexp);
  if (ateos.isNull(match)) {
    throw new error.InvalidArgumentException(`Invalid percent value: ${percent}`);
  }
  const value = parseFloat(match[1]);
  if (value > 100) {
    throw new error.InvalidArgumentException(`Invalid percent value: ${percent}`);
  }
  return Math.floor(value / 100 * total);
};

export default function prettyTable(data, {
  noHeader = false,
  borderless = false,
  model,
  style = {},
  width = null,
  countAnsiEscapeCodes = false
} = {}) {
  // normalize width
  // dont touch if it is a number
  // if it is a string then
  // assume it is a percent value and calculate relative width to the terminal
  let tableWidth = null;
  if (!ateos.isNull(width)) {
    if (ateos.isString(width)) {
      let bordersWidth = 0;
      if (!borderless) {
        // todo: custom chars?
        bordersWidth += 1 + 1; // left + right border
        bordersWidth += model.length - 1; // between cells
      }
      const maxWidth = process.stdout.columns - bordersWidth;
      tableWidth = coercePercent(width, maxWidth);
    } else if (ateos.isNumber(width)) {
      tableWidth = width;
    }
  }

  const padLeft = style["padding-left"] || (borderless ? 0 : 1); // bad, table defaults
  const padRight = style["padding-right"] || (borderless ? 0 : 1);
  const head = [];
  const colAligns = [];
  const map = {};

  let col = 0;
  for (const m of model) {
    !noHeader && head.push(m.header);
    colAligns.push(ateos.isString(m.align) ? m.align : null);
    map[m.id] = ateos.lodash.omit(m, "id");
    map[m.id].col = col++;

    if (m.wordWrap) {
      if (ateos.isString(m.wordWrap)) {
        map[m.id].wordWrap = { mode: m.wordWrap };
      } else if (ateos.isObject(m.wordWrap)) {
        map[m.id].wordWrap = Object.assign({ countAnsiEscapeCodes }, m.wordWrap);
      } else {
        map[m.id].wordWrap = { mode: "soft" };
      }
    }
  }

  // calculate cols widths

  let predefinedWidthCols = 0;
  let remainingWidth = tableWidth;

  // precise value
  for (const m of model) {
    let colWidth = null;
    if (ateos.isNumber(m.width)) {
      colWidth = m.width;
    } else if (!ateos.isNull(tableWidth)) {
      if (ateos.isString(m.width)) {
        colWidth = coercePercent(m.width, tableWidth);
      }
    }
    map[m.id].colWidth = colWidth;

    if (!ateos.isNull(colWidth) && !ateos.isNull(tableWidth)) {
      ++predefinedWidthCols;
      remainingWidth -= colWidth;
    }
  }

  // using maxWidth
  for (const m of model) {
    let maxWidth = null;
    if (m.maxWidth) {
      if (ateos.isNumber(m.maxWidth)) {
        maxWidth = m.maxWidth;
      } else if (!ateos.isNull(tableWidth) && ateos.isString(m.maxWidth)) {
        maxWidth = coercePercent(m.maxWidth, tableWidth);
      }
    }
    if (ateos.isNull(maxWidth)) {
      map[m.id].maxWidth = null;
      continue;
    }

    const colWidth = data.reduce((x, y) => {
      const v = y[m.id];
      const l = ateos.isNil(v) ? 0 : (countAnsiEscapeCodes ? v.toString() : ateos.text.stripAnsi(v.toString())).length + padLeft + padRight;
      return Math.max(x, l);
    }, 0);

    map[m.id].maxWidth = Math.min(colWidth, maxWidth);
  }

  if (!ateos.isNull(tableWidth)) {
    let colSize = Math.floor(remainingWidth / (model.length - predefinedWidthCols));

    for (const m of model) {
      if (ateos.isNull(map[m.id].maxWidth)) {
        continue;
      }
      if (map[m.id].maxWidth < colSize) {
        map[m.id].colWidth = map[m.id].maxWidth;
        ++predefinedWidthCols;
        remainingWidth -= map[m.id].colWidth;
      }
    }

    colSize = Math.floor(remainingWidth / (model.length - predefinedWidthCols));

    for (const m of model) {
      if (!ateos.isNull(map[m.id].colWidth)) {
        continue;
      }
      map[m.id].colWidth = colSize;
    }
  } else {
    for (const m of model) {
      if (ateos.isNull(map[m.id].maxWidth)) {
        continue;
      }
      map[m.id].colWidth = map[m.id].maxWidth;
    }
  }

  const colWidths = model.map(({ id }) => map[id].colWidth);

  let TableClass;
  if (borderless) {
    TableClass = ateos.text.table.BorderlessTable;
  } else {
    TableClass = ateos.text.table.Table;
  }

  const table = new TableClass({ head, colAligns, colWidths, style });

  for (const item of data) {
    const row = new Array(model.length).fill(null);
    for (const [key, val] of Object.entries(item)) {
      if (ateos.isPlainObject(map[key])) {
        const m = map[key];
        const style = m.style;
        const styleType = ateos.typeOf(style);
        const formatType = ateos.typeOf(m.format);
        let str;
        if (ateos.isFunction(m.handle)) {
          str = m.handle(item);
        } else {
          switch (formatType) {
            case "string": {
              str = ateos.sprintf(m.format, val);
              break;
            }
            case "function": {
              str = m.format(val, item);
              break;
            }
            default: {
              str = val;
            }
          }
          switch (styleType) {
            case "string": {
              str = `${style}${str}{/}`;
              break;
            }
            case "function": {
              str = `${style(val, str)}${str}{/}`;
              break;
            }
          }
        }

        str = cli.parse(str);
        if (str && m.wordWrap && !ateos.isNull(m.colWidth)) {
          str = str.toString();
          const maxLen = m.colWidth - padLeft - padRight;
          if (m.colWidth && str.length > maxLen) {
            str = ateos.text.wrapAnsi(str, maxLen, {
              wordWrap: m.wordWrap
            });
          }
        }

        row[m.col] = str;
      }
    }
    table.push(row);
  }

  return table.toString();
}
