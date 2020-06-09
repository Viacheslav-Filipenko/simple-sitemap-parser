const xml2js = require('xml2js');
const parser = new xml2js.Parser();

exports.parseUrlXml = async (data) => {
	const result = await parser.parseStringPromise(data.trim());

	return result.urlset.url.map((url) => url.loc[0]);
};

exports.parseSitemap = async (data) => {
	const result = await parser.parseStringPromise(data.trim());

	return result.sitemapindex.sitemap.map((url) => url.loc[0]);
};
