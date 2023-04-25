const APP_ID = process.env.APP_ID;

const fetchInfo = async () => {
  let url;
  if (APP_ID === undefined) {
    url = "https://api-test.innoloft.com/configuration/1";
  } else {
    url = `https://api-test.innoloft.com/configuration/${APP_ID}`;
  }
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export default async function config(req, res) {
  const result = await fetchInfo();
  res.status(200).json(result);
}
