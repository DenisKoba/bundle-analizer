/* eslint-disable */
const glob = require('glob')
const fs = require("fs")
const chalk = require('chalk');
const fetch = require('node-fetch');

const getBundleSize = async (path) => {
    const sync = glob.sync(`${path}/**/*.js`)
        .map(filename => {
            const stats = fs.statSync(filename)
            return stats["size"]
        })
        .reduce((sum, current) => { return sum + current }, 0)

    return Promise.resolve(sync / 100)
}

const twirlTimer = () => {
    const P = ["\\", "|", "/", "-"];
    let x = 0;
    return setInterval(function() {
        process.stdout.write(chalk.blue("\r" + P[x++]));
        x &= 3;
    }, 250)
}

const exit = (color, message, error = '', code) => {
    console.log(chalk[color](message, error))
    process.exit(code)
}

const resolveProcess = (status) => {
    return status === true
        ? exit(
            'green',
            `Bundle size analysis successfully passed 😎. Current bundle size ${nextSize} MB`
        )
        : exit(
            'red',
            'The bundle size is bigger than the previous one on 10%. Please, optimize bundle size. 💊',
            0
        )
}

const analizeBundleSize = (nextSize) => {
    twirlTimer()
    fetch('https://st-bundle-size.herokuapp.com/build/analyze', {
        method: 'post',
        body: JSON.stringify({ nextSize, repo: 'primedate' }),
        headers: { 'Content-Type': 'application/json' },
    })
        .then(res => res.json())
        .then(json => resolveProcess(json.status))
        .catch(error => exit('red', 'Something went wrong', error, 0))
}

const runBuildAnalyzer = () => {
    console.log('Bundle size analysis in progress ⏳')
    getBundleSize('./dist').then(data => analizeBundleSize(data) )
}


runBuildAnalyzer()
