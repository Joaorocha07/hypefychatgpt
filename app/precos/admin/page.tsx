'use client'

import { useEffect } from 'react'

export default function AdminRedirect() {
  useEffect(() => {
    window.location.href = '/admin'
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#ffa800] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecionando para área administrativa...</p>
      </div>
    </div>
  )
}