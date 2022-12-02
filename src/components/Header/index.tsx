import { UndoRedo } from '~/features/board/components';

export const Header = () => {
  return (
    <header className="sticky top-0 left-0 fight-0 w-full z-10 bg-neutral-800 px-4 py-2">
      <UndoRedo />
    </header>
  );
};
