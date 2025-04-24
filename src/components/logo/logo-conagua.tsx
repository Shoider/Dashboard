import { mergeClasses } from 'minimal-shared/utils';

import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';


// ----------------------------------------------------------------------

export type LogoProps = {
  href?: string;
  disabled?: boolean;
  className?: string;
  sx?: object;
};

export function LogoConagua({
  sx,
  disabled,
  className,
  href = '/',
  ...other
}: LogoProps) {
  return (
    <LogoRoot
      href={href}
      aria-label="Logo"
      underline="none"
      className={mergeClasses([className])}
      sx={[
        {
          width: 200,
          height: 50,
          ...(disabled && { pointerEvents: 'none' }),
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <img
        //src="src/components/logo/Conagua.png"
        src='/Conagua.png'
        alt="Conagua Logo"
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      />
    </LogoRoot>
  );
}

// ----------------------------------------------------------------------

const LogoRoot = styled(Link)(() => ({
  flexShrink: 0,
  display: 'inline-flex',
  verticalAlign: 'middle',
}));