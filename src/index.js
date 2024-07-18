import queryScraperCommand from './providers/providers.js'

const [,,query, lang] = process.argv

queryScraperCommand.execute(query, lang)