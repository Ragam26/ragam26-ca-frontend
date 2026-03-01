import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function AdminIndex() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/admin/overview')
  }, [])
  

  return null
}
