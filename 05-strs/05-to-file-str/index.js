const ToFileStream = require('./ToFileStr');
const tfs = new ToFileStream();

tfs.write({path: "file1.txt", content: "Hello"});
tfs.write({path: "file2.txt", content: "Node.js"});
tfs.write({path: "file3.txt", content: "Stream"});
tfs.end(()=> console.log("All files created"));
