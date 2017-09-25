const Vue = require("vue");
const server = require("express")();
const renderer = require("vue-server-renderer").createRenderer({
	template: require("fs").readFileSync("./src/index.template.html", "utf-8"),
});

server.get("*", (req, res) => {
	const app = new Vue({
		data: {
			url: req.url
		},
		template: `<div>The visited URL is: {{ url }}</div>`
	});

	const context = {
		title: "Vue SSR POC",
		meta: ``,
	};

	renderer.renderToString(app, (err, html) => {
		// if(err) {
		// 	res.status(500).end("Internal Server Error.");
		// 	return;
		// }
		//
		// console.log(html);

		// res.end(`
		// 	<!DOCTYPE html>
		// 	<html lang="en">
		// 		<head><title>Vue SSR POC</title></head>
		// 		<body>${html}</body>
		// 	</html>
		// `);
	});
});

server.listen(8080);
