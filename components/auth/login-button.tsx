import { Button } from "@/components/ui/button"

interface LoginButtonProps {
  icon: React.ReactNode
  label: string
  onClick?: () => void
}

export default function LoginButton({
  icon,
  label,
  onClick,
}: LoginButtonProps) {
  return (
    <Button variant="outline" type="button" onClick={onClick}>
      {icon}
      <span className="sr-only">{label}</span>
    </Button>
  )
}
