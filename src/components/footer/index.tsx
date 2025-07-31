import React from 'react'

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm">
        <p>&copy; {new Date().getFullYear()} Lost & Found Board. Barcha huquqlar himoyalangan.</p>
        <p>Kontakt: <a href="mailto:lostfound@example.com" className="text-blue-400 hover:underline">lostfound@example.com</a></p>
      </div>
    </footer>
  )
}

export default Footer
