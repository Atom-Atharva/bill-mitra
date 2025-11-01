import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div>
      <h1 className="text-4xl">Home Landing Page.</h1>
      <div className='flex gap-2'>
        <div>
          <a href='./auth/login'>LOGIN</a>
        </div>
        <div>
          <a href='./auth/register'>REGISTER</a>
        </div>
      </div>
    </div>
  )
}
