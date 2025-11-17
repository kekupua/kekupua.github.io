import { ComponentProps, FC, PropsWithChildren } from 'react';

export const Header: FC<PropsWithChildren<ComponentProps<'header'>>> = ({
  children,
  ...props
}) => {
  return (
    <header className='st-text-500' {...props}>
      {children}
    </header>
  );
};
