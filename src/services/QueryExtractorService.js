export default class QueryExtractorService {
  constructor(requestRepository, fileRepository, compile, abc) {
    this.requestRepository = requestRepository
    this.fileRepository = fileRepository
    this.compile = compile
    this.abc = abc
  }

  async execute(query, lang) {
    const dataLetterQueryP = this.abc.map(letter => {

      return this._requestAutocomplete(`${letter} ${query}`, lang)
    })
    const dataQueryLetterP = this.abc.map(letter => {

      return this._requestAutocomplete(`${query} ${letter}`, lang)
    })

    const dataP  = [...dataLetterQueryP, ...dataQueryLetterP]

    const data = await Promise.all(dataP)

    const queries = this._parse(data);

    this.fileRepository.saveToFile('./src/output/queries.txt', queries.join('\n'))
  }

  _parse(data) {
    const convert = this.compile({
      wordwrap: 130
    });

    const unicodeQueries = data.map(unicodeResponse => {

      return unicodeResponse.replace(')]}\'\n[[[', '').split(',')
    }).flat()

    const decodedQueries = unicodeQueries.map(queries => {
      try {

        return decodeURIComponent(
          JSON.parse(queries.replace('[', ''))
        )
      } catch (err) {
        ''
      }
    })
      .filter(Boolean)
      .filter(query => isNaN(query))

    return decodedQueries.map(convert);
  }

  async _requestAutocomplete(query, lang) {
    const res = await this.requestRepository.request({
      url: 'https://www.google.com/complete/search',
      method: 'get',
      params: {
        q: query,
        hl: lang,
        authuser: 0,
        cp: 2,
        client: 'gws-wiz',
        xssi: 't',
        psi: '_HDNY_H-KZC6gAbssLaQBQ.1674408188910',
        dpr: '1'
      },
      headers: {
        'authority': 'www.google.com',
        'accept': '*/*',
        'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
        'cookie': 'CONSENT=PENDING+775; SID=SwhfZfEyzJcQ_v5cQqYsdmiYfkzqDJAcdQ8lNyrxt56a5UC0z7XCpMqNATzPnyeQY_mvpw.; __Secure-1PSID=SwhfZfEyzJcQ_v5cQqYsdmiYfkzqDJAcdQ8lNyrxt56a5UC0UM-2FkTX9-9q3_WU-TJX4w.,__Secure-3PSID=SwhfZfEyzJcQ_v5cQqYsdmiYfkzqDJAcdQ8lNyrxt56a5UC0_i-lc87gNNDwX5x-AwyCug.; HSID=ARnyjOaq2efKcSqkN; SSID=AO9RQQBJEo93_jjhq; APISID=bnzGyLgS57wAUm5o/A_1hnmMwROdbbfV_r; SAPISID=vUuMI8FVRDw-PxqX/ABsUMDucmFxfuKJA-; __Secure-1PAPISID=vUuMI8FVRDw-PxqX/ABsUMDucmFxfuKJA-; __Secure-3PAPISID=vUuMI8FVRDw-PxqX/ABsUMDucmFxfuKJA-; __Secure-ENID=10.SE=p_b74ZTyAwYZocHJs8aOqHfpPeAzAZL_NGrELeILFXaRpo92NjN-BhM3cDN2TKUjv-drW-1ObY0rjel5lNjUn2j4b6UcX1rplrfc08Ra_EIh2O2ErBWpQOLK7DVxXG-Cy25_8-gKuf_jce6aEFCX27jFBDRlxmN36bQNWhDVVvFAun82Kt_BypWKw5qQFUR-NqAKeVXYTAdIzK6495EKfym2-OY; AEC=ARSKqsJSLEwruw1u2E84be2z038fBcxglnm24r4187gu33l_rQtbbo1Cve8; DV=0zOo_i9occQQwMb7DvWOPzNiO-KnXRg; NID=511=qOg1AjT111ODCHsph469uF0jjNglASC0f1pgSrSoTAm5JO7kAoJSWfOpXTPMrsi7nNbYbV_Ogzyl9fisEwigJ9fEq0y027EQMLIrfBmj-V9P-mRVQwrMgfcpKSiOTCcXhOoDOm7PNf1RX5k_dMB27oVn2vWvsxU4VaB4GZsB8xA; SIDCC=AIKkIs0OLILu68thtNEsHPRo0MGfBawyw2MxqHTQQjCYxcPFqnTIM5BUvvSHDVX24iUL38P7zg; __Secure-1PSIDCC=AIKkIs3sicpVPKpEbCZ9QIGvb2swn9szSutEKoZJm2ZsWx1FYZdAygaTvnwF4bRYPNX-tT7UgA; __Secure-3PSIDCC=AIKkIs1szVnMkfh1LyGcrNXZAxNpH_c4DwJ5ttzckAgzE3itSA8HEknHl_owj9WRgU99q1H6zA',
        'referer': 'https://www.google.com/',
        'sec-ch-ua': '"Not_A Brand";v="99", "Google Chrome";v="109", "Chromium";v="109"',
        'sec-ch-ua-arch': '"arm"',
        'sec-ch-ua-bitness': '"64"',
        'sec-ch-ua-full-version': '"109.0.5414.87"',
        'sec-ch-ua-full-version-list': '"Not_A Brand";v="99.0.0.0", "Google Chrome";v="109.0.5414.87", "Chromium";v="109.0.5414.87"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-model': '',
        'sec-ch-ua-platform': '"macOS"',
        'sec-ch-ua-platform-version': '"12.6.1"',
        'sec-ch-ua-wow64': '?0',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
        'x-client-data': 'CIy2yQEIpLbJAQjAtskBCKmdygEIzPrKAQiTocsBCOb1zAEI8frMAQjwgs0BCJ6IzQEI8InNAQj1is0BCJCMzQE=',

      }
    })

    return res.data
  }
}
