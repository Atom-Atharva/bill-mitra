import Cart from '@/components/home/Cart'
import Sidebar from '@/components/home/Sidebar'
import Store from '@/components/home/Store'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/home/')({
    component: RouteComponent,
})

function RouteComponent() {
    return <div className='h-screen w-screen flex flex-row justify-between'>
        <Sidebar />
        <Store />
        <Cart />
    </div>
}
