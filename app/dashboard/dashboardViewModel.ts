import { useState } from "react"

export default function useDashboardViewModel() {
  const [selectedPlatform, setSelectedPlatform] = useState('all')
  const [orderDetails, setOrderDetails] = useState({
    category: '',
    service: '',
    description: '',
    link: '',
    quantity: '',
  })

  const handlePlatformChange = (platform: string) => {
    setSelectedPlatform(platform)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Order submitted:', orderDetails)
  }

  return {
    selectedPlatform,
    orderDetails,
    handlePlatformChange,
    handleSubmit,
    setOrderDetails,
  }
}