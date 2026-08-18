import Button from "../../../Button/Button"

type prop = {
	expanded: boolean
	setExpanded: React.Dispatch<React.SetStateAction<boolean>>
}
export default function GlobalResultsToggle({ expanded, setExpanded }: prop) {
	return (
		<Button
			className="globalResultsToggle"
			onClick={(e) => {
				e.preventDefault()
				setExpanded((expanded) => !expanded)
			}}
		>
			{expanded ? "⌄" : "^"}
		</Button>
	)
}
