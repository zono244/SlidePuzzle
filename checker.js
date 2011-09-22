require('sugar');

Checker = function (b) {
    var Width = b.w;
    var Height = b.h;
    var Board = b.board;
    
    var idx_tbl = ['1','2','3','4','5','6','7','8','9',
               'A','B','C','D','E','F','G','H','I',
               'J','K','L','M','N','O','P','Q','R',
               'S','T','U','V','W','X','Y','Z'];
    
    function move(b, i, j) {
        a = b.split('');
        tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
        return a.join('');
    }
    function moveU (b) {
        var idx = b.split('').indexOf('0');
        if (idx - Width <  0 || b.charAt(idx - Width) == '=') {
            console.log('null1');
            return null;
        }
        return move(b, idx, idx - Width);
    };
    function moveL(b) {
        var idx = b.split('').indexOf('0');
        if (idx % Width == 0 || b.charAt(idx- 1) == '=') {
            console.log('null2');
            return null;
        }
        return move(b, idx, idx-1);
    }
    function moveR(b) {
        var idx = b.split('').indexOf('0');
        if ((idx + 1) % Width == 0 || b.charAt(idx + 1) == '=') {
            console.log('null3');
            console.log(" " + idx + " " + Width);
            console.log(b);
            return null;
       }
        return move(b, idx, idx + 1);
    }
    function moveD(b) {
        var idx = b.split('').indexOf('0');
        if (idx + Width >= b.length || b.charAt(idx + Width) == '=') {
            console.log('null4 ');
            return null;
        }
        return move(b, idx, idx + Width);
    }
    function is_finished(b) {
        var a = b.split('');
        if (b.split('=').join('').last() != '0') {
            return false;
        }
        for (i = 0; i < a.indexOf('0'); i++) {
            if (a[i] != '=' && idx_tbl.indexOf(a[i]) != i) {
                return false;
            }
        }
        return true;
    }
    function print(b) {
        var i = 0;
        console.log('------');
        while (i < b.length) {
            s = b.substr(i, Width);
            console.log(s);
            i += Width;
        }
    };
   function move_to(board, dir) {
        var b = board;
        switch (dir){
            case 'u': return moveU(b); break;
            case 'd': return moveD(b); break;
            case 'r': return moveR(b); break;
            case 'l': return moveL(b); break;
            default:
                console.log("Ugh!: where to go.. %d", dir);
                break;
        }
        return board;
    }
    this.check = function(ret) {
        if (ret.length <= 0) {
            return false;
        }
        var a = ret.split('');
        var b = Board;
        while (a.length > 0) {
            var c = a.shift();
            b = move_to(b, c);
        }
        return is_finished(b);
    };
}

function test() {
//var b = {'w':3, 'h':4, 'board':'1327A40=5B96'};
//var solved = 'drruuulldrrddlluuurdrddlluurrddudududududududududududududud';
//var b = {'w':3, 'h':3, 'board':'168452=30'};
//var solved = 'uldruulddruulddr';
//chk = new Checker(b);
//console.log(chk.check(solved));    
}
