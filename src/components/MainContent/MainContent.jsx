import ButtonLink from '../ui/ButtonLink/ButtonLink';
import ScrollDown from '../ui/ScrollDown/ScrollDown';
import './MainContent.scss';

export default function MainContent() {
  return (
    <main className='main-content'>
      <ButtonLink href='#' className='btn btn--large'>
        Start today
      </ButtonLink>
      <h1 className='main-content__title'>
        Building the future of medicine with AI
      </h1>
      <ScrollDown />
    </main>
  );
}
