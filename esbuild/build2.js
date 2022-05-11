let envPlugin = {
    name: 'env',
    setup(build) {
      build.onResolve({ filter: /^env$/ }, args => {
        console.log(args)

        return {
            path: args.path,
            namespace: 'env-ns',
        }
      })
  
      build.onLoad({ filter: /.*/, namespace: 'env-ns' }, () => {
        console.log(process.env)
        return {
          contents: JSON.stringify(process.env),
          loader: 'json',
        }
      })
    },
}

require('esbuild').build({
    entryPoints: ['src/index1.jsx'],
    bundle: true,
    outfile: 'out.js',
    // 应用插件
    // plugins: [envPlugin],
  }).catch(() => process.exit(1))