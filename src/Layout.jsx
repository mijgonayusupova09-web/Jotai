import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Button } from '@mui/material'
const Layout = () => {
  return (
    <>
      <header className='max-w-[1300px] m-auto p-4'>
        <nav className='flex items-center justify-center gap-[20px]'>
            <Link to='/home'>
              <Button>home</Button>
            </Link>
            <Link to='/sync'>
              <Button>Sync</Button>
            </Link>
            <Link to='/async'>
              <Button>Async</Button>
            </Link>
        </nav>
      </header>
      <main className='max-w-[1300px] m-auto p-4'>
         <Outlet/>
      </main>
    </>
  )
}

export default Layout