var fs = require('fs')

//require('./manualsolver.js');
require('./breathfirstsolver.js');

var i = process.argv[2];
fname = './problem/p' + i + '.txt';

fs.readFile(fname, function (err, data) {
    if (err) {
        throw err;
    }
    var a = data.toString().trim().split(',');
    var b = {'w': Number(a[0]), 'h': Number(a[1]), 'board': a[2]};

    var solver = new BreathFirstBackSolver(b);
    ret = solver.solve();
    process.stdout.write(ret);
});
