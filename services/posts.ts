export interface Post {
  title: string;
  published_at: string;
  source: object;
  url: string;
  currencies: object[];
}

export async function fetchPosts() {
  const url = "https://cryptopanic.com";
  const key = process.env.CRYPTO_PANIC_API_KEY;
  const path = `/api/v1/posts/?auth_token=${key}&public=true&filter=`;

  const APIManager = {
    bearish: () => fetch(url + path + "bearish").then((res) => res.json()),
    bullish: () => fetch(url + path + "bullish").then((res) => res.json())
  };

  const delay = (ms: number) => new Promise((_) => setTimeout(_, ms));

  const bearish = await delay(1000).then(() => APIManager.bearish());
  const bullish = await delay(1000).then(() => APIManager.bullish());

  return { bullish: bullish.results, bearish: bearish.results };
}
