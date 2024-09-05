import React, { useEffect, useState } from 'react'
import {
    BriefcaseIcon,
    CalendarIcon,
    CurrencyDollarIcon,
    MapPinIcon,
  } from '@heroicons/react/20/solid'
  import { useNavigate } from 'react-router-dom'
import autoprefixer from 'autoprefixer';

const Home = () => {
  const [userName, setUserName] = useState('');
  const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedUser');
        navigate('/login');
    }
    const fetchProducts = async () => {
        try {
            const url = `${import.meta.env.REACT_APP_API_URL}/products`;
            const headers = {
                headers: {
                    authorization: localStorage.getItem('token')
                }
            }
            const response = await fetch(url, headers);
          const result = await response.json();
          setProducts(result);
          console.log("Products:" , products);
        } catch (error) {
            handleError(error);
        }
     }
        useEffect(() => { 
        const user = localStorage.getItem('loggedUser');
        if (user) {
            setUserName(user);
        }
        fetchProducts();
    }, [])
  return (
    <>
      <div className='mx-auto my-20 max-w-7xl'>
      <div className="lg:flex lg:items-center lg:justify-between">
      <div>
        {
          products?.map((item, index) => (
            <div key={index}>
              <span>{item.name} :  { item.price}</span>
            </div>
          ))
        }
      </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Welcome {userName}!
          </h2>
          <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <BriefcaseIcon aria-hidden="true" className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" />
              Full-time
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <MapPinIcon aria-hidden="true" className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" />
              Remote
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <CurrencyDollarIcon aria-hidden="true" className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" />
              $120k &ndash; $140k
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <CalendarIcon aria-hidden="true" className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" />
              Closing on January 9, 2020
            </div>
          </div>
        </div>
        <div className="mt-5 flex lg:ml-4 lg:mt-0">
  
          <span className="sm:ml-3">
            <button onClick={(e)=>{handleLogout(e)}}
              type="button"
              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Logout
            </button>
          </span>
  
          
        </div>
      </div>
      
      </div>
      </>
  )
}

export default Home;
