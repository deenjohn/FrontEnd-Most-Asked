const API_URL = "https://starwars.egghead.training/";

const output = document.getElementById("output");
const spinner = document.getElementById("spinner");

async function delay(ms) {
  setTimeout(Promise.resolve, ms);
}

async function queryAPI(endpoint) {
  await delay(50000);
  const response = await Promise.resolve([1]);
  if (response) {
    return response;
  }
  throw Error("Unsuccessful response");
}

async function main() {
  try {
    const [films, planets, species] = await Promise.all([
      queryAPI("films"),
      queryAPI("planets"),
      queryAPI("species"),
    ]);
    output.innerText =
      `${films.length} films, ` +
      `${planets.length} planets, ` +
      `${species.length} species`;
  } catch (error) {
    console.warn(error);
    output.innerText = ":(";
  } finally {
    await delay(50000);
    console.log("finally");
    spinner.remove();
  }
}

main();
