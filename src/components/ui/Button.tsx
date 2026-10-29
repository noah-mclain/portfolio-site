import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react';
import styles from './Button.module.css';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface BaseProps {
  variant?: Variant;
  size?: Size;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  children: ReactNode;
}

type ButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button' };
type AnchorProps = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a' };

export function Button(props: ButtonProps | AnchorProps) {
  const {
    variant = 'primary',
    size = 'md',
    iconLeft,
    iconRight,
    children,
    className,
    ...rest
  } = props;
  const classes = [styles.button, styles[variant], styles[size], className]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {iconLeft && <span className={styles.icon}>{iconLeft}</span>}
      <span>{children}</span>
      {iconRight && <span className={styles.icon}>{iconRight}</span>}
    </>
  );

  if (props.as === 'a') {
    const { as: _as, ...anchorRest } =
      rest as AnchorHTMLAttributes<HTMLAnchorElement> & { as?: string };
    void _as;
    return (
      <a className={classes} {...anchorRest}>
        {content}
      </a>
    );
  }

  const { as: _as, ...buttonRest } =
    rest as ButtonHTMLAttributes<HTMLButtonElement> & { as?: string };
  void _as;
  return (
    <button className={classes} {...buttonRest}>
      {content}
    </button>
  );
}
