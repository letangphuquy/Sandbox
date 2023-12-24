"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

function Nav() {
  const {data : session} = useSession();
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const func = async () => {
      const result = await getProviders();
      console.log("Provider = ", result)
      setProviders(result)
    }
    func()
  },
    [])

  function SignIn() {
    return (<>
      {providers ? Object.values(providers).map((provider) =>
        <button
          type="button"
          key={provider.name}
          onClick={() => {
            signIn(provider.id)}}
          className="black_btn"
        >
          Sign In
        </button>
      ) :
        (<></>)
      }
    </>)
  }

  const [toggleDropdown, setToggleDropdown] = useState(false);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Logo"
          width={30}
          height={30}
          className="object-contain"
        ></Image>
        <p className="logo_text"  >
          Promptopia
        </p>
      </Link>

      {/* Desktop navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link
              href="/create-prompt"
              className="black_btn">
              Create Post
            </Link>

            <button
              type="button"
              onClick={signOut}
              className="outline_btn"
            >
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                alt="profile"
                className="rounded-full"
                onClick={() => {
                  setToggleDropdown((prev) => !prev)
                }
                }
              >
              </Image>
            </Link>
          </div>
        ) :
          <SignIn></SignIn>
        }
      </div>
      {/* Mobile navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ?
          (<>
            <div className="flex">
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="Dropdown Menu"
                onClick={() => {
                  setToggleDropdown((prev) => !prev)
                }
                }
              >
              </Image>
            </div>
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => { setToggleDropdown(false) }}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => { setToggleDropdown(false) }}
                >
                  Create Post
                </Link>
                <button
                  type="button"
                  onClick={ () => { setToggleDropdown(false); signOut() }}
                  className="black_btn w-full mt-3"
                >
                  Sign Out
                </button>
              </div>
            )}
          </>
          ) :
          <SignIn></SignIn>
        }
      </div>
    </nav>
  );
};

export default Nav;
