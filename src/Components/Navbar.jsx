import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, MagnifyingGlassCircleIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, NavLink, useNavigate } from 'react-router-dom'

const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {

  const navigate= useNavigate()
  return (
    <Disclosure as="nav" className="bg-gray-100">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-pink-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                <p className='font-serif text-2xl  text-pink-500'>PixPulse</p>

                </div>

              </div>

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    <NavLink to="/pixpulse/searchuser">   <MagnifyingGlassIcon className='h-6 w-6 mt-4 mx-2 text-pink-500 cursor-pointer'/></NavLink>

                

       <NavLink to="/pixpulse/home"
             className={({ isActive }) =>
               `  ${
                  isActive
                   ? 'bg-pink-500 text-white rounded-md  text-md font-medium h-12 mt-1'
                    : 'text-pink-500 hover:bg-pink-500 hover:text-white text-md font-medium h-12 mt-1 rounded-md '
                
                   }`
                }
             >
             <div className={`py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors`}>
               <p>Home</p>
              </div>
        </NavLink> 

        <NavLink to="/pixpulse/profile"
             className={({ isActive }) =>
               `  ${
                  isActive
                   ? 'bg-pink-500 text-white rounded-md  text-md font-medium h-12 mt-1'
                    : 'text-pink-500 hover:bg-pink-500 hover:text-white text-md font-medium h-12 mt-1 rounded-md '
                
                   }`
                }
             >
             <div className={`py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors`}>
               <p>Profile</p>
              </div>
        </NavLink>



        <NavLink to="/pixpulse/createpost"
             className={({ isActive }) =>
               `  ${
                  isActive
                   ? 'bg-pink-500 text-white rounded-md  text-md font-medium h-12 mt-1'
                    : 'text-pink-500 hover:bg-pink-500 hover:text-white text-md font-medium h-12 mt-1 rounded-md '
                
                   }`
                }
             >
             <div className={`py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors`}>
               <p>Create Post</p>
              </div>
        </NavLink>


        <NavLink to="/pixpulse/followingsposts"
             className={({ isActive }) =>
               `  ${
                  isActive
                   ? 'bg-pink-500 text-white rounded-md  text-md font-medium h-12 mt-1'
                    : 'text-pink-500 hover:bg-pink-500 hover:text-white text-md font-medium h-12 mt-1 rounded-md '
                
                   }`
                }
             >
             <div className={`py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors`}>
               <p>Following's Post</p>
              </div>
        </NavLink>


        <NavLink   onClick={()=>{
             localStorage.clear()
               navigate('/')

        }}
             className={({ isActive }) =>
               `  ${
                  isActive
                   ? 'text-pink-500 font-medium text-md'
                    : 'text-pink-500 hover:bg-pink-500 hover:text-white text-md font-medium h-12 mt-1 rounded-md '
                
                   }`
                }
             >
             <div className={`py-3 pt-4 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors`}>
               <p>Logout</p>
              </div>
        </NavLink>

       
                  </div>
                </div>
              </div>
              

            
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="">
                <Disclosure.Button>
                  <NavLink to="/pixpulse/home"
             className={({ isActive }) =>
               `  ${
                  isActive
                   ? ' text-pink-500  text-md font-medium h-12 mt-1'
                    : 'text-pink-300 text-md font-medium h-12 mt-1 '
                
                   }`
                }
             >
             <div className={`py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors`}>
               <p>Home</p>
              </div>
        </NavLink>

        <NavLink to="/pixpulse/profile"
             className={({ isActive }) =>
               `  ${
                  isActive
                   ? ' text-pink-500  text-md font-medium h-12 mt-1'
                    : 'text-pink-300 text-md font-medium h-12 mt-1 '
                
                   }`
                }
             >
             <div className={`py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors`}>
               <p>Profile</p>
              </div>
        </NavLink>
            

        <NavLink to="/pixpulse/createpost"
             className={({ isActive }) =>
               `  ${
                  isActive
                   ? ' text-pink-500  text-md font-medium h-12 mt-1'
                    : 'text-pink-300 text-md font-medium h-12 mt-1 '
                
                   }`
                }
             >
             <div className={`py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors`}>
               <p>Create Post</p>
              </div>
        </NavLink>


        <NavLink to="/pixpulse/followingsposts"
             className={({ isActive }) =>
               `  ${
                  isActive
                   ? ' text-pink-500  text-md font-medium h-12 mt-1'
                    : 'text-pink-300 text-md font-medium h-12 mt-1 '
                
                   }`
                }
             >
             <div className={`py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors`}>
               <p>Following's Post</p>
              </div>
        </NavLink>
                
        <NavLink to="/pixpulse/searchuser"
             className={({ isActive }) =>
               `  ${
                  isActive
                   ? ' text-pink-500  text-md font-medium h-12 mt-1'
                    : 'text-pink-300 text-md font-medium h-12 mt-1 '
                
                   }`
                }
             >
             <div className={`py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors`}>
               <p>Search</p>
              </div>
        </NavLink>

        <NavLink  onClick={()=>{
             localStorage.clear()
               navigate('/')

        }}
             className={`text-pink-300 text-md font-medium h-12 mt-1 `}
             >
             <div className={`py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors`}>
               <p>Logout</p>
              </div>
        </NavLink>
                </Disclosure.Button>


            
              
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
