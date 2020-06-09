const axios = require('axios');
const path = require('path');

const { askQuestion } = require('./services/readline.service');
const { writeToFile, checkIfDirectoryExist, createDirectory } = require('./services/file.service');
const { parseSitemap, parseUrlXml } = require('./services/xml.service');

const OUTPUT_DIRECTORY = 'sitemap';

const main = async () => {
	try {
		const url = await askQuestion('Enter sitemap url: ');
		const from = parseInt(await askQuestion('Enter from index: ')) - 1;
		const to = parseInt(await askQuestion('Enter to index: '));

		const { data: sitemapResponse } = await axios.get(url);
		const sitemap = await parseSitemap(sitemapResponse);

		if (!checkIfDirectoryExist(OUTPUT_DIRECTORY)) {
			createDirectory(OUTPUT_DIRECTORY);
		}

		for (let i = from; i < to; i += 1) {
			const link = sitemap[i];

			const { data: urlResponse } = await axios.get(link);
			const result = await parseUrlXml(urlResponse);

			const fileName = link.slice(link.lastIndexOf('/'), link.lastIndexOf('.')) + '.txt';

			await writeToFile(
				path.join(__dirname, `../${OUTPUT_DIRECTORY}/${fileName}`),
				result.join(',\n')
			);

			console.log(`file ${fileName} successfully created`);
		}

		console.log('sitemap successfully created');
	} catch (error) {
		console.log(error.message);
	}
};

main();
