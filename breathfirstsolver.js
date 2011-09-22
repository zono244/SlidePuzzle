require('sugar');

BreathFirstBackSolver = function (b) {
    var idx_tbl = ['1','2','3','4','5','6','7','8','9',
               'A','B','C','D','E','F','G','H','I',
               'J','K','L','M','N','O','P','Q','R',
               'S','T','U','V','W','X','Y','Z'];
    var bWidth = b.w;
    var bHeight = b.h;
    var bBoard = b.board;

    // 盤面右下からの距離のArray
    var SCORE_BOARD = function () {
        var a = new Array();
        for (var i = 0; i < bBoard.length; i++) {
            a[i] = distance_ary(bBoard, i);
        }
        return a;
    }.call();
    function distance_ary(b, i){
        var a = b.split('');
        if (a[i] == '=') return undefined;
        a[i] = 0;
        var queue = new Array();
        queue.add(i);
        var idx = queue.shift();
        while (idx != undefined) {
            if (!Object.isNumber(a[idx])) {
                idx = queue.shift();
                continue;
            }
            var n;
            n = idx + 1;
            if (n < b.length && n % bWidth != 0 && a[n] != '=' && !Object.isNumber(a[n])) {
                a[n] = a[idx] + 1;
                queue.push(n);
            }
            n = idx - 1;
            if (n >= 0 && idx % bWidth != 0 && a[n] != '=' && !Object.isNumber(a[n])) {
                a[n] = a[idx] + 1;
                queue.push(n);
            }
            n = idx + bWidth;
            if (n < a.length && a[n] != '=' && !Object.isNumber(a[n])) {
                a[n] = a[idx] + 1;
                queue.push(n);
            }
            n = idx - bWidth;
            if (n >= 0 && n >= 0 && a[n] != '=' && !Object.isNumber(a[n])) {
                a[n] = a[idx] + 1;
                queue.push(n);
            }
            idx = queue.shift();
        }
        //console.log(a);
        return a;
    }
    function distance(b, i) {
        var a = b.split('').indexOf(idx_tbl[i]);
        if (a == -1) return 0;
        //console.log(i + " " + a + "=>" + SCORE_BOARD[i][a]);
        return SCORE_BOARD[i][a];
    }
    function score(b) {
        var a = b.split('');
        var len = a.length;
        var ret = 0;
        //var bonus = SCORE_BOARD[len - 1];
        for (var i = 0; i < len; i++) {
            //if (a[i] != '=') ret += distance(b, i) * bonus[i];
            if (a[i] != '=') ret += distance(b, i);
        }
        return ret;
    }
    function pruning(queue) {
        var len = queue.length;
        if (len <= 10000) { // 適当。どんどん刈って深さを稼いだほうが結果がよかった。
            return queue; 
        }
        //console.log('prune');
        var ttl = 0;
        var i = len;
        while (i--) {
            var q = queue[i];
            q.s = score(q.b);
            ttl += q.s;
        }
        var ave = ttl / len;
        var ret = queue.filter(function(d) {
            return d.s<= ave;
        });
        //console.log('prune done ' + len + "=>" + ret.length);
        return ret;
    }
    var BOARD_CANNOT_UP = function () {
        var ary = new Array();
        for (var i = 0; i < bBoard.length; i++) {
            ary[i] = false;
            if (i - bWidth <  0 || bBoard.charAt(i - bWidth) == '=') {
                ary[i] = true;
            }
        }
        return ary;
    }.call();
    function moveU (b) {
        var a = b.split('');
        var idx1 = a.indexOf('0');
        var idx2 = idx1 - bWidth;
        if (BOARD_CANNOT_UP[idx1]) {
            return undefined;
        }
        var tmp = a[idx1];
        a[idx1] = a[idx2];
        a[idx2] = tmp;
        return a.join('');
    };
    var BOARD_CANNOT_LEFT = function () {
        var ary = new Array();
        for (var i = 0; i < bBoard.length; i++) {
            ary[i] = false;
            if (i % bWidth == 0 || bBoard.charAt(i - 1) == '=') {
                ary[i] = true;
            }
        }
        return ary;
    }.call();
    function moveL(b) {
        var a = b.split('');
        var idx1 = a.indexOf('0');
        var idx2 = idx1 - 1;
        if (BOARD_CANNOT_LEFT[idx1]) {
            return undefined;
        }
        var tmp = a[idx1];
        a[idx1] = a[idx2];
        a[idx2] = tmp;
        return a.join('');
    }
    var BOARD_CANNOT_RIGHT = function () {
        var ary = new Array();
        for (var i = 0; i < bBoard.length; i++) {
            ary[i] = false;
            if ((i + 1) % bWidth == 0 || bBoard.charAt(i + 1) == '=') {
                ary[i] = true;
            }
        }
        return ary;
    }.call();
    function moveR(b) {
        var a = b.split('');
        var idx1 = a.indexOf('0');
        var idx2 = idx1 + 1;
        if (BOARD_CANNOT_RIGHT[idx1]) {
            return undefined;
        }
        var tmp = a[idx1];
        a[idx1] = a[idx2];
        a[idx2] = tmp;
        return a.join('');
    }
    var BOARD_CANNOT_DOWN = function () {
        var ary = new Array();
        for (var i = 0; i < bBoard.length; i++) {
            ary[i] = false;
            if (i + bWidth >= bBoard.length || bBoard.charAt(i + bWidth) == '=') {
                ary[i] = true;
            }
        }
        return ary;
    }.call();
    function moveD(b) {
        var a = b.split('');
        var idx1 = b.split('').indexOf('0');
        var idx2 = idx1 + bWidth;
        if (BOARD_CANNOT_DOWN[idx1]) {
            return undefined;
        }
        var tmp = a[idx1];
        a[idx1] = a[idx2];
        a[idx2] = tmp;
        return a.join('');
    }
    function print(b) {
        var i = 0;
        console.log('------');
        while (i < b.length) {
            s = b.substr(i, this.bWidth);
            console.log(s);
            i += b.w;
        }
    };
    function compare(a, b) {
        //console.log(a.length + " " + b.length);
        var i = 0;
        var j = 0;
        var i_max = a.length;
        var j_max = b.length;
        var ad = a[i];
        var bd = b[i];

        //console.log(i_max + " " + j_max);
        while (i < i_max && j < j_max) {
            //console.log(i + " " + j);
            if (ad.b == bd.b) {
                return ad.m + bd.m;
            }
            if (ad.b > bd.b) {
                j++;
                bd = b[j];
            } else {
                i++;
                ad = a[i];
            }
        }
        //console.log('compare done');
        return undefined;
    }
    function uniq(queue) {
        var i = 0;
        var j = 1;
        var max = queue.length;
        var dib = queue[i].b;
        var dim = queue[i].m.last();
        var djb = queue[j].b;
        var djm = queue[j].m.last();

        while (j < max) {
            var q = queue[j];
            djb = q.b;
            djm = q.m.last();
            if (dib == djb && dim == djm) { // 盤面が同じ && 直前の手が同じ
                queue[j] = undefined;
            } else {
                i = j;
                dib = djb;
                dim = djm;
            }
            j++;
        }
        queue.remove(undefined);
        //console.log('compact ' + max + "->" + queue.length);
    }
    function search(front, back, output) {
        var up = moveU;
        var down = moveD;
        var left = moveL;
        var right = moveR;
        
        var i = front.length;
        //console.log('creating..')
        while (i--) {
            var f = front[i];
            var b = f.b;
            var m = f.m;
            var prev = m.last();
            if (prev != 'd') {
                var tmp = up(b);
                if (tmp) {
                    output.push({'b': tmp, 'm': m + 'u'});
                }
            }
            if (prev != 'u') {
                var tmp = down(b);
                if (tmp) {
                    output.push({'b': tmp, 'm': m + 'd'});
                }
            }
            if (prev != 'l') {
                var tmp = right(b);
                if (tmp) {
                    output.push({'b': tmp, 'm': m + 'r'});
                }
            }
            if (prev != 'r') {
                var tmp = left(b);
                if (tmp) {
                    output.push({'b': tmp, 'm': m + 'l'});
                }
            }
        }
        //console.log('sorting..')
        output.sort( function (a1, a2) {
            if (a1.b == a2.b) {
                return 0;
            }
            return (a1.b > a2.b)? 1 : -1;
        });
        //console.log('uniq..');
        uniq(output);

        //console.log('compare..')
        var r = compare(output, back);
        //console.log('done');
        return r;
    }
    function back_search(front, back, output) {
        var up = moveU;
        var down = moveD;
        var left = moveL;
        var right = moveR;
        
        var i = back.length;
        while (i--) {
            var d = back[i];
            var b = d.b;
            var m = d.m;
            var after = m.first();
            if (after != 'u') {
                var tmp = up(b);
                if (!!tmp) {
                    output.push({'b': tmp, 'm': 'd' + m});
                }
            }
            if (after != 'd') {
                var tmp = down(b);
                if (!!tmp) {
                    output.push({'b': tmp, 'm': 'u' + m});
                }
            }
            if (after != 'r') {
                var tmp = right(b);
                if (!!tmp) {
                    output.push({'b': tmp, 'm': 'l' + m});
                }
            }
            if (after != 'l') {
                var tmp = left(b);
                if (!!tmp) {
                    output.push({'b': tmp, 'm': 'r' + m});
                }
            }
        }
        output.sort( function (a1, a2) {
            if (a1.b == a2.b) {
                return 0;
            }
            return (a1.b > a2.b)? 1 : -1;
        });
        uniq(output);
        //console.log(output);
        return compare(front, output);
    }
    function ret_board(b) {
        a = b.split("");
        for (i = 0; i < a.length; i++) {
            if (a[i] != '=') a[i] = idx_tbl[i];
        }
        for (i = a.length - 1; i >= 0; i--) {
            if (a[i] != '=') {a[i] = '0'; break;}
        }
        return a.join('');
    }
    // {'b': board/string, 'm': move_ary}
    function solve() {
        var front = new Array();
        var back = new Array();
        var output = new Array();
        front.add({'b': bBoard, 'm': ""});
        back.add({'b': ret_board(bBoard), 'm': ''});

        var f_len = front.length;
        var b_len = back.length;

        ret = undefined;
        var i = 1;
        while (ret == undefined) {
            //console.log('checking..' + i + " " + f_len + " " + b_len);
            if (b_len <= 25000) { // 適当
                ret = back_search(front, back, output);
                back = output;
                output = new Array();
                b_len = back.length;                
            } else {
                ret = search(front, back, output);
                front = output;
                front = pruning(front);
                output = new Array();
                f_len = front.length;
            }
            i++
        } 
        return ret;
    }
    this.solve = solve;
}

function test() {
    //var b = {'w': 3, 'h': 3, 'board': '12=45607='};
    //var b = {'w': 2, 'h': 2, 'board': '1203'};
    //var b = {'w': 3, 'h': 3, 'board': '123460=58'};
    //var b = {'w':3, 'h':4, 'board':'5362190=B47A'};
    //var b = {'w':3, 'h':4, 'board':'1327A40=5B96'};
    //var b = {'w':3, 'h':3, 'board':'168452=30'};
    //var b = {'w':4, 'h':4, 'board':'32465871FAC0=9BE'};
    ///var b = {'w':4, 'h':4, 'board':'82C=9B1E05736ADF'};
    //var b = {'w':5, 'h':3, 'board':'506AE418=D=32C7'};
    //var b = {'w':3, 'h':5, 'board':'=74A86E39BD20C5'};
    var b = {'w':5, 'h':6, 'board':'B61D5H=42C0398A=IPRJESKMNLQOTF'};
    //var b = {'w':5, 'h':6, 'board':'=712=E4D9HIF8=GN576LOABMTPKQSR0J'};

    var solver = new BreathFirstBackSolver(b);
    ret = solver.solve();
    console.log(ret);
}

//test();
