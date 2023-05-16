import React from 'react';
import Search from './Search';

interface Props {
  name: string;
}

export default function Header({ name }: Props) {
  return (
    <>
      <header className="xl:px-32">
        <h1 className="text-5xl">{name}</h1>
        <Search />
      </header>
    </>
  );
}
