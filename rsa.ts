let alphabet = '! "#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{}~';
let separator = '|'

function divmod(number:bigint,divisori) {
    let divisor = BigInt(divisori)
    var div = number/divisor;
    var rem = number % divisor;
    return [div,Number(rem)];
}

function encodeNumList(nl:Array<bigint>,sep='') {
    let encoded = '';
    for (let i = 0; i < nl.length; i++) {
        encoded += encodeNum(nl[i])
        if (i != nl.length-1) {
            console.log(sep+'<--add sep')
            encoded += sep;
        }
    }
    return encoded;
}

function encodeNum(n:bigint,sep='') {
    console.log(n)
    let new_alphabet = alphabet
    let encoded = '';
    let r = 0;
    while (n > 0n) {
        [n,r] = divmod(n, new_alphabet.length);
        console.log('r = '+r+'---'+new_alphabet[r-1])
        encoded = new_alphabet[r-1] + encoded;
    }
    return encoded;
}

function decodeStringSplit(text:string,sep) {
    let sl = text.split(sep);
    let decoded:Array<bigint> = [];
    sl.forEach(s => {
        console.log(sep+'<--split '+'s = '+s)
        decoded.push(decodeString(s))
    });
    return decoded;
}

function decodeString(s:string,sep='') {
    let new_alphabet = alphabet
    let decoded = 0n;
    while (s.length > 0) {

        // console.log('new alphabet = '+Number(BigInt(new_alphabet.length)));
        console.log(s[0]+' <--new alphabet index from '+s+'= '+BigInt(new_alphabet.indexOf(s[0])+1));
        decoded = decoded * BigInt(new_alphabet.length) + BigInt(new_alphabet.indexOf(s[0])+1);
        console.log(decoded)
        s = s.slice(1);
    }
    return decoded;
}

function powerMod(angkai, eksponen, modi) {
    let mod = BigInt(modi);
    let angka = BigInt(angkai);
    if (mod == 1n) return 0;
    let hasil = 1n;
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

function RSATeksEncrypt(pt, e:number, n:number) {
    console.log('real sep e='+separator)
    let rawMsg:string = pt
    let order = findOrder(n);
    console.log(n+ 'order = '+order);
    if (order<2) {
        // document.getElementById('dekripsitext(dt)2').innerHTML = "n kurang dari pesan mohon diperbaiki";
        return;
    }
    let pl = chopString(rawMsg,Math.ceil((order-1)/2));
    let cl:Array<bigint> = [];
    let ct = '';

    pl.forEach(block => {
        // console.log(decodeString(block),e,n);
        cl.push(RSAEncrypt(decodeString(block),e,n));
    });
    console.log(pl);

    ct = encodeNumList(cl,separator);
    console.log(ct);
    
    // document.getElementById('ciphertext(ct)2').innerHTML = ct;
    // let d = document.getElementById('privatekey(d)2').innerHTML;
    // document.getElementById('dekripsitext(dt)2').innerHTML = RSATeksDecrypt(ct,d,n);
    return ct;
}

function RSATeksDecrypt(ct:string,d:number, n:number) {
    console.log('real sep ='+separator)
    let cl = decodeStringSplit(ct,separator);

    let pt = '';
    cl.forEach(c => {
        console.log(c);
        console.log('-'+encodeNum(c)+'-');
        let block = RSADecrypt(c,d,n);
        pt = pt + encodeNum(block);
        console.log(pt);
    });
    return pt;
}

function keyGen(p, q) {
    
    let n = p * q;
    let m = (p - 1) * (q - 1);
    
    let e = 0;
    for (e = 2; e < m; e++) {
        if (gcd(e, m) == 1) {
            break;
        }
    }
    
    let d = 0;
    for (let i = 0; i < 999999; i++) {
        let x = 1 + i * m
        if (x % e == 0) {
            d = x / e;
            break;
        }
    }

    return [[e,n],[d,n]];

}


function RSAEncrypt(no:number, e:number, n:number) {
    if (n < no) {
        // document.getElementById('dekripsitext(dt)').innerHTML = "RSAe n harus lebih dari pesan";
        return;
    }
    
    return powerMod(no, e, n);
}

function RSADecrypt(no:number, d:number, n:number) {
    // if (n < no) {
        //     document.getElementById('dekripsitext(dt)').innerHTML = "RSAd n harus lebih dari pesan";
        //     return;
        // }
        
        return powerMod(no, d, n);
    }
    

function generate() {
    let p = document.getElementById('p').value;
    let q = document.getElementById('q').value;
    let n, e, d;
    [[e,n],[d,n]] = keyGen(p, q);
    document.getElementById('publickey(N)').innerHTML = '('+e+','+n+')';
    document.getElementById('eksponen(e)').innerHTML = e;
    document.getElementById('privatekey(d)').innerHTML = '('+d+','+n+')';

}

function rsaangka() {
    let n = document.getElementById('n1').value;
    let e = document.getElementById('e1').value;
    let d = document.getElementById('d1').value;
    let pt = document.getElementById('msg1').value;
    let ct = RSAEncrypt(pt,e,n)
    document.getElementById('ct1').innerHTML = ct;
    document.getElementById('dt1').innerHTML = RSADecrypt(ct,e,n);
}

function rsateks() {
    let n = document.getElementById('n2').value;
    let e = document.getElementById('e2').value;
    let d = document.getElementById('d2').value;
    let pt = document.getElementById('msg2').value;
    let ct = RSATeksEncrypt(pt,e,n)
    document.getElementById('ct2').innerHTML = ct;
    document.getElementById('dt2').innerHTML = RSATeksDecrypt(ct,d,n);
}