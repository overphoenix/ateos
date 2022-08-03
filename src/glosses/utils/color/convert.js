const {
  is,
  util: {
    color: {
      name
    }
  }
} = ateos;

// NOTE: conversions should only return primitive values (i.e. arrays, or
//       values that give correct `typeof` results).
//       do not use box values types (i.e. Number(), String(), etc.)

const reverseKeywords = {};
for (const key of Object.keys(name)) {
  reverseKeywords[name[key]] = key;
}

const conversions = {
  rgb: { channels: 3, labels: "rgb" },
  hsl: { channels: 3, labels: "hsl" },
  hsv: { channels: 3, labels: "hsv" },
  hwb: { channels: 3, labels: "hwb" },
  cmyk: { channels: 4, labels: "cmyk" },
  xyz: { channels: 3, labels: "xyz" },
  lab: { channels: 3, labels: "lab" },
  lch: { channels: 3, labels: "lch" },
  hex: { channels: 1, labels: ["hex"] },
  keyword: { channels: 1, labels: ["keyword"] },
  ansi16: { channels: 1, labels: ["ansi16"] },
  ansi256: { channels: 1, labels: ["ansi256"] },
  hcg: { channels: 3, labels: ["h", "c", "g"] },
  apple: { channels: 3, labels: ["r16", "g16", "b16"] },
  gray: { channels: 1, labels: ["gray"] }
};

// hide .channels and .labels properties
for (const model in conversions) {
  if (conversions.hasOwnProperty(model)) {
    if (!("channels" in conversions[model])) {
      throw new Error(`missing channels property: ${model}`);
    }

    if (!("labels" in conversions[model])) {
      throw new Error(`missing channel labels property: ${model}`);
    }

    if (conversions[model].labels.length !== conversions[model].channels) {
      throw new Error(`channel and label counts mismatch: ${model}`);
    }

    const channels = conversions[model].channels;
    const labels = conversions[model].labels;
    delete conversions[model].channels;
    delete conversions[model].labels;
    Object.defineProperty(conversions[model], "channels", { value: channels });
    Object.defineProperty(conversions[model], "labels", { value: labels });
  }
}

conversions.rgb.hsl = function (rgb) {
  const r = rgb[0] / 255;
  const g = rgb[1] / 255;
  const b = rgb[2] / 255;
  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);
  const delta = max - min;
  let h;
  let s;

  if (max === min) {
    h = 0;
  } else if (r === max) {
    h = (g - b) / delta;
  } else if (g === max) {
    h = 2 + (b - r) / delta;
  } else if (b === max) {
    h = 4 + (r - g) / delta;
  }

  h = Math.min(h * 60, 360);

  if (h < 0) {
    h += 360;
  }

  const l = (min + max) / 2;

  if (max === min) {
    s = 0;
  } else if (l <= 0.5) {
    s = delta / (max + min);
  } else {
    s = delta / (2 - max - min);
  }

  return [h, s * 100, l * 100];
};

conversions.rgb.hsv = function (rgb) {
  const r = rgb[0];
  const g = rgb[1];
  const b = rgb[2];
  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);
  const delta = max - min;
  let h;
  let s;

  if (max === 0) {
    s = 0;
  } else {
    s = (delta / max * 1000) / 10;
  }

  if (max === min) {
    h = 0;
  } else if (r === max) {
    h = (g - b) / delta;
  } else if (g === max) {
    h = 2 + (b - r) / delta;
  } else if (b === max) {
    h = 4 + (r - g) / delta;
  }

  h = Math.min(h * 60, 360);

  if (h < 0) {
    h += 360;
  }

  const v = ((max / 255) * 1000) / 10;

  return [h, s, v];
};

conversions.rgb.hwb = function (rgb) {
  const r = rgb[0];
  const g = rgb[1];
  let b = rgb[2];
  const h = conversions.rgb.hsl(rgb)[0];
  const w = 1 / 255 * Math.min(r, Math.min(g, b));

  b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));

  return [h, w * 100, b * 100];
};

conversions.rgb.cmyk = function (rgb) {
  const r = rgb[0] / 255;
  const g = rgb[1] / 255;
  const b = rgb[2] / 255;

  const k = Math.min(1 - r, 1 - g, 1 - b);
  const c = (1 - r - k) / (1 - k) || 0;
  const m = (1 - g - k) / (1 - k) || 0;
  const y = (1 - b - k) / (1 - k) || 0;

  return [c * 100, m * 100, y * 100, k * 100];
};

/**
 * See https://en.m.wikipedia.org/wiki/Euclidean_distance#Squared_Euclidean_distance
 * */
const comparativeDistance = (x, y) => {
  return (
    Math.pow(x[0] - y[0], 2) +
		Math.pow(x[1] - y[1], 2) +
		Math.pow(x[2] - y[2], 2)
  );
};

conversions.rgb.keyword = function (rgb) {
  const reversed = reverseKeywords[rgb];
  if (reversed) {
    return reversed;
  }

  let currentClosestDistance = Infinity;
  let currentClosestKeyword;

  for (const keyword in name) {
    if (name.hasOwnProperty(keyword)) {
      const value = name[keyword];

      // Compute comparative distance
      const distance = comparativeDistance(rgb, value);

      // Check if its less, if so set as closest
      if (distance < currentClosestDistance) {
        currentClosestDistance = distance;
        currentClosestKeyword = keyword;
      }
    }
  }

  return currentClosestKeyword;
};

conversions.keyword.rgb = function (keyword) {
  return name[keyword];
};

conversions.rgb.xyz = function (rgb) {
  let r = rgb[0] / 255;
  let g = rgb[1] / 255;
  let b = rgb[2] / 255;

  // assume sRGB
  r = r > 0.04045 ? Math.pow(((r + 0.055) / 1.055), 2.4) : (r / 12.92);
  g = g > 0.04045 ? Math.pow(((g + 0.055) / 1.055), 2.4) : (g / 12.92);
  b = b > 0.04045 ? Math.pow(((b + 0.055) / 1.055), 2.4) : (b / 12.92);

  const x = (r * 0.4124) + (g * 0.3576) + (b * 0.1805);
  const y = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
  const z = (r * 0.0193) + (g * 0.1192) + (b * 0.9505);

  return [x * 100, y * 100, z * 100];
};

conversions.rgb.lab = function (rgb) {
  const xyz = conversions.rgb.xyz(rgb);
  let x = xyz[0];
  let y = xyz[1];
  let z = xyz[2];

  x /= 95.047;
  y /= 100;
  z /= 108.883;

  x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);
  y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);
  z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);

  const l = (116 * y) - 16;
  const a = 500 * (x - y);
  const b = 200 * (y - z);

  return [l, a, b];
};

conversions.hsl.rgb = function (hsl) {
  const h = hsl[0] / 360;
  const s = hsl[1] / 100;
  const l = hsl[2] / 100;
  let t2;
  let t3;
  let val;

  if (s === 0) {
    val = l * 255;
    return [val, val, val];
  }

  if (l < 0.5) {
    t2 = l * (1 + s);
  } else {
    t2 = l + s - l * s;
  }

  const t1 = 2 * l - t2;

  const rgb = [0, 0, 0];
  for (let i = 0; i < 3; i++) {
    t3 = h + 1 / 3 * -(i - 1);
    if (t3 < 0) {
      t3++;
    }
    if (t3 > 1) {
      t3--;
    }

    if (6 * t3 < 1) {
      val = t1 + (t2 - t1) * 6 * t3;
    } else if (2 * t3 < 1) {
      val = t2;
    } else if (3 * t3 < 2) {
      val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
    } else {
      val = t1;
    }

    rgb[i] = val * 255;
  }

  return rgb;
};

conversions.hsl.hsv = function (hsl) {
  const h = hsl[0];
  let s = hsl[1] / 100;
  let l = hsl[2] / 100;
  let smin = s;
  const lmin = Math.max(l, 0.01);

  l *= 2;
  s *= (l <= 1) ? l : 2 - l;
  smin *= lmin <= 1 ? lmin : 2 - lmin;
  const v = (l + s) / 2;
  const sv = l === 0 ? (2 * smin) / (lmin + smin) : (2 * s) / (l + s);

  return [h, sv * 100, v * 100];
};

conversions.hsv.rgb = function (hsv) {
  const h = hsv[0] / 60;
  const s = hsv[1] / 100;
  let v = hsv[2] / 100;
  const hi = Math.floor(h) % 6;

  const f = h - Math.floor(h);
  const p = 255 * v * (1 - s);
  const q = 255 * v * (1 - (s * f));
  const t = 255 * v * (1 - (s * (1 - f)));
  v *= 255;

  switch (hi) {
    case 0:
      return [v, t, p];
    case 1:
      return [q, v, p];
    case 2:
      return [p, v, t];
    case 3:
      return [p, q, v];
    case 4:
      return [t, p, v];
    case 5:
      return [v, p, q];
  }
};

conversions.hsv.hsl = function (hsv) {
  const h = hsv[0];
  const s = hsv[1] / 100;
  const v = hsv[2] / 100;
  const vmin = Math.max(v, 0.01);
  let sl;
  let l;

  l = (2 - s) * v;
  const lmin = (2 - s) * vmin;
  sl = s * vmin;
  sl /= (lmin <= 1) ? lmin : 2 - lmin;
  sl = sl || 0;
  l /= 2;

  return [h, sl * 100, l * 100];
};

// http://dev.w3.org/csswg/css-color/#hwb-to-rgb
conversions.hwb.rgb = function (hwb) {
  const h = hwb[0] / 360;
  let wh = hwb[1] / 100;
  let bl = hwb[2] / 100;
  const ratio = wh + bl;
  let f;

  // wh + bl cant be > 1
  if (ratio > 1) {
    wh /= ratio;
    bl /= ratio;
  }

  const i = Math.floor(6 * h);
  const v = 1 - bl;
  f = 6 * h - i;

  if ((i & 0x01) !== 0) {
    f = 1 - f;
  }

  const n = wh + f * (v - wh); // linear interpolation

  let r;
  let g;
  let b;
  switch (i) {
    default:
    case 6:
    case 0: r = v; g = n; b = wh; break;
    case 1: r = n; g = v; b = wh; break;
    case 2: r = wh; g = v; b = n; break;
    case 3: r = wh; g = n; b = v; break;
    case 4: r = n; g = wh; b = v; break;
    case 5: r = v; g = wh; b = n; break;
  }

  return [r * 255, g * 255, b * 255];
};

conversions.cmyk.rgb = function (cmyk) {
  const c = cmyk[0] / 100;
  const m = cmyk[1] / 100;
  const y = cmyk[2] / 100;
  const k = cmyk[3] / 100;

  const r = 1 - Math.min(1, c * (1 - k) + k);
  const g = 1 - Math.min(1, m * (1 - k) + k);
  const b = 1 - Math.min(1, y * (1 - k) + k);

  return [r * 255, g * 255, b * 255];
};

conversions.xyz.rgb = function (xyz) {
  const x = xyz[0] / 100;
  const y = xyz[1] / 100;
  const z = xyz[2] / 100;
  let r;
  let g;
  let b;

  r = (x * 3.2406) + (y * -1.5372) + (z * -0.4986);
  g = (x * -0.9689) + (y * 1.8758) + (z * 0.0415);
  b = (x * 0.0557) + (y * -0.2040) + (z * 1.0570);

  // assume sRGB
  r = r > 0.0031308
    ? ((1.055 * Math.pow(r, 1.0 / 2.4)) - 0.055)
    : r * 12.92;

  g = g > 0.0031308
    ? ((1.055 * Math.pow(g, 1.0 / 2.4)) - 0.055)
    : g * 12.92;

  b = b > 0.0031308
    ? ((1.055 * Math.pow(b, 1.0 / 2.4)) - 0.055)
    : b * 12.92;

  r = Math.min(Math.max(0, r), 1);
  g = Math.min(Math.max(0, g), 1);
  b = Math.min(Math.max(0, b), 1);

  return [r * 255, g * 255, b * 255];
};

conversions.xyz.lab = function (xyz) {
  let x = xyz[0];
  let y = xyz[1];
  let z = xyz[2];

  x /= 95.047;
  y /= 100;
  z /= 108.883;

  x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);
  y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);
  z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);

  const l = (116 * y) - 16;
  const a = 500 * (x - y);
  const b = 200 * (y - z);

  return [l, a, b];
};

conversions.lab.xyz = function (lab) {
  const l = lab[0];
  const a = lab[1];
  const b = lab[2];
  let x;
  let y;
  let z;

  y = (l + 16) / 116;
  x = a / 500 + y;
  z = y - b / 200;

  const y2 = Math.pow(y, 3);
  const x2 = Math.pow(x, 3);
  const z2 = Math.pow(z, 3);
  y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787;
  x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787;
  z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787;

  x *= 95.047;
  y *= 100;
  z *= 108.883;

  return [x, y, z];
};

conversions.lab.lch = function (lab) {
  const l = lab[0];
  const a = lab[1];
  const b = lab[2];
  let h;

  const hr = Math.atan2(b, a);
  h = hr * 360 / 2 / Math.PI;

  if (h < 0) {
    h += 360;
  }

  const c = Math.sqrt(a * a + b * b);

  return [l, c, h];
};

conversions.lch.lab = function (lch) {
  const l = lch[0];
  const c = lch[1];
  const h = lch[2];

  const hr = h / 360 * 2 * Math.PI;
  const a = c * Math.cos(hr);
  const b = c * Math.sin(hr);

  return [l, a, b];
};

conversions.rgb.ansi16 = function (args, value = ateos.null) {
  const r = args[0];
  const g = args[1];
  const b = args[2];
  value = value !== ateos.null ? value : conversions.rgb.hsv(args)[2]; // hsv -> ansi16 optimization

  value = Math.round(value / 50);

  if (value === 0) {
    return 30;
  }

  let ansi = 30
		+ ((Math.round(b / 255) << 2)
		| (Math.round(g / 255) << 1)
		| Math.round(r / 255));

  if (value === 2) {
    ansi += 60;
  }

  return ansi;
};

conversions.hsv.ansi16 = function (args) {
  // optimization here; we already know the value and don't need to get
  // it converted for us.
  return conversions.rgb.ansi16(conversions.hsv.rgb(args), args[2]);
};

conversions.rgb.ansi256 = function (args) {
  const r = args[0];
  const g = args[1];
  const b = args[2];

  // we use the extended greyscale palette here, with the error of
  // black and white. normal palette only has 4 greyscale shades.
  if (r === g && g === b) {
    if (r < 8) {
      return 16;
    }

    if (r > 248) {
      return 231;
    }

    return Math.round(((r - 8) / 247) * 24) + 232;
  }

  const ansi = 16
		+ (36 * Math.round(r / 255 * 5))
		+ (6 * Math.round(g / 255 * 5))
		+ Math.round(b / 255 * 5);

  return ansi;
};

conversions.ansi16.rgb = function (args) {
  let color = args % 10;

  // handle greyscale
  if (color === 0 || color === 7) {
    if (args > 50) {
      color += 3.5;
    }

    color = color / 10.5 * 255;

    return [color, color, color];
  }

  const mult = (~~(args > 50) + 1) * 0.5;
  const r = ((color & 1) * mult) * 255;
  const g = (((color >> 1) & 1) * mult) * 255;
  const b = (((color >> 2) & 1) * mult) * 255;

  return [r, g, b];
};

conversions.ansi256.rgb = function (args) {
  // handle greyscale
  if (args >= 232) {
    const c = (args - 232) * 10 + 8;
    return [c, c, c];
  }

  args -= 16;

  let rem;
  const r = Math.floor(args / 36) / 5 * 255;
  const g = Math.floor((rem = args % 36) / 6) / 5 * 255;
  const b = (rem % 6) / 5 * 255;

  return [r, g, b];
};

conversions.rgb.hex = function (args) {
  const integer = ((Math.round(args[0]) & 0xFF) << 16)
		+ ((Math.round(args[1]) & 0xFF) << 8)
		+ (Math.round(args[2]) & 0xFF);

  const string = integer.toString(16).toUpperCase();
  return "000000".substring(string.length) + string;
};

conversions.hex.rgb = function (args) {
  const match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
  if (!match) {
    return [0, 0, 0];
  }

  let colorString = match[0];

  if (match[0].length === 3) {
    colorString = colorString.split("").map((char) => {
      return char + char;
    }).join("");
  }

  const integer = parseInt(colorString, 16);
  const r = (integer >> 16) & 0xFF;
  const g = (integer >> 8) & 0xFF;
  const b = integer & 0xFF;

  return [r, g, b];
};

conversions.rgb.hcg = function (rgb) {
  const r = rgb[0] / 255;
  const g = rgb[1] / 255;
  const b = rgb[2] / 255;
  const max = Math.max(Math.max(r, g), b);
  const min = Math.min(Math.min(r, g), b);
  const chroma = (max - min);
  let grayscale;
  let hue;

  if (chroma < 1) {
    grayscale = min / (1 - chroma);
  } else {
    grayscale = 0;
  }

  if (chroma <= 0) {
    hue = 0;
  } else
  if (max === r) {
    hue = ((g - b) / chroma) % 6;
  } else
  if (max === g) {
    hue = 2 + (b - r) / chroma;
  } else {
    hue = 4 + (r - g) / chroma + 4;
  }

  hue /= 6;
  hue %= 1;

  return [hue * 360, chroma * 100, grayscale * 100];
};

conversions.hsl.hcg = function (hsl) {
  const s = hsl[1] / 100;
  const l = hsl[2] / 100;
  let c = 1;
  let f = 0;

  if (l < 0.5) {
    c = 2.0 * s * l;
  } else {
    c = 2.0 * s * (1.0 - l);
  }

  if (c < 1.0) {
    f = (l - 0.5 * c) / (1.0 - c);
  }

  return [hsl[0], c * 100, f * 100];
};

conversions.hsv.hcg = function (hsv) {
  const s = hsv[1] / 100;
  const v = hsv[2] / 100;

  const c = s * v;
  let f = 0;

  if (c < 1.0) {
    f = (v - c) / (1 - c);
  }

  return [hsv[0], c * 100, f * 100];
};

conversions.hcg.rgb = function (hcg) {
  const h = hcg[0] / 360;
  const c = hcg[1] / 100;
  const g = hcg[2] / 100;

  if (c === 0.0) {
    return [g * 255, g * 255, g * 255];
  }

  const pure = [0, 0, 0];
  const hi = (h % 1) * 6;
  const v = hi % 1;
  const w = 1 - v;
  let mg = 0;

  switch (Math.floor(hi)) {
    case 0:
      pure[0] = 1; pure[1] = v; pure[2] = 0; break;
    case 1:
      pure[0] = w; pure[1] = 1; pure[2] = 0; break;
    case 2:
      pure[0] = 0; pure[1] = 1; pure[2] = v; break;
    case 3:
      pure[0] = 0; pure[1] = w; pure[2] = 1; break;
    case 4:
      pure[0] = v; pure[1] = 0; pure[2] = 1; break;
    default:
      pure[0] = 1; pure[1] = 0; pure[2] = w;
  }

  mg = (1.0 - c) * g;

  return [
    (c * pure[0] + mg) * 255,
    (c * pure[1] + mg) * 255,
    (c * pure[2] + mg) * 255
  ];
};

conversions.hcg.hsv = function (hcg) {
  const c = hcg[1] / 100;
  const g = hcg[2] / 100;

  const v = c + g * (1.0 - c);
  let f = 0;

  if (v > 0.0) {
    f = c / v;
  }

  return [hcg[0], f * 100, v * 100];
};

conversions.hcg.hsl = function (hcg) {
  const c = hcg[1] / 100;
  const g = hcg[2] / 100;

  const l = g * (1.0 - c) + 0.5 * c;
  let s = 0;

  if (l > 0.0 && l < 0.5) {
    s = c / (2 * l);
  } else
  if (l >= 0.5 && l < 1.0) {
    s = c / (2 * (1 - l));
  }

  return [hcg[0], s * 100, l * 100];
};

conversions.hcg.hwb = function (hcg) {
  const c = hcg[1] / 100;
  const g = hcg[2] / 100;
  const v = c + g * (1.0 - c);
  return [hcg[0], (v - c) * 100, (1 - v) * 100];
};

conversions.hwb.hcg = function (hwb) {
  const w = hwb[1] / 100;
  const b = hwb[2] / 100;
  const v = 1 - b;
  const c = v - w;
  let g = 0;

  if (c < 1) {
    g = (v - c) / (1 - c);
  }

  return [hwb[0], c * 100, g * 100];
};

conversions.apple.rgb = function (apple) {
  return [(apple[0] / 65535) * 255, (apple[1] / 65535) * 255, (apple[2] / 65535) * 255];
};

conversions.rgb.apple = function (rgb) {
  return [(rgb[0] / 255) * 65535, (rgb[1] / 255) * 65535, (rgb[2] / 255) * 65535];
};

conversions.gray.rgb = function (args) {
  return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
};

conversions.gray.hsl = conversions.gray.hsv = function (args) {
  return [0, 0, args[0]];
};

conversions.gray.hwb = function (gray) {
  return [0, 100, gray[0]];
};

conversions.gray.cmyk = function (gray) {
  return [0, 0, 0, gray[0]];
};

conversions.gray.lab = function (gray) {
  return [gray[0], 0, 0];
};

conversions.gray.hex = function (gray) {
  const val = Math.round(gray[0] / 100 * 255) & 0xFF;
  const integer = (val << 16) + (val << 8) + val;

  const string = integer.toString(16).toUpperCase();
  return "000000".substring(string.length) + string;
};

conversions.rgb.gray = function (rgb) {
  const val = (rgb[0] + rgb[1] + rgb[2]) / 3;
  return [val / 255 * 100];
};

// TODO: move it to a separate graph utils??

/**
 * this function routes a model to all other models.
 * all functions that are routed have a property `.conversion` attached
 * to the returned synthetic function. This property is an array
 * of strings, each with the steps in between the 'from' and 'to'
 * color models (inclusive).
 * conversions that are not possible simply are not included.
 */

const buildGraph = () => {
  const graph = {};
  // https://jsperf.com/object-keys-vs-for-in-with-closure/3
  const models = Object.keys(conversions);

  for (let len = models.length, i = 0; i < len; i++) {
    graph[models[i]] = {
      // http://jsperf.com/1-vs-infinity
      // micro-opt, but this is simple.
      distance: -1,
      parent: null
    };
  }

  return graph;
};

// https://en.wikipedia.org/wiki/Breadth-first_search
const deriveBFS = (fromModel) => {
  const graph = buildGraph();
  const queue = [fromModel]; // unshift -> queue -> pop

  graph[fromModel].distance = 0;

  while (queue.length) {
    const current = queue.pop();
    const adjacents = Object.keys(conversions[current]);

    for (let len = adjacents.length, i = 0; i < len; i++) {
      const adjacent = adjacents[i];
      const node = graph[adjacent];

      if (node.distance === -1) {
        node.distance = graph[current].distance + 1;
        node.parent = current;
        queue.unshift(adjacent);
      }
    }
  }

  return graph;
};

const link = (from, to) => {
  return function (args) {
    return to(from(args));
  };
};

const wrapConversion = (toModel, graph) => {
  const path = [graph[toModel].parent, toModel];
  let fn = conversions[graph[toModel].parent][toModel];

  let cur = graph[toModel].parent;
  while (graph[cur].parent) {
    path.unshift(graph[cur].parent);
    fn = link(conversions[graph[cur].parent][cur], fn);
    cur = graph[cur].parent;
  }

  fn.conversion = path;
  return fn;
};

const route = function (fromModel) {
  const graph = deriveBFS(fromModel);
  const conversion = {};

  const models = Object.keys(graph);
  for (let len = models.length, i = 0; i < len; i++) {
    const toModel = models[i];
    const node = graph[toModel];

    if (is.null(node.parent)) {
      // no possible conversion, or this node is the source model.
      continue;
    }

    conversion[toModel] = wrapConversion(toModel, graph);
  }

  return conversion;
};

const convert = {};

const models = Object.keys(conversions);

const wrapRaw = (fn) => {
  const wrappedFn = function (...args) {
    if (args.length === 0) {
      return;
    }

    if (args.length === 1 && is.array(args[0])) {
      args = args[0];
    }

    return fn(args);
  };

  // preserve .conversion property if there is one
  if ("conversion" in fn) {
    wrappedFn.conversion = fn.conversion;
  }

  return wrappedFn;
};

const wrapRounded = (fn) => {
  const wrappedFn = function (...args) {
    if (args.length === 0) {
      return;
    }

    if (args.length === 1 && is.array(args[0])) {
      args = args[0];
    }

    const result = fn(args);

    // we're assuming the result is an array here.
    // see notice in conversions.js; don't use box types
    // in conversion functions.
    if (is.array(result)) {
      for (let len = result.length, i = 0; i < len; i++) {
        result[i] = Math.round(result[i]);
      }
    }

    return result;
  };

  // preserve .conversion property if there is one
  if ("conversion" in fn) {
    wrappedFn.conversion = fn.conversion;
  }

  return wrappedFn;
};

models.forEach((fromModel) => {
  convert[fromModel] = {};

  Object.defineProperty(convert[fromModel], "channels", { value: conversions[fromModel].channels });
  Object.defineProperty(convert[fromModel], "labels", { value: conversions[fromModel].labels });

  const routes = route(fromModel);
  const routeModels = Object.keys(routes);

  routeModels.forEach((toModel) => {
    const fn = routes[toModel];

    convert[fromModel][toModel] = wrapRounded(fn);
    convert[fromModel][toModel].raw = wrapRaw(fn);
  });
});

export default convert;
