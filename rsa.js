var alphabet = '! "#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{}~';
var separator = '|';
function divmod(number, divisori) {
    var divisor = BigInt(divisori);
    var div = number / divisor;
    var rem = number % divisor;
    return [div, Number(rem)];
}
function encodeNumList(nl, sep) {
    if (sep === void 0) { sep = ''; }
    var encoded = '';
    for (var i = 0; i < nl.length; i++) {
        encoded += encodeNum(nl[i]);
        if (i != nl.length - 1) {
            console.log(sep + '<--add sep');
            encoded += sep;
        }
    }
    return encoded;
}
function encodeNum(n, sep) {
    var _a;
    if (sep === void 0) { sep = ''; }
    console.log(n);
    var new_alphabet = alphabet;
    var encoded = '';
    var r = 0;
    while (n > 0n) {
        _a = divmod(n, new_alphabet.length), n = _a[0], r = _a[1];
        console.log('r = ' + r + '---' + new_alphabet[r - 1]);
        encoded = new_alphabet[r - 1] + encoded;
    }
    return encoded;
}
function decodeStringSplit(text, sep) {
    var sl = text.split(sep);
    var decoded = [];
    sl.forEach(function (s) {
        console.log(sep + '<--split ' + 's = ' + s);
        decoded.push(decodeString(s));
    });
    return decoded;
}
function decodeString(s, sep) {
    if (sep === void 0) { sep = ''; }
    var new_alphabet = alphabet;
    var decoded = 0n;
    while (s.length > 0) {
        // console.log('new alphabet = '+Number(BigInt(new_alphabet.length)));
        console.log(s[0] + ' <--new alphabet index from ' + s + '= ' + BigInt(new_alphabet.indexOf(s[0]) + 1));
        decoded = decoded * BigInt(new_alphabet.length) + BigInt(new_alphabet.indexOf(s[0]) + 1);
        console.log(decoded);
        s = s.slice(1);
    }
    return decoded;
}
function powerMod(angkai, eksponen, modi) {
    var mod = BigInt(modi);
    var angka = BigInt(angkai);
    if (mod == 1n)
        return 0;
    var hasil = 1n;
    angka = angka % mod;
    while (eksponen > 0) {
        if (eksponen % 2 === 1)
            hasil = (hasil * angka) % mod;
        eksponen = eksponen >> 1;
        angka = (angka * angka) % mod;
    }
    return hasil;
}
function gcd(a, b) {
    return (!b) ? a : gcd(b, a % b);
}
function chopString(str, length) {
    return str.match(new RegExp('.{1,' + length + '}', 'g'));
}
function findOrder(n) {
    var order = Math.floor(Math.log(n) / Math.LN10
        + 0.000000001); // because float math sucks like that
    return order;
}
function RSATeksEncrypt(pt, e, n) {
    console.log('real sep e=' + separator);
    var rawMsg = pt;
    var order = findOrder(n);
    console.log(n + 'order = ' + order);
    if (order < 2) {
        // document.getElementById('dekripsitext(dt)2').innerHTML = "n kurang dari pesan mohon diperbaiki";
        return;
    }
    var pl = chopString(rawMsg, Math.ceil((order - 1) / 2));
    var cl = [];
    var ct = '';
    pl.forEach(function (block) {
        // console.log(decodeString(block),e,n);
        cl.push(RSAEncrypt(decodeString(block), e, n));
    });
    console.log(pl);
    ct = encodeNumList(cl, separator);
    console.log(ct);
    // document.getElementById('ciphertext(ct)2').innerHTML = ct;
    // let d = document.getElementById('privatekey(d)2').innerHTML;
    // document.getElementById('dekripsitext(dt)2').innerHTML = RSATeksDecrypt(ct,d,n);
    return ct;
}
function RSATeksDecrypt(ct, d, n) {
    console.log('real sep =' + separator);
    var cl = decodeStringSplit(ct, separator);
    var pt = '';
    cl.forEach(function (c) {
        console.log(c);
        console.log('-' + encodeNum(c) + '-');
        var block = RSADecrypt(c, d, n);
        pt = pt + encodeNum(block);
        console.log(pt);
    });
    return pt;
}
function keyGen(p, q) {
    var n = p * q;
    var m = (p - 1) * (q - 1);
    var e = 0;
    for (e = 2; e < m; e++) {
        if (gcd(e, m) == 1) {
            break;
        }
    }
    var d = 0;
    for (var i = 0; i < 999999; i++) {
        var x = 1 + i * m;
        if (x % e == 0) {
            d = x / e;
            break;
        }
    }
    return [[e, n], [d, n]];
}
function RSAEncrypt(no, e, n) {
    if (n < no) {
        // document.getElementById('dekripsitext(dt)').innerHTML = "RSAe n harus lebih dari pesan";
        return;
    }
    return powerMod(no, e, n);
}
function RSADecrypt(no, d, n) {
    // if (n < no) {
    //     document.getElementById('dekripsitext(dt)').innerHTML = "RSAd n harus lebih dari pesan";
    //     return;
    // }
    return powerMod(no, d, n);
}
function generate() {
    var _a, _b, _c;
    var p = document.getElementById('p').value;
    var q = document.getElementById('q').value;
    var n, e, d;
    _a = keyGen(p, q), _b = _a[0], e = _b[0], n = _b[1], _c = _a[1], d = _c[0], n = _c[1];
    document.getElementById('publickey(N)').innerHTML = '( ' + e + ' , ' + n + ' )';
    document.getElementById('eksponen(e)').innerHTML = e;
    document.getElementById('privatekey(d)').innerHTML = '( ' + d + ' , ' + n + ' )';
}
function rsaangka() {
    var n = document.getElementById('n1').value;
    var e = document.getElementById('e1').value;
    var d = document.getElementById('d1').value;
    var pt = document.getElementById('msg1').value;
    var ct = RSAEncrypt(pt, e, n);
    document.getElementById('ct1').innerHTML = ct;
    document.getElementById('dt1').innerHTML = RSADecrypt(ct, e, n);
}
function rsateks() {
    var n = document.getElementById('n2').value;
    var e = document.getElementById('e2').value;
    var d = document.getElementById('d2').value;
    var pt = document.getElementById('msg2').value;
    var ct = RSATeksEncrypt(pt, e, n);
    document.getElementById('ct2').innerHTML = ct;
    document.getElementById('dt2').innerHTML = RSATeksDecrypt(ct, d, n);
}
