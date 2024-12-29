"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname(); // Get the current path

  const checkAuthFromCookies = () => {
    const cookies = document.cookie.split("; ");
    const authToken = cookies.find((cookie) =>
      cookie.startsWith("access_token=")
    );
    setIsLoggedIn(!!authToken);
    setLoading(false);
  };

  useEffect(() => {
    checkAuthFromCookies();

    // Use a mutation observer to detect changes in cookies
    const observer = new MutationObserver(() => {
      checkAuthFromCookies();
    });

    // Observe changes to the `document.cookie`
    observer.observe(document, {
      attributes: true,
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  if (loading) {
    return null;
  }

  return (
    <header className="flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-3 h-[3.5rem]">
      <nav className="px-8 w-full mx-auto sm:flex sm:items-center sm:justify-between">
        <Link
          href="/"
          className="flex-none font-semibold text-xl text-black focus:outline-none focus:opacity-80"
        >
          Tadsheen Quizzes
        </Link>
        <div className="flex flex-row items-center gap-5 mt-5 sm:justify-end sm:mt-0 sm:ps-5">
          {isLoggedIn ? (
            <>
              <Link
                className={`font-medium text-base ${
                  pathname === "/"
                    ? "text-indigo-600"
                    : "text-gray-600 hover:text-gray-400"
                } focus:outline-none`}
                href="/"
                aria-current="page"
              >
                Quiz List
              </Link>
              <Link
                className={`font-medium text-base ${
                  pathname === "/quiz/create"
                    ? "text-indigo-600"
                    : "text-gray-600 hover:text-gray-400"
                } focus:outline-none`}
                href="/quiz/create"
              >
                Create Quiz
              </Link>
              <Link
                className={`font-medium text-base ${
                  pathname === "/my-result"
                    ? "text-indigo-600"
                    : "text-gray-600 hover:text-gray-400"
                } focus:outline-none`}
                href="/my-result"
              >
                My Result
              </Link>
            </>
          ) : (
            <a
              className={`font-bold text-base ${
                pathname === "/login"
                  ? "text-blue-500"
                  : "text-gray-600 hover:text-gray-400"
              } focus:outline-none`}
              href="/login"
            >
              Login
            </a>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
