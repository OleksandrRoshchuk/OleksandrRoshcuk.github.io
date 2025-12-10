import Link from './ui/Link';
import { useState } from 'react';

export default function Nav(props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleMenuClick() {
    setIsMenuOpen((prevState) => !prevState);
  }

  const navLinks = [
    { label: 'Solutions', href: '#' },
    { label: 'Technology', href: '#' },
    { label: 'About', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Resources', href: '#' },
    { label: 'Contact', href: '#' },
  ];

  return (
    <nav {...props}>
      <ul className={`menu ${isMenuOpen ? 'is-active' : ''}`}>
        {navLinks.map((link) => (
          <li key={link.label}>
            <Link href={link.href} label={link.label} />
          </li>
        ))}
      </ul>
      <button
        className={`menu__trigger ${isMenuOpen ? 'is-active' : ''}`}
        onClick={() => handleMenuClick()}
        aria-label='Toggle menu'
      >
        <span></span>
      </button>
    </nav>
  );
}
