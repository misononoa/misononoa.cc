import React from "react";
import "../styles/Hamburger.css";

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
			{isOpen && (
				<div className="nav-links">
					<a href="/dist">Home</a>
					<a href="/dist/about">About</a>
				</div>
			)}
		</>
	);
};

export default Hamburger;
