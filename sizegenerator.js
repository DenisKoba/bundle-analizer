const glob = require('glob')
const fs = require("fs")
const chalk = require('chalk');

const getBundleSize = async (path) => {
    const sunc = glob.sync(`${path}/**/*.js`)
        .map(filename => {
            const stats = fs.statSync(filename)
            return stats["size"]
        })
        .reduce((sum, current) => { return sum + current }, 0)
    return Promise.resolve(sunc)
}

const fetch = require('node-fetch');

getBundleSize('./lib').then(data => analizeBundleSize(data) )

const twirlTimer = () => {
    const P = ["\\", "|", "/", "-"];
    let x = 0;
    return setInterval(function() {
        process.stdout.write(chalk.blue("\r" + P[x++]));
        x &= 3;
    }, 250)
}

const analizeBundleSize = (nextSize) => {
    twirlTimer()
    fetch('http://localhost:8082/build/analize', {
        method: 'post',
        body: JSON.stringify({ nextSize, repo: 'any' }),
        headers: { 'Content-Type': 'application/json' },
    })
        .then(res => res.json())
        .then((json) => {
            if (json.status) {
                return process.exit(
                    console.log(
                        chalk.green('success')
                    )
                )
            }

            process.exit(
                console.log(
                    chalk.red('fail')
                )
            )
        })
}
