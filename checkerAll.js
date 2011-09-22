require('./sugar-0.9.5.min.js');
require('./checker.js');

var fs = require('fs')

var problem = './problems.txt'
var fname = process.argv[2];

fs.readFile(problem, function(err, data) {
    var input = data.toString().split('\n');
    var limits = input.shift().split(' ');
    var num = input.shift();
    
    var dirs = new Array();
    dirs['l'] = 0;
    dirs['r'] = 0;
    dirs['u'] = 0;
    dirs['d'] = 0;
    fs.readFile(fname, function (err, data) {
        if (err) {
            throw err;
        }
        var solved = 0;
        var results = data.toString().split('\n');
        for (var i = 0; i < num; i++) {
            var quest = input.shift().trim().split(',');
            var board = {'w': Number(quest[0]), 'h': Number(quest[1]), 'board': quest[2]};
            
            var r = results.shift().trim();
            if (r.length <= 0) {
                continue;
            }
            var checker = new Checker(board);
            judge = checker.check(r);
            console.log("Problem " + i + "=>" + judge);
            if (judge) {
                solved++;
            }
            r.each(function(c) {
                dirs[c]++;
            });
        }
        console.log('Solved: ' + solved);
        console.log('Dir[l] ' + (limits[0] >= dirs['l']) + " " + limits[0] + " " + dirs['l']);
        console.log('Dir[r] ' + (limits[1] >= dirs['r']) + " " + limits[1] + " " + dirs['r']);
        console.log('Dir[u] ' + (limits[2] >= dirs['u']) + " " + limits[2] + " " + dirs['u']);
        console.log('Dir[d] ' + (limits[3] >= dirs['d']) + " " + limits[3] + " " + dirs['d']);
    });
});
