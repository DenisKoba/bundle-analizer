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

getBundleSize('./dist').then(data => analizeBundleSize(data) )

const twirlTimer = () => {
    const P = ["\\", "|", "/", "-"];
    let x = 0;
    return setInterval(function() {
        process.stdout.write(chalk.blue("\r" + P[x++]));
        x &= 3;
    }, 250)
}

const exit = (color, message, error = '') => {
    process.exit(console.log(chalk[color](message, error)))
}

const analizeBundleSize = (nextSize) => {
    twirlTimer()
    fetch('https://st-bundle-size.herokuapp.com/build/analyze', {
        method: 'post',
        body: JSON.stringify({ nextSize, repo: 'mobile' }),
        headers: { 'Content-Type': 'application/json' },
    })
        .then(res => res.json())
        .then((json) => {
            console.log(json)
            if (json.status) {
                return exit('green', 'success')
            }

            exit('red', 'fail')
        })
        .catch((error) => exit('red', 'fail', error))
}
