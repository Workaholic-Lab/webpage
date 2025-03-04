import Tilt from "react-tilt";
import Tippy from "@tippyjs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { Link } from "@components/Link";
import { IconDefinition } from "@fortawesome/free-brands-svg-icons";
import classnames from "classnames";
import { useCopyToClipboard } from "react-use";
import { toast } from "react-toastify";

export interface IAccountCardProps {
	icon: IconDefinition;
	name: string;
	value: string;
	href?: string;
	color: string;
}

export const AccountCard: FC<IAccountCardProps> = ({
	href,
	icon,
	name,
	value,
	color,
}) => {
	const [, copyToClipboard] = useCopyToClipboard();

	const onCopy = () => {
		copyToClipboard(value);
		toast.success("✨ Account copied to clipboard!");
	};

	const Card: FC = () => (
		<div
			onClick={onCopy}
			className="cursor-pointer px-4 pt-4 bg-gray-200 dark:bg-gray-700 rounded-lg h-full text-black dark:text-white"
		>
			<div className="flex items-center space-x-1">
				<span className="flex-grow space-x-2 truncate text-purple-600 dark:text-purple-300">
					{name}
				</span>
				<div className="flex items-center">
					<div className="flex items-center justify-center">
						<FontAwesomeIcon
							icon={icon}
							className={classnames("text-6xl", color)}
						/>
					</div>
				</div>
			</div>
			<p className="line-clamp-2 text-base h-12">{value}</p>
		</div>
	);

	return (
		<Tippy content="Click Me!">
			<div>
				<Tilt
					className="Tilt"
					options={{
						max: 10,
						reverse: false,
						scale: 1.05,
					}}
				>
					{href ? (
						<Link href={href}>
							<Card />
						</Link>
					) : (
						<Card />
					)}
				</Tilt>
			</div>
		</Tippy>
	);
};
