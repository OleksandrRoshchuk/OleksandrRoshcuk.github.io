import './ButtonLink.scss';
export default function ButtonLink({ href, children, className, ...props }) {
  return (
    <a href={href} className={`btn ${className}`} {...props}>
      {children}
    </a>
  );
}
