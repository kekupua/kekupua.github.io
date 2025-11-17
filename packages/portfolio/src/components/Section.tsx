import { ComponentProps, FC, PropsWithChildren } from 'react';

export const Section: FC<PropsWithChildren<ComponentProps<'section'>>> = ({
  children,
  ...props
}) => {
  const totalClassName = props.className
    ? `p-4 flex align-center flex-col justify-center gap-4 ${props.className}`
    : 'p-4 flex align-center flex-col justify-center gap-4';
  return (
    <section {...props} className={totalClassName}>
      {children}
    </section>
  );
};
