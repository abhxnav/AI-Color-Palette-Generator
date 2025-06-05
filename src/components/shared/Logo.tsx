import clsx from 'clsx'
import Link from 'next/link'

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link
      href="/"
      className={clsx(
        'text-8xl font-semibold text-primary-foreground',
        className
      )}
    >
      mos<span className="text-primary">AI</span>c
    </Link>
  )
}

export default Logo
