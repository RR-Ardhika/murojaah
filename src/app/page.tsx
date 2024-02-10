function repeat() {
  const items = [];
  for (let i = 0; i < 60; ++i) {
    items.push(<p>This is content {i}</p>);
  }
  return items;
}

export default function Home() {
  return <div className="mt-[72px] p-4">{repeat()}</div>;
}
