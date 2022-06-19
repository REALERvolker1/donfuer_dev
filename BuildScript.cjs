const fs = require('node:fs')

const distFile = "./dist/index.html"

const html = fs.readFileSync(distFile).toString()
const newHTML = html.replace(/assets/g,"donfuer_dev/assets")
console.log(`${html}\n\nReplaced with\n\n${newHTML}`)
fs.writeFileSync(distFile,newHTML)