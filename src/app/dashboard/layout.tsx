'use client'
import { AppSidebar } from '@/components/app-sidebar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar'
import { Toaster } from '@/components/ui/toaster'
import { usePathname } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const [open, setOpen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const storedState = localStorage.getItem('sidebarOpen')
      return storedState === 'true'
    }
    return storedState
  })
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sidebarOpen', JSON.stringify(open))
    }
  }, [open])

  const breadcrumbItems = useMemo(() => {
    const paths = pathname.split('/').filter(Boolean)
    return paths.map((path, index) => {
      const url = `/${paths.slice(0, index + 1).join('/')}`
      return { title: path, url }
    })
  }, [pathname])

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  
  const handleSidebarToggle = (toggle: boolean) => {
    setOpen(toggle)
  }
  return (
    <SidebarProvider open={open} onOpenChange={handleSidebarToggle}>
      <AppSidebar />
      <SidebarInset>
        <header className='!mr-5 flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
          <div className='flex items-center gap-2 px-4'>
            <SidebarTrigger className='-ml-1' />
            <Separator orientation='vertical' className='mr-2 h-4' />
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbItems.map((item, index) => {
                  const isActive = pathname === item.url
                  return (
                    <BreadcrumbItem key={item.url}>
                      <BreadcrumbLink
                        href={item.url}
                        className={
                          isActive
                            ? 'font-semibold text-black'
                            : 'text-gray-600'
                        }
                      >
                        {capitalizeFirstLetter(item.title)}{' '}
                      </BreadcrumbLink>
                      {index < breadcrumbItems.length - 1 && (
                        <span className='breadcrumb-separator'>{' > '}</span>
                      )}
                    </BreadcrumbItem>
                  )
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>
          {children}
          <Toaster />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
