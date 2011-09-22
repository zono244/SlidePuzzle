var fs = require('fs')

var util  = require('util'),
    spawn = require('child_process').spawn;

var start = 0;
var end = 5000;
var limit = process.argv[2];

function run(i) {
    var cur = i;
    var clbk = function() {
        process.stderr.write('TimeOut ' + cur + "\n");
        process.stdout.write('\n');
        clearTimeout(timer);
        node.kill();
    };
    var timer = setTimeout(clbk, limit);

    var node = spawn('node', ['solver.js', i]);
    node.stdout.on('data', function(data) {
        process.stderr.write('Solved ' + cur + ":" + data + "\n");
        process.stdout.write(data + "\n");
    });
    node.on('exit', function (code) {
        clearTimeout(timer);
        if (cur + 1 < end) {
            run(cur + 1);
        }
    });
};

run(start);
