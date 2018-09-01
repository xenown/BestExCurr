module.exports = {
	scrape: (res) => {
		const PROMISES = [];
		const set = new Set();
		const map = {count: 0};
		const d = [[], [], [], [], [], []];
		PROMISES.push(new Promise((resolve, reject) => {
			sb(resolve, set, d, map);
		}));

		PROMISES.push(new Promise((resolve, reject) => {
			dj(resolve, set, d, map);
		}));

		PROMISES.push(new Promise((resolve, reject) => {
			hsbs(resolve, set, d, map);
		}));

		PROMISES.push(new Promise((resolve, reject) => {
			uex(resolve, set, d, map);
		}));

		Promise.all(PROMISES).then(values => {
			console.log(set);
			console.log(set.size);
			console.log(d[0].length);
			console.log(d[1].length);
			console.log(d[2].length);
			console.log(d[3].length);
			console.log(d[4].length);
			console.log(d[5].length);

			console.log(d);
			D = new Date();
			res.render('index', {date: D.toDateString(), time: D.getHours() + ":" + D.getMinutes(), data: d});
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

function sb(resolve, set, d, map){
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
		for (let i = 1; i < $("tbody").children().length; i++){
			const inner = $("tbody").children().eq(i).children();
			let c = inner.eq(1).text().slice(-4).slice(0, 3);
			if (set.has(c)){
				d[2][map[c]] = [inner.eq(2).text(), inner.eq(3).text()];
			} else {
				set.add(c);
				let index = map.count;
				d[0][index] = inner.eq(0).text();
				d[1][index] = c;
				d[2][index] = [inner.eq(2).text(), inner.eq(3).text()];
				d[3][index] = d[4][index] = d[5][index] = ["N/A", "N/A"];
				map[c] = index;
				map.count++;
				//console.log(d);
			}
			// let s = "1000";
			// if (inner.eq(3).text() != "N/A"){
			// 	s = inner.eq(3).text();
			// }
			
			//set.add(c);
			// data.push({
			// 	country: inner.eq(0).text(),
			// 	code: c,
			// 	buy: inner.eq(2).text(),
			// 	sell: s
			// });
		}
		// let D = ["Scotiabank", data];
		// console.log(D);
		// resolve(D);
		resolve();
	})
	.catch((err) => {
		console.log("BMO retrieve fail");
		console.log(err);
	});
}

function dj(resolve, set, d, map){
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
		for (let i = 0; i < $("tbody").children().length; i++){
			const inner = $("tbody").children().eq(i).children();
			let c = inner.eq(2).text();
			if (set.has(c)){
				d[3][map[c]] = [inner.eq(3).text(), inner.eq(4).text()];
			} else {
				set.add(c);
				let index = map.count;
				d[0][index] = inner.eq(0).text();
				d[1][index] = c;
				d[3][index] = [inner.eq(3).text(), inner.eq(4).text()];
				d[2][index] = d[4][index] = d[5][index] = ["N/A", "N/A"];
				map[c] = index;
				map.count++;
				//console.log(d);
			}

			// set.add(c);
			// data.push({
			// 	country: inner.eq(0).text(),
			// 	code: inner.eq(2).text(),
			// 	buy: inner.eq(3).text(),
			// 	sell: inner.eq(4).text()
			// });
			// console.log("2");
		}
		// let D = ["Desjardins", data];
		// console.log(D);
		// resolve(D);
		resolve();
	})
	.catch((err) => {
		console.log("Desjardins retrieve fail");
		console.log(err);
	});
}

function hsbs(resolve, set, d, map){
	const cheerio = require("cheerio");
	const rp = require("request-promise");

	const options = {
		uri: "https://www.hsbc.ca/1/2/personal/banking/accounts/foreign-currency-accounts/foreign-currency-exchange",
		transform: function(body){
			return cheerio.load(body);
		}
	}
	rp(options)
	.then(($) => {
		for (let i = 1; i < $("tbody").first().children().length; i++){
			const inner = $("tbody").first().children().eq(i).children();
			let c = inner.eq(1).text();
			if (set.has(c)){
				d[4][map[c]] = [inner.eq(2).text(), inner.eq(3).text()];
			} else {
				set.add(c);
				let index = map.count;
				d[0][index] = inner.eq(0).text();
				d[1][index] = c;
				d[4][index] = [inner.eq(2).text(), inner.eq(3).text()];
				d[2][index] = d[3][index] = d[5][index] = ["N/A", "N/A"];
				map[c] = index;
				map.count++;
				//console.log(d);
			}
			// set.add(c);
			// data.push({
			// 	country: inner.eq(0).text(),
			// 	code: inner.eq(2).text(),
			// 	buy: inner.eq(3).text(),
			// 	sell: inner.eq(4).text()
			// });
			// console.log("3");
		}
		// let D = ["HSBS", data];
		// console.log(D);
		// resolve(D);
		resolve();
	})
	.catch((err) => {
		console.log("HSBS retrieve fail");
		console.log(err);
	});
}

function uex(resolve, set, d, map){
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
		for (let i = 1; i < $("tbody").first().children().length; i++){
			const inner = $("tbody").first().children().eq(i).children();
			let c = inner.eq(2).text();
			if (set.has(c)){
				d[5][map[c]] = [inner.eq(4).text(), inner.eq(3).text()];
			} else {
				set.add(c);
				let index = map.count;
				d[0][index] = inner.eq(0).text().slice(2);
				d[1][index] = c;
				d[5][index] = [inner.eq(4).text(), inner.eq(3).text()];
				d[2][index] = d[3][index] = d[4][index] = ["N/A", "N/A"];
				map[c] = index;
				map.count++;
				//console.log(d);
			}
			// set.add(c);
			// data.push({
			// 	country: inner.eq(0).text().slice(2),
			// 	code: inner.eq(2).text(),
			// 	buy: inner.eq(4).text(),
			// 	sell: inner.eq(3).text()
			// });
			// console.log("4");
		}
		// let D = ["UEX", data];
		// console.log(D);
		// resolve(D);
		resolve();
	})
	.catch((err) => {
		console.log("UEX retrieve fail");
		console.log(err);
	});
}