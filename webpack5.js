// gatsby does not work with webpack 5 so we keep the default webpack version
// as 4.x.x and alias webpack 5. when building the connection, we can
// override the require function so that it uses 'webpack5' whenever 'webpack'
// is required

var Module = require("module")
const originalRequire = Module.prototype.require
Module.prototype.require = function (request) {
  if (request === "webpack") request = "webpack5"
  return originalRequire.apply(this, arguments)
}
const webpack = require("webpack")
const config = require("./webpack.config")

const compiler = webpack(config)

if (process.argv.indexOf("watch") !== -1) {
  compiler.watch(
    {
      aggregateTimeout: 300,
      poll: undefined,
    },
    (err, stats) => {
      if (err || stats.compilation.errors.length > 0) {
        console.error(err || stats.compilation.errors)
      }
      // Done processing
      console.log("build done")
    }
  )
} else {
  compiler.run((err, stats) => {
    if (err || stats.compilation.errors.length > 0) {
      console.error(err || stats.compilation.errors)
    }
    // Done processing
    console.log("build done")
  })
}
