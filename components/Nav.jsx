"use client"
import React, { useEffect, useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import { signIn, useSession, signOut, getProviders} from 'next-auth/react'


const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggeleDropDown, setToggeleDropDown] = useState(false);
  
  useEffect(() => {
    const setUPProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    }

    setUPProviders();
  }, []);
  
  return (
    <nav className='w-full flex justify-between items-center pt-3 mb-16'>
      <Link href='/' className='gap-2 flex'>
        <Image
          src='/assets/images/logo.svg'
          alt='logo'
          width={30}
          height={30}
          className='object-contain'
        />
        <p className='logo_text'>Promptopia</p>
      </Link>

      {/* Desktop Navigation */}

      <div className="sm:flex hidden">
        {
          session?.user ? (
            <div className='flex gap-3 md:gap-5'>
              <Link href={"/create-prompt"} className='black_btn'>
                Create Prompt
              </Link>

              <Link
                href='/profile'
                className='black_btn'
                onClick={() => setToggeleDropDown(false)}
              >
                My Profile
              </Link>

              <button type='button' className='outline_btn' onClick={() => signOut({ callbackUrl: 'http://localhost:3000/' })}>
                Sign Out
              </button>

              <Image
                src={`${session?.user?.image}`}
                width={37}
                height={37}
                alt='Profile Image'
                className='rounded-full'
              />
            </div>
            
          ) : (
              <>
                {
                  providers && Object.values(providers).map(provider => (
                    <button
                      key={provider.name}
                      type='button'
                      className='black_btn'
                      onClick={() => signIn(provider.id)}
                    >
                      Sign In
                    </button>
                  ))
                }
              </>
          )
        }
      </div>

      {/* Mobile Navigation */}

      <div className="sm:hidden flex relative">
        {
          session?.user ? (
            <div className="flex">
              <Image
                src={`${session?.user?.image}`}
                alt='Profile'
                width={30}
                height={30}
                className='object-contain'
                onClick={() => setToggeleDropDown((prevState => !prevState))}
              />

              {toggeleDropDown && (
                <div className='dropdown'>
                  <Link
                    href='/profile'
                    className='dropdown_link'
                    onClick={() => setToggeleDropDown(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    href='/create-prompt'
                    className='dropdown_link'
                    onClick={() => setToggeleDropDown(false)}
                  >
                    Create Prompt
                  </Link>
                  <button
                    type='button'
                    onClick={() => {
                      setToggeleDropDown(false);
                      signOut({ callbackUrl: 'http://localhost:3000/' });
                    }}
                    className='mt-5 w-full black_btn'
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
              <>
                {
                  providers && Object.values(providers).map(provider => (
                    <button
                      type='button'
                      className='black_btn'
                      key={provider.name}
                      onClick={() => signIn(provider.id)}
                    >
                      Sign In
                    </button>
                  ))
                }
              </>
          )
        }
      </div>
    </nav>
  )
}

export default Nav