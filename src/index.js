import queryScraperCommand from './providers/providers.js'

const [,,query, lang] = process.argv

console.log(query, lang)

queryScraperCommand.execute(query, lang)