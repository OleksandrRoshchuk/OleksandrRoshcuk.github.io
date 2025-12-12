import logo from '../../assets/logo.svg';
import './Header.scss';
import Nav from '../Nav';

export default function Header({ logoLink = '#' }) {
  return (
    <header className='header'>
      <div className='header__logo'>
        <a href={logoLink}>
          <img src={logo} alt='Unlearn' />
        </a>
      </div>
      <Nav className='header__nav' />
    </header>
  );
}
