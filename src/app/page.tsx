import { Logo } from '@/components'
import Link from 'next/link'

const Home = () => {
  return (
    <div className="h-dvh w-dvw flex flex-col gap-3 justify-center items-center">
      <Logo />
      <span className="text-muted-foreground italic w-[600px] text-center">
        From words to colors — Type a prompt, hit generate, and let AI craft a
        unique color palette that captures your vision perfectly.
      </span>
      <Link
        href="/generate"
        className="bg-primary text-primary-foreground font-semibold px-6 py-2 rounded-full cursor-pointer hover:brightness-90 mt-3"
      >
        Get started <span className="ml-1">&rarr;</span>
      </Link>
    </div>
  )
}

export default Home
