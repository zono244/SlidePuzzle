
ManualSolver = function (b) {
    this.mBoard = new Object();
    this.mBoard.w = b.w;
    this.mBoard.h = b.h;
    this.mBoard.board = b.board;
    
    var idx_tbl = ['1','2','3','4','5','6','7','8','9',
               'A','B','C','D','E','F','G','H','I',
               'J','K','L','M','N','O','P','Q','R',
               'S','T','U','V','W','X','Y','Z'];
    
    function move(b, i, j) {
        a = b.board.split('');
        tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
        b.board = a.join('');
        return b;
    };
    function moveU (b) {
        s = b.board;
        var idx = s.indexOf('0');
        if (idx - b.w <  0 || s.charAt(idx - b.w) == '=') {
            return b;
        }
        return move(b, idx, idx - b.w);
    };
    function moveL(b) {
        s = b.board;
        var idx = s.indexOf('0');
        if (idx % b.w == 0 || s.charAt(idx- 1) == '=') {
            return b;
        }
        return move(b, idx,idx-1);
    };
    function moveR(b) {
        s = b.board;
        var idx = s.indexOf('0');
        if ((idx + 1) % b.w == 0 || s.charAt(idx + 1) == '=') {
            return b;
       }
        return move(b, idx, idx + 1);
    };
    function moveD(b) {
        s = b.board;
        var idx = s.indexOf('0');
        if (idx + b.w >= b.board.length || s.charAt(idx + b.w) == '=') {
            return b;
        }
        return move(b, idx, idx + b.w);
    };
    function is_finished(b) {
        var a = b.board.split('');
        if (b.board.split('=').join('').last() != '0') {
            return false;
        }
        for (i = 0; i < a.indexOf('0'); i++) {
            if (a[i] != '=' && idx_tbl.indexOf(a[i]) != i) {
                return false;
            }
        }
        return true;
    };
    function print(b) {
        var i = 0;
        console.log('------');
        while (i < b.board.length) {
            s = b.board.substr(i, b.w);
            console.log(s);
            i += b.w;
        }
    };
    this.solve = function(){
        var board = this.mBoard;
        var ret = '';
        var readline = require('readline'),
            rl = readline.createInterface(process.stdin, process.stdout),
            prefix = 'OHAI> ';
        
        rl.on('line', function(line) {
        switch(line.trim()) {
            case 'u':
                board = moveU(board);
                ret += 'U';
                break;
            case 'l':
                board = moveL(board);
                ret += 'L';
                break;
            case 'd':
                board = moveD(board);
                ret += 'D';
                break;
            case 'r':
                board = moveR(board);
                ret += 'R';
                break;
            default:
                break;
            }
            if (is_finished(board)) {
                console.log('Finished!!!  %s', ret);
                return ret;
                process.exit(0);
            } else {
                print(board);
                rl.setPrompt(prefix, prefix.length);
                rl.prompt();                
            }
        }).on('close', function() {
            process.exit(0);
        });
        print(board);
        rl.setPrompt(prefix, prefix.length);
        rl.prompt();
    };
}
