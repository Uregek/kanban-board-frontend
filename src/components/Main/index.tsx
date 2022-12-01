import { FC, ReactNode } from 'react';

interface MainProps {
  children: ReactNode;
}

export const Main: FC<MainProps> = ({ children }) => {
  return <main className="flex flex-grow relative">{children}</main>;
};
