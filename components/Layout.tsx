'use client';

import { useLayoutEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Bounce, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import { useAuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { logOut } from '@/lib/firebase-auth';

import useProfile from '@/hooks/useProfile';

import User from '@/public/assets/user.png';
import Logo from '@/public/assets/logo.png';
import { MdDashboard, MdCollectionsBookmark, MdQuiz } from 'react-icons/md';
import { GiHamburgerMenu } from 'react-icons/gi';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useAuthContext();
  const userData = useProfile();

  const router = useRouter();
  const pathname = usePathname();
  const currentRootPath = pathname.split('/')[1] || 'dashboard';

  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const [toggleNavDesktop, setToggleNavDesktop] = useState<boolean>(true);
  const [toggleNavMobile, setToggleNavMobile] = useState<boolean>(false);

  useLayoutEffect(() => {
    const handleResize = () => {
      const width: number = window.innerWidth;

      if (width <= 767) {
        setIsDesktop(false);
      } else {
        setIsDesktop(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // useEffect(() => {
  //   if (!user) {
  //     router.replace('/login');
  //   }

  // }, [userData, user, router])

  // TEMP
  const handleLogout = async () => {
    await fetch('/api/logout', { method: "POST" });
    logOut()
  }

  return (
    <>
      <div className="flex h-screen flex-col">
        {currentRootPath === 'login' ? (
          <main>
            {children}
          </main>
        ) : (
          <>
            {/* Header */}
            <header className="flex flex-row w-screen px-6 py-2 bg-blue shadow-md fixed justify-between items-center z-40">
              <GiHamburgerMenu
                className='hover:cursor-pointer'
                size={25}
                color='white'
                onClick={() => setToggleNavMobile(prev => !prev)}
              />
              <div className="flex flex-row gap-4 items-center">
                <p className="font-poppins text-white font-semibold text-md">{userData.username}</p>
                <div className="py-1 px-2 bg-white rounded-full border-2 border-primary-blue overflow-hidden">
                  <Image 
                    src={userData.profileImg ? userData.profileImg : User}
                    width={15}
                    height={10}
                    alt="Profile Image"
                    onClick={handleLogout}
                  />
                </div>
              </div>
            </header>
            {/* Sidebar */}
            <div className={`flex-col h-screen top-0 left-0 bg-white shadow-xl fixed transition-all duration-500 ${isDesktop && (toggleNavDesktop ? 'w-60' : 'w-20')} ${!isDesktop && (toggleNavMobile ? 'translate-x-0 w-60' : '-translate-x-60 w-60')} z-50`}>
              <div className="flex py-5 px-5 justify-end">
                {!isDesktop ? (
                  <span
                    className="hover:cursor-pointer flex font-montserrat text-3xl text-dark-blue font-semibold"
                    onClick={() => setToggleNavMobile(prev => !prev)}
                  >
                    x
                  </span>
                ) : (
                  <div
                    className={`hover:cursor-pointer flex py-[0.1em] px-[0.2em] w-[2.5em] rounded-2xl border-2 border-primary-blue ${toggleNavDesktop && 'justify-end'}`}
                    onClick={() => setToggleNavDesktop(prev => !prev)}
                  >
                    <div className="transition-all w-1/2 h-[0.9em] rounded-full bg-tertiary-theme" />
                  </div>
                )}
              </div>
              <div className={`flex py-5 justify-center transition-all duration-300 ${!toggleNavDesktop && isDesktop && 'scale-10 opacity-0'}`}>
                <Image
                  src={Logo}
                  width={200}
                  height={200}
                  alt="Mathuto Logo"
                />
              </div>
              <div className="flex-col my-10">
                <Link href='/dashboard'>
                  <div id="nav-dashboard" className={`relative flex py-4 hover:cursor-pointer hover:text-blue ${currentRootPath === 'dashboard' && 'bg-lightWhite text-blue'}`}>
                    {currentRootPath === 'dashboard' && <div className="absolute h-full left-0 top-0 w-2 bg-primary-blue" />}
                    <div className="flex flex-row ml-8 gap-4 items-center">
                      <MdDashboard size={20} />
                      <h3 className={`font-montserrat font-medium text-sm transition-all duration-300 ${!toggleNavDesktop && isDesktop && 'opacity-0 absolute'}`}>My Dashboard</h3>
                    </div>
                  </div>
                </Link>
                <Link href='/modules'>
                  <div id="nav-modules" className={`relative flex py-4 hover:cursor-pointer hover:text-blue ${currentRootPath === 'modules' && 'bg-lightWhite text-blue'}`}>
                    {currentRootPath === 'modules' && <div className="absolute h-full left-0 top-0 w-2 bg-primary-blue" />}
                    <div className="flex flex-row ml-8 gap-4 items-center">
                      <MdCollectionsBookmark size={20} />
                      <h3 className={`font-montserrat font-medium text-sm transition-all duration-300 ${!toggleNavDesktop && isDesktop && 'opacity-0 absolute'}`}>My Modules</h3>
                    </div>
                  </div>
                </Link>
                <Link href='/quizzes'>
                  <div id="quizzes" className={`relative flex py-4 hover:cursor-pointer hover:text-blue ${currentRootPath === 'quizzes' && 'bg-lightWhite text-blue'}`}>
                    {currentRootPath === 'quizzes' && <div className="absolute h-full left-0 top-0 w-2 bg-primary-blue" />}
                    <div className="flex flex-row ml-8 gap-4 items-center">
                      <MdQuiz size={20} />
                      <h3 className={`font-montserrat font-medium text-sm transition-all duration-300 ${!toggleNavDesktop && isDesktop && 'opacity-0 absolute'}`}>My Quizzes</h3>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            <main className={`transition-all duration-500 mt-20 px-5 ${!toggleNavDesktop ? 'lg:ml-20 md:ml-20' : 'md:ml-60 lg:ml-60'} z-5`}>
              {children}
            </main>
          </>
        )}
        <ToastContainer 
            position="top-right"
            autoClose={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            theme="light"
            transition={Bounce}
        />
      </div>
    </>
  );
}
