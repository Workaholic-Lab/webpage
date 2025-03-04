import { FC, Fragment, useEffect, useState } from "react";
import Favicon from "@assets/icon.svg";
import { Link } from "@components/Link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowUp,
	faBars,
	faLaptop,
	faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { NavbarSeperator } from "@components/NavbarSeperator";
import { useTheme } from "next-themes";
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";
import { m } from "framer-motion";
import { CONFIG } from "@libs/config";
import { CustomImage } from "@components/CustomImage";
import classnames from "classnames";

const links = [
	{
		name: "Home",
		href: "#",
	},
	{
		name: "About",
		href: "#about",
	},
	{
		name: "Projects",
		href: "#projects",
	},
	{
		name: "Accounts",
		href: "/accounts",
	},
];

export const Navbar: FC = () => {
	const [visible, setVisible] = useState(false);
	const [hash, setHash] = useState("");
	const [top, setTop] = useState(false);
	const { theme, setTheme } = useTheme();
	const [icon, setIcon] = useState(faSun);
	const [color, setColor] = useState<"yellow" | "gray" | "blue">("yellow");

	const onClose = () => {
		setVisible(!visible);
	};

	const onTheme = () => {
		switch (theme) {
			case "light":
				setTheme("dark");
				setIcon(faMoon);
				setColor("blue");
				break;
			case "dark":
				setTheme("system");
				setIcon(faLaptop);
				setColor("gray");
				break;
			case "system":
				setTheme("light");
				setIcon(faSun);
				setColor("yellow");
				break;
			default:
				setTheme("system");
				setIcon(faLaptop);
				setColor("gray");
				break;
		}
	};

	useEffect(() => {
		switch (theme) {
			case "light":
				setIcon(faSun);
				setColor("yellow");
				break;
			case "dark":
				setIcon(faMoon);
				setColor("blue");
				break;
			case "system":
				setIcon(faLaptop);
				setColor("gray");
				break;
			default:
				setIcon(faSun);
				setColor("yellow");
				break;
		}
	}, [theme]);

	useEffect(() => {
		window.onscroll = function () {
			if (
				document.body.scrollTop > 20 ||
				document.documentElement.scrollTop > 20
			)
				setTop(true);
			else setTop(false);
		};
	}, []);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => {
		setHash(window.location.hash ? window.location.hash : "#");
	});

	const onUp = () => {
		window.location.href = "#";
	};

	return (
		<>
			<nav className="relative px-6 py-6 flex justify-between items-center bg-white dark:bg-gray-900">
				<Link
					href="#"
					className="text-white text-3xl font-bold leading-none block"
				>
					<CustomImage
						className="h-12 w-12"
						src={Favicon}
						alt="Favicon"
					/>
				</Link>
				<div className="flex-grow" />
				<div className="lg:hidden">
					<button
						aria-label="Hamburger"
						onClick={onClose}
						className="flex items-center text-gray-900 dark:text-white p-3 focus:outline-none"
					>
						<FontAwesomeIcon
							icon={faBars}
							className="block h-4 w-4 fill-current"
						/>
					</button>
				</div>
				<ul className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-6">
					<NavbarSeperator />
					{links.map((link, idx) => (
						<Fragment key={idx}>
							<li>
								<Link
									href={link.href}
									className={classnames("text-sm", {
										"text-purple-600 hover:text-purple-500 dark:text-purple-300 dark:hover:text-purple-200":
											hash == link.href,
										"text-black hover:text-gray-500 dark:text-gray-300 dark:hover:text-white":
											hash != link.href,
									})}
								>
									{link.name}
								</Link>
							</li>
							<NavbarSeperator />
						</Fragment>
					))}
				</ul>
				<Link href="#contact">
					<m.span
						whileHover={{
							scale: 1.1,
						}}
						whileTap={{
							scale: 0.9,
						}}
						className="hidden lg:inline-block py-2 px-6 bg-purple-700 hover:bg-purple-800 text-sm text-white font-bold rounded-l-xl rounded-t-xl transition duration-200"
					>
						Contact
					</m.span>
				</Link>
			</nav>
			<div
				className={classnames("relative", "z-50", {
					hidden: !visible,
				})}
			>
				<div
					onClick={onClose}
					className="fixed inset-0 bg-white dark:bg-gray-700 opacity-25"
				/>
				<nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-gray-100 dark:bg-gray-900 overflow-y-auto">
					<div className="flex items-center mb-8">
						<Link
							href="#"
							className=" mr-auto text-3xl font-bold leading-none"
						>
							<CustomImage
								className="h-10 w-10"
								src={Favicon}
								alt="Favicon"
							/>
						</Link>
						<div className="flex-grow" />
						<button
							aria-label="Close"
							onClick={onClose}
							className="focus:outline-none"
						>
							<FontAwesomeIcon
								icon={faTimes}
								className="h-6 w-6 cursor-pointer text-black dark:text-gray-400 hover:text-gray-500 dark:hover:text-gray-500"
							/>
						</button>
					</div>
					<div>
						<ul>
							{links.map((link, idx) => (
								<m.li
									whileHover={{
										scale: 1.05,
									}}
									whileTap={{
										scale: 0.95,
									}}
									key={idx}
									className="mb-1"
								>
									<Link
										href={link.href}
										className={classnames(
											"block",
											"p-4",
											"text-sm",
											"font-semibold",
											"hover:bg-purple-600",
											"dark:hover:bg-gray-800",
											"hover:text-white",
											"rounded",
											{
												"text-black dark:text-white":
													hash == link.href,
												"text-gray-500":
													hash != link.href,
											},
										)}
									>
										{link.name}
									</Link>
								</m.li>
							))}
						</ul>
					</div>
					<div className="mt-auto">
						<div>
							<Link href="#contact">
								<m.span
									whileHover={{
										scale: 1.05,
									}}
									whileTap={{
										scale: 0.95,
									}}
									className="block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-purple-600 hover:bg-purple-700 rounded-l-xl rounded-t-xl"
								>
									Contact
								</m.span>
							</Link>
						</div>
						<p className="my-4 text-xs text-center text-gray-600 dark:text-gray-400">
							<span>
								&copy; {new Date().getFullYear()} All rights
								reserved.
							</span>
						</p>
						<div className="text-center">
							{CONFIG.CONTACT.map((social, idx) => (
								<Link key={idx} href={social.href}>
									<FontAwesomeIcon
										icon={social.icon}
										className="inline-block text-black dark:text-white mx-2"
									/>
								</Link>
							))}
						</div>
					</div>
				</nav>
			</div>
			<m.button
				aria-label="Go Up"
				whileHover={{ scale: 1.1 }}
				whileTap={{
					scale: 0.9,
				}}
				onClick={onUp}
				className={classnames(
					"fixed",
					"bottom-0",
					"right-0",
					"mx-10",
					"lg:mx-20",
					"my-10",
					"z-50",
					"text-white",
					"w-10",
					"h-10",
					"bg-purple-600",
					"rounded-full",
					"focus:outline-none",
					{
						block: top,
						hidden: !top,
					},
				)}
			>
				<FontAwesomeIcon icon={faArrowUp} />
			</m.button>
			<m.button
				aria-label="Change Theme"
				whileHover={{ scale: 1.1 }}
				whileTap={{
					scale: 0.9,
				}}
				onClick={onTheme}
				className="block fixed bottom-0 left-0 mx-10 lg:mx-20 my-10 z-50 text-white w-10 h-10 bg-purple-600 rounded-full focus:outline-none"
			>
				<FontAwesomeIcon
					icon={icon}
					className={classnames("text-bold", {
						"text-yellow-400": color === "yellow",
						"text-gray-400": color === "gray",
						"text-blue-400": color === "blue",
					})}
				/>
			</m.button>
		</>
	);
};
