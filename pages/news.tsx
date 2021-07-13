import useSWR from "swr";
import { InferGetStaticPropsType } from "next";
import Highlighter from "react-highlight-words";
import { fetchAllPosts, Post } from "../services/posts";
import { fetcher } from "../services/fetcher";
import { moment } from "../services/moment";
import Layout from "../components/Layout";

interface Props {
  props: {
    posts: Post[];
  };
}

export async function getStaticProps(): Promise<Props> {
  // fetcher function is executed server-side
  const { posts } = await fetchAllPosts();
  return { props: { posts } };
}

export default function IndexPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { data, error } = useSWR("/api/all", fetcher, {
    initialData: props.posts,
    refreshInterval: 10000,
    refreshWhenHidden: true,
    refreshWhenOffline: true
  });

  const posts = data.posts || props.posts;

  return (
    <Layout title="Crypto News Stream">
      <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-1 lg:gap-8">
        <div className="grid grid-cols-1 gap-4 lg:col-span-2">
          <section aria-labelledby="section-1-title">
            <h2 className="text-lg text-gray-50">Real-Time Crypto News Feed</h2>
            <div className="rounded-lg px-6 py-4 bg-white overflow-hidden shadow">
              <ul className="divide-y divide-gray-200">
                {!error ? (
                  posts?.map((item, key) => {
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
