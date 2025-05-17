import clsx from 'clsx'

const Logo = ({ className }: { className?: string }) => {
  console.log(className)
  return (
    <span
      className={clsx(
        'text-8xl font-semibold text-primary-foreground',
        className
      )}
    >
      mos<span className="text-primary">AI</span>c
    </span>
  )
}

export default Logo
