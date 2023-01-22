export default class QueryExtractorCommand {
  constructor(queryExtractorService) {
    this.queryExtractorService = queryExtractorService
  }

  execute(query, lang) {
    
    return this.queryExtractorService.execute(query, lang);
  }
}