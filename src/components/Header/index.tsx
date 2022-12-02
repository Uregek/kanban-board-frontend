import { UndoRedo } from '~/features/board/components';

export const Header = () => {
  return (
    <header className="bg-neutral-800 px-4 py-2">
      <UndoRedo />
    </header>
  );
};
