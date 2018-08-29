module.exports = {
	scrape: (res) => {
		const PROMISES = [];
		const set = new Set();
		PROMISES.push(new Promise((resolve, reject) => {
			sb(resolve, set);
		}));

		PROMISES.push(new Promise((resolve, reject) => {
			dj(resolve, set);
		}));

		PROMISES.push(new Promise((resolve, reject) => {
			hsbs(resolve, set);
		}));

		PROMISES.push(new Promise((resolve, reject) => {
			uex(resolve, set);
		}));

		Promise.all(PROMISES).then(values => {
			console.log(set);
			d = new Date();
			res.render('index', {date: d.toDateString(), time: d.getHours() + ":" + d.getMinutes(), data: values});
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

function sb(resolve, set){
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
			let s = "1000";
			if (inner.eq(3).text() != "N/A"){
				s = inner.eq(3).text();
			}
			let c = inner.eq(1).text().slice(-4).slice(0, 3);
			set.add(c);
			data.push({
				country: inner.eq(0).text(),
				code: c,
				buy: inner.eq(2).text(),
				sell: s
			});
		});
		data.shift();
		let d = ["Scotiabank", data];
		console.log(d);
		resolve(d);
	})
	.catch((err) => {
		console.log("BMO retrieve fail");
		console.log(err);
	});
}

function dj(resolve, set){
	const cheerio = require("cheerio");
	const rp = require("request-promise");

	const options = {
		uri: "https://www.desjardins.com/ca/rates-returns/exchange-rates/cheques-drafts-wire-transfers/",
		transform: function(body){
			return cheerio.load(body);
		}
	}
	rp(options)
	.then(($) => {
		let data = [];
		$("tbody").children().each((i, elem) => {
			const inner = $("tbody").children().eq(i).children();
			let c = inner.eq(2).text();
			set.add(c);
			data.push({
				country: inner.eq(0).text(),
				code: inner.eq(2).text(),
				buy: inner.eq(3).text(),
				sell: inner.eq(4).text()
			});
		});
		let d = ["Desjardins", data];
		console.log(d);
		resolve(d);
	})
	.catch((err) => {
		console.log("Desjardins retrieve fail");
		console.log(err);
	});
}

function hsbs(resolve, set){
	const cheerio = require("cheerio");
	const rp = require("request-promise");

	const options = {
		uri: "https://www.desjardins.com/ca/rates-returns/exchange-rates/cheques-drafts-wire-transfers/",
		transform: function(body){
			return cheerio.load(body);
		}
	}
	rp(options)
	.then(($) => {
		let data = [];
		$("tbody").first().children().each((i, elem) => {
			const inner = $("tbody").first().children().eq(i).children();
			let c = inner.eq(2).text();
			set.add(c);
			data.push({
				country: inner.eq(0).text(),
				code: inner.eq(2).text(),
				buy: inner.eq(3).text(),
				sell: inner.eq(4).text()
			});
		});
		let d = ["HSBS", data];
		console.log(d);
		resolve(d);
	})
	.catch((err) => {
		console.log("HSBS retrieve fail");
		console.log(err);
	});
}

function uex(resolve, set){
	const cheerio = require("cheerio");
	const rp = require("request-promise");

	const options = {
		uri: "https://www.uexchange.ca/exchange-rates.php",
		transform: function(body){
			return cheerio.load(body);
		}
	}
	rp(options)
	.then(($) => {
		let data = [];
		$("tbody").first().children().each((i, elem) => {
			const inner = $("tbody").first().children().eq(i).children();
			let c = inner.eq(2).text();
			set.add(c);
			data.push({
				country: inner.eq(0).text().slice(2),
				code: inner.eq(2).text(),
				buy: inner.eq(3).text(),
				sell: inner.eq(4).text()
			});
		});
		data.shift();
		let d = ["UEX", data];
		console.log(d);
		resolve(d);
	})
	.catch((err) => {
		console.log("UEX retrieve fail");
		console.log(err);
	});
}