import useSWR from "swr";
import { InferGetStaticPropsType } from "next";
import Highlighter from "react-highlight-words";
import { fetchPosts, Post } from "../services/posts";
import { moment } from "../services/moment";
import { fetcher } from "../services/fetcher";
import Layout from "../components/Layout";

interface Props {
  props: {
    posts: {
      bearish: Post[];
      bullish: Post[];
    };
  };
}

export async function getStaticProps(): Promise<Props> {
  // fetcher function is executed server-side
  const posts = await fetchPosts();

  return { props: { posts } };
}

export default function IndexPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { data, error } = useSWR("/api/news", fetcher, {
    initialData: props.posts,
    refreshInterval: 1000,
    refreshWhenHidden: true,
    refreshWhenOffline: true
  });

  const posts = props.posts || data;

  return (
    <Layout title="Bullish / Bearish News">
      <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-4 lg:gap-8">
        {/* Left column */}
        <div className="grid grid-cols-1 gap-4 lg:col-span-2">
          <section aria-labelledby="section-1-title">
            <h2 className="text-lg text-gray-50">
              Bullish Real-Time Crypto News Feed
            </h2>
            <div className="rounded-lg px-6 py-4 bg-white overflow-hidden shadow">
              <ul className="divide-y divide-gray-200">
                {!error ? (
                  posts?.bullish.map((item, key) => {
                    const currencies = item.currencies
                      ? item.currencies.map(({ title }) => title)
                      : [];

                    return (
                      <li key={key} className="py-4">
                        <div className="flex space-x-3">
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <div className="flex flex-col">
                                <a
                                  href={item.source.domain}
                                  className="text-xs text-gray-700 hover:text-gray-900"
                                >
                                  {item.source.domain}
                                </a>
                                <a
                                  href={item.url}
                                  target="_blank"
                                  className="hover:text-gray-600"
                                >
                                  <h3 className="text-sm font-medium hover:text-gray-600">
                                    <Highlighter
                                      searchWords={currencies}
                                      autoEscape={true}
                                      highlightTag={({ children }) => (
                                        <span className="text-yellow-500">
                                          {children}
                                        </span>
                                      )}
                                      textToHighlight={item.title}
                                    />
                                  </h3>
                                </a>
                              </div>
                              <p className="text-sm text-gray-500">
                                {moment(item.published_at).fromNow(true)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })
                ) : (
                  <p>Failed to load news...</p>
                )}
              </ul>
            </div>
          </section>
        </div>

        {/* Right column */}
        <div className="grid grid-cols-1 gap-4 lg:col-span-2">
          <section aria-labelledby="section-1-title">
            <h2 className="text-lg lg:text-gray-50 text-gray-900">
              Bearish Real-Time Crypto News Feed
            </h2>
            <div className="rounded-lg px-6 py-4 bg-white overflow-hidden shadow">
              <ul className="divide-y divide-gray-200">
                {!error ? (
                  posts?.bearish.map((item, key) => {
                    const currencies = item.currencies
                      ? item.currencies.map(({ title }) => title)
                      : [];

                    return (
                      <li key={key} className="py-4">
                        <div className="flex space-x-3">
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <div className="flex flex-col">
                                <a
                                  href={item.source.domain}
                                  className="text-xs text-gray-700 hover:text-gray-900"
                                >
                                  {item.source.domain}
                                </a>
                                <a
                                  href={item.url}
                                  target="_blank"
                                  className="hover:text-gray-600"
                                >
                                  <h3 className="text-sm font-medium hover:text-gray-600">
                                    <Highlighter
                                      searchWords={currencies}
                                      autoEscape={true}
                                      highlightTag={({ children }) => (
                                        <span className="text-yellow-500">
                                          {children}
                                        </span>
                                      )}
                                      textToHighlight={item.title}
                                    />
                                  </h3>
                                </a>
                              </div>
                              <p className="text-sm text-gray-500">
                                {moment(item.published_at).fromNow(true)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })
                ) : (
                  <p>Failed to load news...</p>
                )}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
