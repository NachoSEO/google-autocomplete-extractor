# Google Autocomplete extractor
NodeJS script to extract Google search autocomplete.

## Requirements
* NodeJS installed

## How to use it
* Download repo
* Add dependencies `yarn` or `npm install`
* Run through the command line: `node src/index.js <seed_query> <lang_country>`. Example: `node src/index.js seo en-US`

## Output
The output will be all the related searches appearing in teh autocomplete that uses the seed query as a base and iterating through the entire alphabet.