const fs = require('fs');

exports.writeToFile = (filePath, data) => {
	return new Promise((resolve, reject) => {
		fs.writeFile(filePath, data, { flag: 'w' }, function (err) {
			if (err) {
				reject(err);
			}
			resolve();
		});
	});
};

exports.checkIfDirectoryExist = (dir) => fs.existsSync(dir);

exports.createDirectory = (dir) => fs.mkdirSync(dir);
