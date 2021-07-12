import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { InferGetStaticPropsType } from "next";
import { fetchPosts, Post } from "../services/posts";
import useSWR from "swr";
import Layout from "../components/Layout";
import moment from "moment";
import Highlighter from "react-highlight-words";

moment.locale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "1s",
    ss: "%ss",
    m: "1m",
    mm: "%dm",
    h: "1h",
    hh: "%dh",
    d: "1d",
    dd: "%dd",
    M: "1M",
    MM: "%dM",
    y: "1Y",
    yy: "%dY"
  }
});

const navLinks = [
  { title: "Home", active: true, href: null, target: null },
  {
    title: "API",
    active: false,
    href: "https://cryptopanic.com/developers/api/",
    target: "_blank"
  },
  {
    title: "My Github",
    active: false,
    href: "https://www.github.com/leafyshark",
    target: "_blank"
  }
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

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

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function IndexPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { data, error } = useSWR("/api/news", fetcher, {
    initialData: props.posts,
    refreshInterval: 1000
  });

  const posts = props.posts || data;

  return (
    <Layout>
      <Popover as="header" className="pb-24 bg-gray-900">
        {({ open }) => (
          <>
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-screen-xl">
              <div className="relative py-5 flex items-center justify-center lg:justify-between lg:hidden">
                {/* Menu button */}
                <div className="absolute right-0 flex-shrink-0 lg:hidden">
                  {/* Mobile menu button */}
                  <Popover.Button className="bg-transparent p-2 rounded-md inline-flex items-center justify-center text-gray-200 hover:text-white hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Popover.Button>
                </div>
              </div>

              <div className="hidden lg:block border-t border-white border-opacity-20 py-5">
                <div className="grid grid-cols-3 gap-8 items-center">
                  <div className="col-span-2">
                    <nav className="flex space-x-4">
                      {navLinks.map((link) => (
                        <a
                          target={link.target}
                          key={link.title}
                          href={link.href}
                          className={classNames(
                            link.active ? "text-yellow-100" : "text-gray-50",
                            "text-sm font-medium rounded-md bg-white bg-opacity-0 px-3 py-2 hover:bg-opacity-10"
                          )}
                          aria-current={link.active ? "page" : "false"}
                        >
                          {link.title}
                        </a>
                      ))}
                    </nav>
                  </div>
                </div>
              </div>
            </div>

            <Transition.Root show={open} as={Fragment}>
              <div className="lg:hidden">
                <Transition.Child
                  as={Fragment}
                  enter="duration-150 ease-out"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="duration-150 ease-in"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Popover.Overlay
                    static
                    className="z-20 fixed inset-0 bg-black bg-opacity-25"
                  />
                </Transition.Child>

                <Transition.Child
                  as={Fragment}
                  enter="duration-150 ease-out"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="duration-150 ease-in"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Popover.Panel
                    focus
                    static
                    className="z-30 absolute top-0 inset-x-0 max-w-3xl mx-auto w-full p-2 transition transform origin-top"
                  >
                    <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y divide-gray-200">
                      <div className="pt-3 pb-2">
                        <div className="flex items-center justify-between px-4">
                          <div>
                            <img
                              className="h-8 w-auto"
                              src="https://tailwindui.com/img/logos/workflow-mark-gray-600.svg"
                              alt="Workflow"
                            />
                          </div>
                          <div className="-mr-2">
                            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500">
                              <span className="sr-only">Close menu</span>
                              <XIcon className="h-6 w-6" aria-hidden="true" />
                            </Popover.Button>
                          </div>
                        </div>
                        <div className="mt-3 px-2 space-y-1">
                          <a
                            href="#"
                            className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                          >
                            Home
                          </a>
                          <a
                            href="#"
                            className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                          >
                            Profile
                          </a>
                          <a
                            href="#"
                            className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                          >
                            Resources
                          </a>
                          <a
                            href="#"
                            className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                          >
                            Company Directory
                          </a>
                          <a
                            href="#"
                            className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                          >
                            Openings
                          </a>
                        </div>
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition.Child>
              </div>
            </Transition.Root>
          </>
        )}
      </Popover>
      <main className="-mt-24 pb-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="sr-only">Page title</h1>
          {/* Main 3 column grid */}
          <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-4 lg:gap-8">
            {/* Left column */}
            <div className="grid grid-cols-1 gap-4 lg:col-span-2">
              <section aria-labelledby="section-1-title">
                <h2 className="text-lg text-gray-50">
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

            {/* Right column */}
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
          </div>
        </div>
      </main>
      <footer>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
          <div className="border-t border-gray-200 py-8 text-sm text-gray-500 text-center sm:text-left">
            <span className="block sm:inline">&copy; 2021 TLR</span>{" "}
          </div>
        </div>
      </footer>
    </Layout>
  );
}
