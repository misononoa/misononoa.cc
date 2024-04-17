import React from "react";
import "../styles/Hamburger.css";
import twemoji from "twemoji";

const Hamburger: React.FC = () => {
	const [isOpen, setIsOpen] = React.useState(false);
	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			<div className="hamburger" onClick={toggleMenu}>
				<span className="line"></span>
				<span className="line"></span>
				<span className="line"></span>
			</div>
			<div className="nav-links">
				{isOpen && (
					<span className="invisible">
						<a href="/">Home</a>
						<a href="https://msky.misononoa.cc/">Misskey</a>
					</span>
				)}
				<span>
					<a href="/about">About_Me</a>
				</span>
			</div>
		</>
	);
};

export default Hamburger;
