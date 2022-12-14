exports.assertArrayEqual = function (array1, array2) {
    if (array1.length !== array2.length) {
        return false; 
    }
    for (let i = 0; i < array1.length; i++) {
        if (array1[i] !== array2[i]) {
            return false; 
        }
    }

    return true;
};

// String to arraybuffer
exports.stringToArrayBuffer = function (string) {
    const dataBuffer = new Uint8Array(new ArrayBuffer(string.length));
    // Return the strings
    for (let i = 0; i < string.length; i++) {
        dataBuffer[i] = string.charCodeAt(i);
    }
    // Return the data buffer
    return dataBuffer;
};

// String to arraybuffer
exports.stringToArray = function (string) {
    const dataBuffer = new Array(string.length);
    // Return the strings
    for (let i = 0; i < string.length; i++) {
        dataBuffer[i] = string.charCodeAt(i);
    }
    // Return the data buffer
    return dataBuffer;
};

exports.Utf8 = {
    // public method for url encoding
    encode(string) {
        string = string.replace(/\r\n/g, "\n");
        let utftext = "";

        for (let n = 0; n < string.length; n++) {
            const c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if (c > 127 && c < 2048) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }

        return utftext;
    },

    // public method for url decoding
    decode(utftext) {
        let string = "";
        let i = 0;
        let c = 0;
        let c2 = 0;
        let c3 = 0;

        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if (c > 191 && c < 224) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
};

exports.assertBuffersEqual = function (done, buffer1, buffer2) {
    if (buffer1.length !== buffer2.length) {
        done("Buffers do not have the same length", buffer1, buffer2);
    }

    for (let i = 0; i < buffer1.length; i++) {
        expect(buffer1[i]).to.equal(buffer2[i]);
    }
};
