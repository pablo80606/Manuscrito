const { handler } = require('./index.js');

(async () => {
  const event = {
    requestContext: { http: { method: 'POST' } },
    rawPath: '/clue',
    body: JSON.stringify({
      manuscript: [
        "AAHTQE",
        "ARLOAE",
        "AARAVG",
        "AEAGAL",
        "EeSILE",
        "BRINDS"
      ]
    }),
  };

  const result = await handler(event);
  console.log(result);
})();