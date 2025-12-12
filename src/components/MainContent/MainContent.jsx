import ButtonLink from '../ui/ButtonLink/ButtonLink';
import ScrollDown from '../ui/ScrollDown/ScrollDown';
import './MainContent.scss';

export default function MainContent({ buttonLink, title }) {
  return (
    <main className='main-content'>
      <ButtonLink href={buttonLink} className='btn btn--large'>
        Start today
      </ButtonLink>
      <h1 className='main-content__title'>{title}</h1>
      <ScrollDown />
    </main>
  );
}
