import React from 'react'
import { Link } from 'react-router-dom'

function NotFound404() {
  return (
    <div className="bg-black flex justify-center items-center h-screen">
    <div className="container text-center">
        <h1 className="text-6xl text-yellow-400 font-bold">404</h1>
        <p className="text-xl text-white mt-4">Oops! The page you're looking for isn't here.</p>
        <Link to="/" className="mt-6 inline-block bg-yellow-400 text-black py-2 px-4 rounded hover:bg-yellow-500 transition duration-300">Go Home</Link>
    </div>
</div>
  )
}

export default NotFound404