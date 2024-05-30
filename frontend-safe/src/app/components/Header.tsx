"use client"

type HeaderProps = {
  title: string;
};

export default function Header({ title }: HeaderProps) {
  return (
    <header>
      <h1 className="text-4xl my-5">{title}</h1>
    </header>
  );
}
