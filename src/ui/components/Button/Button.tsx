import type { ButtonHTMLAttributes } from "react"
import "./Button.css"

type Props = ButtonHTMLAttributes<HTMLButtonElement>

export default function Button({ className, ...props }: Props) {
	return <button className={`searchButton ${className ?? ""}`} {...props} />
}
