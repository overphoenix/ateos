const {
  is,
  math: { BigInteger },
  net: { ip },
  lodash: { repeat, padStart, max, find }
} = ateos;

const constants6 = {
  BITS: 128,
  GROUPS: 8,

  /**
     * Represents IPv6 address scopes
     * @memberof IP6
     * @static
     */
  SCOPES: {
    0: "Reserved",
    1: "Interface local",
    2: "Link local",
    4: "Admin local",
    5: "Site local",
    8: "Organization local",
    14: "Global",
    15: "Reserved"
  },

  /**
     * Represents IPv6 address types
     * @memberof IP6
     * @static
     */
  TYPES: {
    "ff01::1/128": "Multicast (All nodes on this interface)",
    "ff01::2/128": "Multicast (All routers on this interface)",
    "ff02::1/128": "Multicast (All nodes on this link)",
    "ff02::2/128": "Multicast (All routers on this link)",
    "ff05::2/128": "Multicast (All routers in this site)",
    "ff02::5/128": "Multicast (OSPFv3 AllSPF routers)",
    "ff02::6/128": "Multicast (OSPFv3 AllDR routers)",
    "ff02::9/128": "Multicast (RIP routers)",
    "ff02::a/128": "Multicast (EIGRP routers)",
    "ff02::d/128": "Multicast (PIM routers)",
    "ff02::16/128": "Multicast (MLDv2 reports)",
    "ff01::fb/128": "Multicast (mDNSv6)",
    "ff02::fb/128": "Multicast (mDNSv6)",
    "ff05::fb/128": "Multicast (mDNSv6)",
    "ff02::1:2/128": "Multicast (All DHCP servers and relay agents on this link)",
    "ff05::1:2/128": "Multicast (All DHCP servers and relay agents in this site)",
    "ff02::1:3/128": "Multicast (All DHCP servers on this link)",
    "ff05::1:3/128": "Multicast (All DHCP servers in this site)",
    "::/128": "Unspecified",
    "::1/128": "Loopback",
    "ff00::/8": "Multicast",
    "fe80::/10": "Link-local unicast"
  },

  /**
     * A regular expression that matches bad characters in an IPv6 address
     * @memberof IP6
     * @static
     */
  RE_BAD_CHARACTERS: /([^0-9a-f:/%])/ig,

  /**
     * A regular expression that matches an incorrect IPv6 address
     * @memberof IP6
     * @static
     */
  RE_BAD_ADDRESS: /([0-9a-f]{5,}|:{3,}|[^:]:$|^:[^:]|\/$)/ig,

  /**
     * A regular expression that matches an IPv6 subnet
     * @memberof IP6
     * @static
     */
  RE_SUBNET_STRING: /\/\d{1,3}(?=%|$)/,

  /**
     * A regular expression that matches an IPv6 zone
     * @memberof IP6
     * @static
     */
  RE_ZONE_STRING: /%.*$/,
  RE_URL: new RegExp(/^\[{0,1}([0-9a-f:]+)\]{0,1}/),
  RE_URL_WITH_PORT: new RegExp(/\[([0-9a-f:]+)\]:([0-9]{1,5})/)
};

const addCommas = (number) => {
  const r = /(\d+)(\d{3})/;

  while (r.test(number)) {
    number = number.replace(r, "$1,$2");
  }

  return number;
};

const spanLeadingZeroes4 = (n) => {
  n = n.replace(/^(0{1,})([1-9]+)$/, "<span class=\"parse-error\">$1</span>$2");
  n = n.replace(/^(0{1,})(0)$/, "<span class=\"parse-error\">$1</span>$2");

  return n;
};

/**
 * A helper function to compact an array
 */
const compact = (address, slice) => {
  const s1 = [];
  const s2 = [];

  for (let i = 0; i < address.length; i++) {
    if (i < slice[0]) {
      s1.push(address[i]);
    } else if (i > slice[1]) {
      s2.push(address[i]);
    }
  }

  return s1.concat(["compact"]).concat(s2);
};

const paddedHex = (octet) => ateos.sprintf("%04x", parseInt(octet, 16));

const unsignByte = (b) => b & 0xFF;

const groupPossibilities = (possibilities) => ateos.sprintf("(%s)", possibilities.join("|"));

const padGroup = (group) => {
  if (group.length < 4) {
    return ateos.sprintf("0{0,%d}%s", 4 - group.length, group);
  }

  return group;
};

const simpleRegularExpression = (groups) => {
  const zeroIndexes = [];

  groups.forEach((group, i) => {
    const groupInteger = parseInt(group, 16);

    if (groupInteger === 0) {
      zeroIndexes.push(i);
    }
  });

  // You can technically elide a single 0, this creates the regular expressions
  // to match that eventuality
  const possibilities = zeroIndexes.map((zeroIndex) => {
    return groups.map((group, i) => {
      if (i === zeroIndex) {
        const elision = (i === 0 || i === constants6.GROUPS - 1) ? ":" : "";

        return groupPossibilities([padGroup(group), elision]);
      }

      return padGroup(group);
    }).join(":");
  });

  // The simplest case
  possibilities.push(groups.map(padGroup).join(":"));

  return groupPossibilities(possibilities);
};

const possibleElisions = (elidedGroups, moreLeft, moreRight) => {
  const left = moreLeft ? "" : ":";
  const right = moreRight ? "" : ":";

  const possibilities = [];

  // 1. elision of everything (::)
  if (!moreLeft && !moreRight) {
    possibilities.push("::");
  }

  // 2. complete elision of the middle
  if (moreLeft && moreRight) {
    possibilities.push("");
  }

  if ((moreRight && !moreLeft) || (!moreRight && moreLeft)) {
    // 3. complete elision of one side
    possibilities.push(":");
  }

  // 4. elision from the left side
  possibilities.push(ateos.sprintf("%s(:0{1,4}){1,%d}", left, elidedGroups - 1));

  // 5. elision from the right side
  possibilities.push(ateos.sprintf("(0{1,4}:){1,%d}%s", elidedGroups - 1, right));

  // 6. no elision
  possibilities.push(ateos.sprintf("(0{1,4}:){%d}0{1,4}", elidedGroups - 1));

  // 7. elision (including sloppy elision) from the middle
  for (let groups = 1; groups < elidedGroups - 1; groups++) {
    for (let position = 1; position < elidedGroups - groups; position++) {
      possibilities.push(ateos.sprintf("(0{1,4}:){%d}:(0{1,4}:){%d}0{1,4}",
        position,
        elidedGroups - position - groups - 1));
    }
  }

  return groupPossibilities(possibilities);
};

/**
 * Represents an IPv6 address
 * @class IP6
 * @param {string} address - An IPv6 address string
 * @param {number} [groups=8] - How many octets to parse
 * @example
 * let address = new IP6('2001::/32');
 */
export default class IP6 {
  constructor(address, optionalGroups) {
    if (is.undefined(optionalGroups)) {
      this.groups = constants6.GROUPS;
    } else {
      this.groups = optionalGroups;
    }

    this.v4 = false;

    this.subnet = "/128";
    this.subnetMask = 128;

    this.zone = "";

    this.address = address;

    const subnet = constants6.RE_SUBNET_STRING.exec(address);

    if (subnet) {
      this.parsedSubnet = subnet[0].replace("/", "");
      this.subnetMask = parseInt(this.parsedSubnet, 10);
      this.subnet = `/${this.subnetMask}`;

      if (isNaN(this.subnetMask) ||
                this.subnetMask < 0 ||
                this.subnetMask > constants6.BITS) {
        this.valid = false;
        this.error = "Invalid subnet mask.";

        return;
      }

      address = address.replace(constants6.RE_SUBNET_STRING, "");
    } else if (/\//.test(address)) {
      this.valid = false;
      this.error = "Invalid subnet mask.";

      return;
    }

    const zone = constants6.RE_ZONE_STRING.exec(address);

    if (zone) {
      this.zone = zone[0];

      address = address.replace(constants6.RE_ZONE_STRING, "");
    }

    this.addressMinusSuffix = address;

    this.parsedAddress = this.parse(this.addressMinusSuffix);
  }

  equal(other) {
    if (!(other instanceof IP6)) {
      return false;
    }
    if (this.subnetMask !== other.subnetMask) {
      return false;
    }
    for (let i = 0; i < 8; ++i) {
      if (this.parsedAddress[i] !== other.parsedAddress[i]) {
        return false;
      }
    }
    return true;
  }

  /**
     * Return the Microsoft UNC transcription of the address
     * @memberof IP6
     * @instance
     * @returns {String} the Microsoft UNC transcription of the address
     */
  microsoftTranscription() {
    return ateos.sprintf("%s.ipv6-literal.net",
      this.correctForm().replace(/:/g, "-"));
  }

  /**
     * Return the first n bits of the address, defaulting to the subnet mask
     * @memberof IP6
     * @instance
     * @param {number} [mask=subnet] - the number of bits to mask
     * @returns {String} the first n bits of the address as a string
     */
  mask(optionalMask) {
    if (is.undefined(optionalMask)) {
      optionalMask = this.subnetMask;
    }

    return this.getBitsBase2(0, optionalMask);
  }

  /**
     * Return the number of possible subnets of a given size in the address
     * @memberof IP6
     * @instance
     * @param {number} [size=128] - the subnet size
     * @returns {String}
     */
  // TODO: probably useful to have a numeric version of this too
  possibleSubnets(optionalSubnetSize) {
    if (is.undefined(optionalSubnetSize)) {
      optionalSubnetSize = 128;
    }

    const availableBits = constants6.BITS - this.subnetMask;
    const subnetBits = Math.abs(optionalSubnetSize - constants6.BITS);
    const subnetPowers = availableBits - subnetBits;

    if (subnetPowers < 0) {
      return "0";
    }

    return addCommas(BigInteger("2", 10).pow(subnetPowers).toString(10));
  }

  /**
     * Helper function getting start address.
     * @memberof IP6
     * @instance
     * @returns {BigInteger}
     */
  _startAddress() {
    return new BigInteger(this.mask() + repeat(0, constants6.BITS - this.subnetMask), 2);
  }

  /**
     * The first address in the range given by this address' subnet
     * Often referred to as the Network Address.
     * @memberof IP6
     * @instance
     * @returns {IP6}
     */
  startAddress() {
    return IP6.fromBigInteger(this._startAddress());
  }

  /**
     * The first host address in the range given by this address's subnet ie
     * the first address after the Network Address
     * @memberof IP6
     * @instance
     * @returns {IP6}
     */
  startAddressExclusive() {
    const adjust = new BigInteger("1");
    return IP6.fromBigInteger(this._startAddress().add(adjust));
  }

  /**
     * Helper function getting end address.
     * @memberof IP6
     * @instance
     * @returns {BigInteger}
     */
  _endAddress() {
    return new BigInteger(this.mask() + repeat(1, constants6.BITS - this.subnetMask), 2);
  }

  /**
     * The last address in the range given by this address' subnet
     * @memberof IP6
     * @instance
     * @returns {IP6}
     */
  endAddress() {
    return IP6.fromBigInteger(this._endAddress());
  }

  /**
     * The last host address in the range given by this address's subnet ie
     * the last address prior to the Broadcast Address
     * @memberof IP6
     * @instance
     * @returns {IP6}
     */
  endAddressExclusive() {
    const adjust = new BigInteger("1");
    return IP6.fromBigInteger(this._endAddress().subtract(adjust));
  }

  /**
     * Return the scope of the address
     * @memberof IP6
     * @instance
     * @returns {String}
     */
  getScope() {
    let scope = constants6.SCOPES[this.getBits(12, 16)];

    if (this.getType() === "Global unicast" &&
            scope !== "Link local") {
      scope = "Global";
    }

    return scope;
  }

  /**
     * Return the type of the address
     * @memberof IP6
     * @instance
     * @returns {String}
     */
  getType() {
    return find(constants6.TYPES, (name, type) => {
      return this.isInSubnet(new IP6(type));
    }) || "Global unicast";
  }

  /**
     * Return the bits in the given range as a BigNumber
     * @memberof IP6
     * @instance
     * @returns {BigNumber}
     */
  getBits(start, end) {
    return BigInteger(this.getBitsBase2(start, end), 2);
  }

  /**
     * Return the bits in the given range as a base-2 string
     * @memberof IP6
     * @instance
     * @returns {String}
     */
  getBitsBase2(start, end) {
    return this.binaryZeroPad().slice(start, end);
  }

  /**
     * Return the bits in the given range as a base-16 string
     * @memberof IP6
     * @instance
     * @returns {String}
     */
  getBitsBase16(start, end) {
    const length = end - start;

    if (length % 4 !== 0) {
      return null;
    }

    return padStart(this.getBits(start, end).toString(16), length / 4, "0");
  }

  /**
     * Return the bits that are set past the subnet mask length
     * @memberof IP6
     * @instance
     * @returns {String}
     */
  getBitsPastSubnet() {
    return this.getBitsBase2(this.subnetMask, constants6.BITS);
  }

  /**
     * Return the reversed ip6.arpa form of the address
     * @memberof IP6
     * @param {Object} options
     * @param {boolean} options.omitSuffix - omit the "ip6.arpa" suffix
     * @instance
     * @returns {String}
     */
  reverseForm(options) {
    if (!options) {
      options = {};
    }

    const characters = Math.floor(this.subnetMask / 4);

    const reversed = this.canonicalForm()
      .replace(/:/g, "")
      .split("")
      .slice(0, characters)
      .reverse()
      .join(".");

    if (characters > 0) {
      if (options.omitSuffix) {
        return reversed;
      }

      return ateos.sprintf("%s.ip6.arpa.", reversed);
    }

    if (options.omitSuffix) {
      return "";
    }

    return "ip6.arpa.";
  }

  /**
     * Return the correct form of the address
     * @memberof IP6
     * @instance
     * @returns {String}
     */
  correctForm() {
    if (!this.parsedAddress) {
      return null;
    }

    let groups = [];

    let zeroCounter = 0;
    const zeroes = [];

    for (let i = 0; i < this.parsedAddress.length; i++) {
      const value = parseInt(this.parsedAddress[i], 16);

      if (value === 0) {
        zeroCounter++;
      }

      if (value !== 0 && zeroCounter > 0) {
        if (zeroCounter > 1) {
          zeroes.push([i - zeroCounter, i - 1]);
        }

        zeroCounter = 0;
      }
    }

    // Do we end with a string of zeroes?
    if (zeroCounter > 1) {
      zeroes.push([this.parsedAddress.length - zeroCounter, this.parsedAddress.length - 1]);
    }

    const zeroLengths = zeroes.map((n) => {
      return (n[1] - n[0]) + 1;
    });

    if (zeroes.length > 0) {
      const index = zeroLengths.indexOf(max(zeroLengths));

      groups = compact(this.parsedAddress, zeroes[index]);
    } else {
      groups = this.parsedAddress;
    }

    for (let i = 0; i < groups.length; i++) {
      if (groups[i] !== "compact") {
        groups[i] = parseInt(groups[i], 16).toString(16);
      }
    }

    let correct = groups.join(":");

    correct = correct.replace(/^compact$/, "::");
    correct = correct.replace(/^compact|compact$/, ":");
    correct = correct.replace(/compact/, "");

    return correct;
  }

  /**
     * Return a zero-padded base-2 string representation of the address
     * @memberof IP6
     * @instance
     * @returns {String}
     * @example
     * let address = new IP6('2001:4860:4001:803::1011');
     * address.binaryZeroPad();
     * // '0010000000000001010010000110000001000000000000010000100000000011
     * //  0000000000000000000000000000000000000000000000000001000000010001'
     */
  binaryZeroPad() {
    return padStart(this.toBigNumber().toString(2), constants6.BITS, "0");
  }

  // TODO: Improve the semantics of this helper function
  parse4in6(address) {
    const groups = address.split(":");
    const lastGroup = groups.slice(-1)[0];

    const address4 = lastGroup.match(ip.IP4.constants.RE_ADDRESS);

    if (address4) {
      const temp4 = new ip.IP4(address4[0]);

      for (let i = 0; i < temp4.groups; i++) {
        if (/^0[0-9]+/.test(temp4.parsedAddress[i])) {
          this.valid = false;
          this.error = "IPv4 addresses can not have leading zeroes.";

          this.parseError = address.replace(ip.IP4.constants.RE_ADDRESS,
            temp4.parsedAddress.map(spanLeadingZeroes4).join("."));

          return null;
        }
      }

      this.v4 = true;

      groups[groups.length - 1] = temp4.toGroup6();

      address = groups.join(":");
    }

    return address;
  }

  // TODO: Make private?
  parse(address) {
    address = this.parse4in6(address);

    if (this.error) {
      return null;
    }

    const badCharacters = address.match(constants6.RE_BAD_CHARACTERS);

    if (badCharacters) {
      this.valid = false;
      this.error = ateos.sprintf("Bad character%s detected in address: %s",
        badCharacters.length > 1 ? "s" : "", badCharacters.join(""));

      this.parseError = address.replace(constants6.RE_BAD_CHARACTERS,
        "<span class=\"parse-error\">$1</span>");

      return null;
    }

    const badAddress = address.match(constants6.RE_BAD_ADDRESS);

    if (badAddress) {
      this.valid = false;
      this.error = ateos.sprintf("Address failed regex: %s", badAddress.join(""));

      this.parseError = address.replace(constants6.RE_BAD_ADDRESS,
        "<span class=\"parse-error\">$1</span>");

      return null;
    }

    let groups = [];

    const halves = address.split("::");

    if (halves.length === 2) {
      let first = halves[0].split(":");
      let last = halves[1].split(":");

      if (first.length === 1 &&
                first[0] === "") {
        first = [];
      }

      if (last.length === 1 &&
                last[0] === "") {
        last = [];
      }

      const remaining = this.groups - (first.length + last.length);

      if (!remaining) {
        this.valid = false;
        this.error = "Error parsing groups";

        return null;
      }

      this.elidedGroups = remaining;

      this.elisionBegin = first.length;
      this.elisionEnd = first.length + this.elidedGroups;

      first.forEach((group) => {
        groups.push(group);
      });

      for (let i = 0; i < remaining; i++) {
        groups.push(0);
      }

      last.forEach((group) => {
        groups.push(group);
      });
    } else if (halves.length === 1) {
      groups = address.split(":");

      this.elidedGroups = 0;
    } else {
      this.valid = false;
      this.error = "Too many :: groups found";

      return null;
    }

    groups = groups.map((g) => {
      return ateos.sprintf("%x", parseInt(g, 16));
    });

    if (groups.length !== this.groups) {
      this.valid = false;
      this.error = "Incorrect number of groups found";

      return null;
    }

    this.valid = true;

    return groups;
  }

  /**
     * Return the canonical form of the address
     * @memberof IP6
     * @instance
     * @returns {String}
     */
  canonicalForm() {
    if (!this.valid) {
      return null;
    }

    return this.parsedAddress.map(paddedHex).join(":");
  }

  /**
     * Return the decimal form of the address
     * @memberof IP6
     * @instance
     * @returns {String}
     */
  decimal() {
    if (!this.valid) {
      return null;
    }

    return this.parsedAddress.map((n) => {
      return ateos.sprintf("%05d", parseInt(n, 16));
    }).join(":");
  }

  /**
     * Return the address as a BigNumber
     * @memberof IP6
     * @instance
     * @returns {BigNumber}
     */
  toBigNumber() {
    if (!this.valid) {
      return null;
    }

    return BigInteger(this.parsedAddress.map(paddedHex).join(""), 16);
  }

  toBitSet() {
    if (!this.valid) {
      return null;
    }
    const bitset = new ateos.math.BitSet(128);
    for (let i = 0; i < 8; ++i) {
      bitset.writeUInt(parseInt(this.parsedAddress[i], 16), 16, 112 - 16 * i);
    }
    return bitset;
  }

  /**
     * Return the last two groups of this address as an IPv4 address string
     * @memberof IP6
     * @instance
     * @returns {String}
     * @example
     * let address = new IP6('2001:4860:4001::1825:bf11');
     * address.to4(); // '24.37.191.17'
     */
  to4() {
    const binary = this.binaryZeroPad().split("");

    return ip.IP4.fromHex(BigInteger(binary.slice(96, 128).join(""), 2).toString(16));
  }

  /**
     * Return the v4-in-v6 form of the address
     * @memberof IP6
     * @instance
     * @returns {String}
     */
  to4in6() {
    const address4 = this.to4();
    const address6 = new IP6(this.parsedAddress.slice(0, 6).join(":"), 6);
    const correct = address6.correctForm();
    let infix = "";

    if (!/:$/.test(correct)) {
      infix = ":";
    }

    return address6.correctForm() + infix + address4.address;
  }

  /**
     * Return an object containing the Teredo properties of the address
     * @memberof IP6
     * @instance
     * @returns {Object}
     */
  inspectTeredo() {
    /**
         * - Bits 0 to 31 are set to the Teredo prefix (normally 2001:0000::/32).
         * - Bits 32 to 63 embed the primary IPv4 address of the Teredo server that
         * is used.
         * - Bits 64 to 79 can be used to define some flags. Currently only the
         * higher order bit is used; it is set to 1 if the Teredo client is
         * located behind a cone NAT, 0 otherwise. For Microsoft's Windows Vista
         * and Windows Server 2008 implementations, more bits are used. In those
         * implementations, the format for these 16 bits is "CRAAAAUG AAAAAAAA",
         * where "C" remains the "Cone" flag. The "R" bit is reserved for future
         * use. The "U" bit is for the Universal/Local flag (set to 0). The "G" bit
         * is Individual/Group flag (set to 0). The A bits are set to a 12-bit
         * randomly generated number chosen by the Teredo client to introduce
         * additional protection for the Teredo node against IPv6-based scanning
         * attacks.
         * - Bits 80 to 95 contains the obfuscated UDP port number. This is the
         * port number that is mapped by the NAT to the Teredo client with all
         * bits inverted.
         * - Bits 96 to 127 contains the obfuscated IPv4 address. This is the
         * public IPv4 address of the NAT with all bits inverted.
         */
    const prefix = this.getBitsBase16(0, 32);

    const udpPort = this.getBits(80, 96).xor(BigInteger("ffff", 16)).toString();

    const server4 = ip.IP4.fromHex(this.getBitsBase16(32, 64));
    const client4 = ip.IP4.fromHex(this.getBits(96, 128).xor(BigInteger("ffffffff", 16)).toString(16));

    const flags = this.getBits(64, 80);
    const flagsBase2 = this.getBitsBase2(64, 80);

    const isFlagSet = (bit) => flags.shiftRight(bit).and(1).toJSNumber() === 1;

    const coneNat = isFlagSet(15);
    const reserved = isFlagSet(14);
    const groupIndividual = isFlagSet(8);
    const universalLocal = isFlagSet(9);
    const nonce = BigInteger(flagsBase2.slice(2, 6) + flagsBase2.slice(8, 16), 2).toString(10);

    return {
      prefix: ateos.sprintf("%s:%s", prefix.slice(0, 4), prefix.slice(4, 8)),
      server4: server4.address,
      client4: client4.address,
      flags: flagsBase2,
      coneNat,
      microsoft: {
        reserved,
        universalLocal,
        groupIndividual,
        nonce
      },
      udpPort
    };
  }

  /**
     * Return an object containing the 6to4 properties of the address
     * @memberof IP6
     * @instance
     * @returns {Object}
     */
  inspect6to4() {
    /**
         * - Bits 0 to 15 are set to the 6to4 prefix (2002::/16).
         * - Bits 16 to 48 embed the IPv4 address of the 6to4 gateway that is used.
         */

    const prefix = this.getBitsBase16(0, 16);

    const gateway = ip.IP4.fromHex(this.getBitsBase16(16, 48));

    return {
      prefix: ateos.sprintf("%s", prefix.slice(0, 4)),
      gateway: gateway.address
    };
  }

  /**
     * Return a v6 6to4 address from a v6 v4inv6 address
     * @memberof IP6
     * @instance
     * @returns {IP6}
     */
  to6to4() {
    if (!this.is4()) {
      return null;
    }

    const addr6to4 = [
      "2002",
      this.getBitsBase16(96, 112),
      this.getBitsBase16(112, 128),
      "",
      "/16"
    ].join(":");

    return new IP6(addr6to4);
  }

  // /**
  //  * Return a byte array
  //  * @memberof IP6
  //  * @instance
  //  * @returns {Array}
  //  */
  // toByteArray() {
  //     const buf = this.toBigNumber().toBuffer({ endian: "big" });
  //     const arr = new Array(buf.length);
  //     for (let i = 0; i < buf.length; i++) {
  //         arr[i] = buf[i];
  //     }

  //     // work around issue where `toByteArray` returns a leading 0 element
  //     if (arr.length === 17 && arr[0] === 0) {
  //         return arr.slice(1);
  //     }
  //     return arr;
  // }

  // /**
  //  * Return an unsigned byte array
  //  * @memberof IP6
  //  * @instance
  //  * @returns {Array}
  //  */
  // toUnsignedByteArray() {
  //     return this.toByteArray().map(unsignByte);
  // }

  /**
     * Generate a regular expression string that can be used to find or validate
     * all variations of this address
     * @memberof IP6
     * @instance
     * @param {string} optionalSubString
     * @returns {string}
     */
  regularExpressionString(optionalSubString) {
    if (is.undefined(optionalSubString)) {
      optionalSubString = false;
    }

    let output = [];

    // TODO: revisit why this is necessary
    const address6 = new this.constructor(this.correctForm());

    if (address6.elidedGroups === 0) {
      // The simple case
      output.push(simpleRegularExpression(address6.parsedAddress));
    } else if (address6.elidedGroups === constants6.GROUPS) {
      // A completely elided address
      output.push(possibleElisions(constants6.GROUPS));
    } else {
      // A partially elided address
      const halves = address6.address.split("::");

      if (halves[0].length) {
        output.push(simpleRegularExpression(halves[0].split(":")));
      }

      output.push(possibleElisions(address6.elidedGroups,
        halves[0].length !== 0,
        halves[1].length !== 0));

      if (halves[1].length) {
        output.push(simpleRegularExpression(halves[1].split(":")));
      }

      output = [output.join(":")];
    }

    if (!optionalSubString) {
      output = [].concat("(?=^|\\b|[^\\w\\:])(", output, ")(?=[^\\w\\:]|\\b|$)");
    }

    return output.join("");
  }

  /**
     * Generate a regular expression that can be used to find or validate all
     * variations of this address.
     * @memberof IP6
     * @instance
     * @param {string} optionalSubString
     * @returns {RegExp}
     */
  regularExpression(optionalSubstring) {
    return new RegExp(this.regularExpressionString(optionalSubstring), "i");
  }

  /**
     * Returns true if the address is valid, false otherwise
     * @memberof IP6
     * @instance
     * @returns {boolean}
     */
  isValid() {
    return this.valid;
  }

  /**
     * @returns {String} the address in link form with a default port of 80
     */
  href(optionalPort) {
    if (is.undefined(optionalPort)) {
      optionalPort = "";
    } else {
      optionalPort = ateos.sprintf(":%s", optionalPort);
    }

    return ateos.sprintf("http://[%s]%s/", this.correctForm(), optionalPort);
  }

  /**
     * @returns {String} a link suitable for conveying the address via a URL hash
     */
  link(options) {
    if (!options) {
      options = {};
    }

    if (is.undefined(options.className)) {
      options.className = "";
    }

    if (is.undefined(options.prefix)) {
      options.prefix = "/#address=";
    }

    if (is.undefined(options.v4)) {
      options.v4 = false;
    }

    let formFunction = this.correctForm;

    if (options.v4) {
      formFunction = this.to4in6;
    }

    if (options.className) {
      return ateos.sprintf("<a href=\"%1$s%2$s\" class=\"%3$s\">%2$s</a>",
        options.prefix, formFunction.call(this), options.className);
    }

    return ateos.sprintf("<a href=\"%1$s%2$s\">%2$s</a>", options.prefix, formFunction.call(this));
  }

  /**
     * Groups an address
     * @returns {String}
     */
  group() {
    const address4 = this.address.match(ip.IP4.constants.RE_ADDRESS);

    if (address4) {
      // The IPv4 case
      const segments = address4[0].split(".");

      this.address = this.address.replace(ip.IP4.constants.RE_ADDRESS,
        ateos.sprintf("<span class=\"hover-group group-v4 group-6\">%s</span>.<span class=\"hover-group group-v4 group-7\">%s</span>",
          segments.slice(0, 2).join("."),
          segments.slice(2, 4).join(".")));
    }

    if (this.elidedGroups === 0) {
      // The simple case
      return ip.v6helpers.simpleGroup(this.address);
    }

    // The elided case
    const output = [];

    const halves = this.address.split("::");

    if (halves[0].length) {
      output.push(ip.v6helpers.simpleGroup(halves[0]));
    } else {
      output.push("");
    }

    const classes = ["hover-group"];

    for (let i = this.elisionBegin; i < this.elisionBegin + this.elidedGroups; i++) {
      classes.push(ateos.sprintf("group-%d", i));
    }

    output.push(ateos.sprintf("<span class=\"%s\"></span>", classes.join(" ")));

    if (halves[1].length) {
      output.push(ip.v6helpers.simpleGroup(halves[1], this.elisionEnd));
    } else {
      output.push("");
    }

    return output.join(":");
  }

  *[Symbol.iterator]() {
    // TODO: optimize
    const start = this.startAddress().toBigNumber();
    const end = this.endAddress().toBigNumber();
    for (let i = start; end.greaterOrEquals(i); i = i.plus(1)) {
      yield IP6.fromBigInteger(i);
    }
  }

  /**
     * Convert a BigNumber to a v6 address object
     * @memberof IP6
     * @static
     * @param {BigNumber} bigNumber - a BigNumber to convert
     * @returns {IP6}
     * @example
     * let bigNumber = BigInteger('1000000000000');
     * let address = IP6.fromBigInteger(bigNumber);
     * address.correctForm(); // '::e8:d4a5:1000'
     */
  static fromBigInteger(bigNumber) {
    const hex = padStart(bigNumber.toString(16), 32, "0");
    const groups = [];

    for (let i = 0; i < constants6.GROUPS; i++) {
      groups.push(hex.slice(i * 4, (i + 1) * 4));
    }

    return new IP6(groups.join(":"));
  }

  static fromBitSet(bitset, subnet = 128) {
    const groups = [];
    for (let i = 0; i < 8; ++i) {
      groups.push(bitset.readUInt(16, 112 - 16 * i).toString(16));
    }
    return new IP6(`${groups.join(":")}/${subnet}`);
  }

  /**
     * Convert a URL (with optional port number) to an address object
     * @memberof IP6
     * @static
     * @param {string} url - a URL with optional port number
     * @returns {IP6}
     * @example
     * let addressAndPort = IP6.fromURL('http://[ffff::]:8080/foo/');
     * addressAndPort.address.correctForm(); // 'ffff::'
     * addressAndPort.port; // 8080
     */
  static fromURL(url) {
    let host;
    let port;
    let result;

    // If we have brackets parse them and find a port
    if (url.indexOf("[") !== -1 && url.indexOf("]:") !== -1) {
      result = constants6.RE_URL_WITH_PORT.exec(url);

      if (is.null(result)) {
        return {
          error: "failed to parse address with port",
          address: null,
          port: null
        };
      }

      host = result[1];
      port = result[2];
      // If there's a URL extract the address
    } else if (url.indexOf("/") !== -1) {
      // Remove the protocol prefix
      url = url.replace(/^[a-z0-9]+:\/\//, "");

      // Parse the address
      result = constants6.RE_URL.exec(url);

      if (is.null(result)) {
        return {
          error: "failed to parse address from URL",
          address: null,
          port: null
        };
      }

      host = result[1];
      // Otherwise just assign the URL to the host and let the library parse it
    } else {
      host = url;
    }

    // If there's a port convert it to an integer
    if (port) {
      port = parseInt(port, 10);

      //squelch out of range ports
      if (port < 0 || port > 65536) {
        port = null;
      }
    } else {
      // Standardize `undefined` to `null`
      port = null;
    }

    return {
      address: new IP6(host),
      port
    };
  }

  /**
     * Create an IPv6-mapped address given an IPv4 address
     * @memberof IP6
     * @static
     * @param {string} address - An IPv4 address string
     * @returns {IP6}
     * @example
     * let address = IP6.fromIP4('192.168.0.1');
     * address.correctForm(); // '::ffff:c0a8:1'
     * address.to4in6(); // '::ffff:192.168.0.1'
     */
  static fromIP4(address4) {
    const ip4 = new ip.IP4(address4);
    const mask6 = constants6.BITS - (ip.IP4.constants.BITS - ip4.subnetMask);
    return new IP6(`::ffff:${ip4.correctForm()}/${mask6}`);
  }

  /**
     * Return an address from ip6.arpa form
     * @memberof IP6
     * @static
     * @param {string} arpaFormAddress - an 'ip6.arpa' form address
     * @returns {Adress6}
     * @example
     * var address = IP6.fromArpa(e.f.f.f.3.c.2.6.f.f.f.e.6.6.8.e.1.0.6.7.9.4.e.c.0.0.0.0.1.0.0.2.ip6.arpa.)
     * address.correctForm(); // '2001:0:ce49:7601:e866:efff:62c3:fffe'
     */
  static fromArpa(arpaFormAddress) {
    //remove ending ".ip6.arpa." or just "."
    let address = arpaFormAddress.replace(/(\.ip6\.arpa)?\.$/, "");
    const semicolonAmount = 7;

    //correct ip6.arpa form with ending removed will be 63 characters
    if (address.length !== 63) {
      address = {
        error: "Not Valid 'ip6.arpa' form",
        address: null
      };
      return address;
    }

    address = address.split(".").reverse();

    for (let i = semicolonAmount; i > 0; i--) {
      const insertIndex = i * 4;
      address.splice(insertIndex, 0, ":");
    }

    address = address.join("");
    return new IP6(address);
  }

  /**
     * Convert a byte array to an IP6 object
     * @memberof IP6
     * @static
     * @returns {IP6}
     */
  static fromByteArray(bytes) {
    return this.fromUnsignedByteArray(bytes.map(unsignByte));
  }

  /**
     * Convert an unsigned byte array to an IP6 object
     * @memberof IP6
     * @static
     * @returns {IP6}
     */
  static fromUnsignedByteArray(bytes) {
    const BYTE_MAX = BigInteger("256", 10);
    let result = BigInteger("0", 10);
    let multiplier = BigInteger("1", 10);

    for (let i = bytes.length - 1; i >= 0; i--) {
      result = result.plus(multiplier.multiply(BigInteger(bytes[i].toString(10), 10)));

      multiplier = multiplier.multiply(BYTE_MAX);
    }

    return IP6.fromBigInteger(result);
  }
}

/**
 * Returns true if the given address is in the subnet of the current address
 * @memberof IP6
 * @instance
 * @returns {boolean}
 */
IP6.prototype.isInSubnet = ip.isInSubnet;

/**
 * Returns true if the address is correct, false otherwise
 * @memberof IP6
 * @instance
 * @returns {boolean}
 */
IP6.prototype.isCorrect = ip.isCorrect(constants6.BITS);

/**
 * Returns true if the address is in the canonical form, false otherwise
 * @memberof IP6
 * @instance
 * @returns {boolean}
 */
IP6.prototype.isCanonical = ip.falseIfInvalid(function () {
  return this.addressMinusSuffix === this.canonicalForm();
});

/**
 * Returns true if the address is a link local address, false otherwise
 * @memberof IP6
 * @instance
 * @returns {boolean}
 */
IP6.prototype.isLinkLocal = ip.falseIfInvalid(function () {
  // Zeroes are required, i.e. we can't check isInSubnet with 'fe80::/10'
  if (this.getBitsBase2(0, 64) === "1111111010000000000000000000000000000000000000000000000000000000") {
    return true;
  }

  return false;
});

/**
 * Returns true if the address is a multicast address, false otherwise
 * @memberof IP6
 * @instance
 * @returns {boolean}
 */
IP6.prototype.isMulticast = ip.falseIfInvalid(function () {
  return this.getType() === "Multicast";
});

/**
 * Returns true if the address is a v4-in-v6 address, false otherwise
 * @memberof IP6
 * @instance
 * @returns {boolean}
 */
IP6.prototype.is4 = ip.falseIfInvalid(function () {
  return this.v4;
});

/**
 * Returns true if the address is a Teredo address, false otherwise
 * @memberof IP6
 * @instance
 * @returns {boolean}
 */
IP6.prototype.isTeredo = ip.falseIfInvalid(function () {
  return this.isInSubnet(new this.constructor("2001::/32"));
});

/**
 * Returns true if the address is a 6to4 address, false otherwise
 * @memberof IP6
 * @instance
 * @returns {boolean}
 */
IP6.prototype.is6to4 = ip.falseIfInvalid(function () {
  return this.isInSubnet(new this.constructor("2002::/16"));
});

/**
 * Returns true if the address is a loopback address, false otherwise
 * @memberof IP6
 * @instance
 * @returns {boolean}
 */
IP6.prototype.isLoopback = ip.falseIfInvalid(function () {
  return this.getType() === "Loopback";
});

IP6.constants = constants6;
