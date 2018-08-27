module.exports = {
	scrape: (res) => {
		const PROMISES = [];

		PROMISES.push(new Promise((resolve, reject) => {
			sb(resolve);
		}));

		Promise.all(PROMISES).then(values => {
			//console.log(values);
			res.render('index', {date: new Date().toDateString(), data: values});
		});
	}
}

function bmo(){
	const cheerio = require("cheerio");
	const rp = require("request-promise");

	const options = {
		uri: "http://www.scotiabank.com/rates/fxrates.html",
		transform: function(body){
			return cheerio.load(body);
		}
	}

	rp(options)
	.then(($) => {
		console.log($.html());

		// const currencies = $(".currency-col").contents().length;
		// const buys = $(".buy-col").contents();
		// const sell = $(".sell-col").contents();
		// console.log(currencies);
		// console.log(buys);
		// console.log(sell);
		//NEED SELENIUM
	})
	.catch((err) => {
		console.log("BMO retrieve fail");
		console.log(err);
	});
}

function td(){
	//sele
}

function rbc(){
	//selenium
}

function sb(resolve){
	const cheerio = require("cheerio");
	const rp = require("request-promise");

	const options = {
		uri: "http://www.scotiabank.com/rates/fxrates.html",
		transform: function(body){
			return cheerio.load(body);
		}
	}
	rp(options)
	.then(($) => {
		let data = [];
		//console.log($("tbody").children().first().children().first().text());
		$("tbody").children().each((i, elem) => {
			const inner = $("tbody").children().eq(i).children();
			data.push({
				country: inner.eq(0).text(),
				code: inner.eq(1).text(),
				buy: inner.eq(2).text(),
				sell: inner.eq(3).text()
			});
		});
		resolve(data);
		//return data;
	})
	.catch((err) => {
		console.log("BMO retrieve fail");
		console.log(err);
	});
}

function dj(){
	//normal scrape
}

function hsbs(){
	//normal scrape
}

function uex(){
	//normal
}