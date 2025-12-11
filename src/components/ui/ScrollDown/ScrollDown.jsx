import './ScrollDown.scss';
import arrow from '../../../assets/arrow.svg';
export default function ScrollDown({ link = '#' }) {
  return (
    <a href={link} className='scroll-down'>
      <span className='scroll-down__arrow'>
        <img src={arrow} alt='arrow' />
      </span>
      <span className='scroll-down__text'>Scroll down</span>
    </a>
  );
}
