import './BackgroundLines.scss';
export default function BackgroundLines({ quantity }) {
  return (
    <div className='background-lines'>
      {Array.from({ length: quantity }, (_, index) => (
        <div key={index} className='background-line'></div>
      ))}
    </div>
  );
}
