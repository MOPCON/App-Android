// To see all the requests in the chrome Dev tools in the network tab.
XMLHttpRequest = GLOBAL.originalXMLHttpRequest ?
  GLOBAL.originalXMLHttpRequest :
  GLOBAL.XMLHttpRequest;

// fetch logger
global._fetch = fetch;
global.fetch = function (uri, options, ...args) {
  return global._fetch(uri, options, ...args).then((response) => {
    console.log('Fetch', { request: { uri, options, ...args }, response });
    return response;
  });
};

console.log(process.env.MOPCON_API_URL);
const schedule = fetch(`${process.env.MOPCON_API_URL}/schedule`);
const codeOfConduct = fetch(`${process.env.MOPCON_API_URL}/code-of-conduct`);
const speaker = fetch(`${process.env.MOPCON_API_URL}/speaker`);
const unconf = fetch(`${process.env.MOPCON_API_URL}/schedule-unconf`);
const sponsor = fetch(`${process.env.MOPCON_API_URL}/sponsor`);
const community = fetch(`${process.env.MOPCON_API_URL}/community`);
const volunteer = fetch(`${process.env.MOPCON_API_URL}/volunteer`);
const carousel = fetch(`${process.env.MOPCON_API_URL}/carousel`);
const news = fetch(`${process.env.MOPCON_API_URL}/news`);

export const reportApiError = () => {
  // report api error to server;
}

export const updateData = () => Promise.all([schedule, codeOfConduct, speaker, unconf, sponsor, community, volunteer, carousel, news])
  .then(responseList => responseList.map(response => response.text()))
  .then(promiseList => Promise.all(promiseList));
