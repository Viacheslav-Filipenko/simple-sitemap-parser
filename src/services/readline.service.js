const readline = require('readline');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

exports.askQuestion = (message) => {
	return new Promise((resolve, reject) => {
		rl.question(message, (answer) => {
			try {
				resolve(answer);
			} catch (error) {
				reject(error);
			}
		});
	});
};
