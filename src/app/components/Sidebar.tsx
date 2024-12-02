'use client'
import React, { useState, createContext, useContext } from 'react'
import clsx from 'clsx'

import Image from 'next/image'
import Link from 'next/link'

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';


const SidebarContext = createContext()

export const useSidebar = () => useContext(SidebarContext);

const Sidebar = () => {

  const [isSidebarOpen, setIsSideBarOpen] = useState(false)

  const toggleSidebar = () => { setIsSideBarOpen((prev) => !prev) }



  return (
    <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
      <nav className={clsx(
        'bg-white min-h-screen shadow-md flex flex-col transition-all duration-300',
        {
          'w-[240px]': isSidebarOpen,
          'w-[80px]': !isSidebarOpen
        }
      )}>

        {/* header */}
        <div className = {clsx(
          'flex p-4 items-center',
          {
            'justify-between' : isSidebarOpen,
            'justify-center' : !isSidebarOpen
          }
        )}>
            <Link href="/">
              <Image
                src='/logo.png'
                alt='gymskii logo'
                width={isSidebarOpen ? 100 : 0}
                height={isSidebarOpen ? 100 : 0}
                className = {clsx(
                  'transition-all duration-300 overflow-hidden', 
                  {
                    'opacity-100 scale-100': isSidebarOpen,
                    'opacity-0 scale-0': !isSidebarOpen,
                  }
                )}
              />
            </Link>

          <button onClick={toggleSidebar}>
            {isSidebarOpen
              ?
              <ChevronLeftIcon className='w-6 h-6 transition-all' />
              :
              <ChevronRightIcon className='w-6 h-6 transition-all' />
            }

          </button>
        </div>

        {/* Layout container */}
        <div className='flex flex-1 flex-col justify-between'>

          {/* top portion links + button */}
          <div>
            {/* Primary Nav-links */}
            <ul className='mt-8'>
              <SidebarLinks
                link="/"
                name="Dashboard"
                icon=<DashboardIcon className='w-5 h-5' />
              />
              <SidebarLinks
                link="/workout-history"
                name="Workout History"
                icon=<FitnessCenterIcon className='w-5 h-5' />
              />
              <SidebarLinks
                link="/progress"
                name="Progress"
                icon=<TrendingUpIcon className='w-5 h-5' />
              />
              <SidebarLinks
                link="/diet-tracker"
                name="Diet Tracker"
                icon=<RestaurantIcon className='w-5 h-5' />
              />
            </ul>

            {/* Log Workout Button */}
            <div className="flex justify-center mt-8">
              <Link href="/log-workout" className = {clsx(
                'bg-brand text-white rounded-md',
                {
                  'px-6 py-2 ' : isSidebarOpen,
                  'text-lg px-2' : !isSidebarOpen
                }
              )}> {isSidebarOpen ? '+ Log Workout' : '+'} </Link>
            </div>
          </div>

          {/* bottom links */}
          <ul>
            <SidebarLinks
              link="/settings"
              name="Settings"
              icon=<SettingsIcon className='w-5 h-5' />
            />
            <SidebarLinks
              link="/faq"
              name="FAQ"
              icon=<HelpIcon className='w-5 h-5' />
            />
          </ul>
        </div>

      </nav>
    </SidebarContext.Provider>

  )
}


const SidebarLinks = ({ link, name, icon }) => {
  
  const {isSidebarOpen} = useSidebar()

  return (
    <li className='px-4 mb-4'>
      <Link href={link} className = {clsx(
        'flex items-center rounded-md font-medium hover:bg-brandHover hover:text-brand group relative',
        {
          'gap-2 pl-2 py-2 h-10' : isSidebarOpen,
          'justify-center h-10 p-4' : !isSidebarOpen
        }
      )}>
        <span
          className="flex justify-center items-center"
          aria-hidden="true"
        >
          {icon}
        </span>
        <span className = {clsx(
          'overflow-hidden transition-all', {
            'w-0' : !isSidebarOpen
          }
        )}>{name}
        </span>

        {!isSidebarOpen &&
          <div className='absolute left-full rounded-md px-2 py-1 ml-6 bg-brandHover
           text-brand w-[130px] text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0'>
            {name}
          </div>
        }


      </Link>
    </li>

  )
}

export default Sidebar
