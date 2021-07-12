import React from "react";

const navigation = [
  { name: "About", href: "#" },
  { name: "Contact", href: "#" },
  { name: "FAQs", href: "#" },
  { name: "Company", href: "#" }
];

export default function Header() {
  return (
    <header>
      <div className="logo w-screen">
        <div className="sb-logo-inner w-full h-4 lg:h-16 flex justify-between items-center">
          <div className="sb-line"></div>
          <div className="sb-main-logo">
            <h2 className="uppercase text-xl md:text-2xl lg:text-4xl">
              <div className="text-gray-100 logo">Terminal</div>
            </h2>
          </div>
          <div className="sb-line"></div>
        </div>
      </div>

      <div className="px-2 pt-2 pb-3 space-y-1">
        {navigation.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
          >
            {item.name}
          </a>
        ))}
      </div>
    </header>
  );
}
