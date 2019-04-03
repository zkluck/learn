const path = require("path");
const ROOT = process.env.ROOT.trim();

exports.resolve = (dir) => {
	return path.resolve(ROOT, dir);
}