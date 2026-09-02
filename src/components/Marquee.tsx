const ITEMS = ['Creative Coding', 'Distributed Systems', 'Full-Stack Architecture', 'Graphics & Shaders', 'UI/UX Engineering'];

const Row = () => (
  <div className="flex shrink-0 items-center">
    {ITEMS.map((item) => (
      <span key={item} className="flex items-center">
        <span className="px-8 font-display text-2xl font-bold uppercase tracking-tight text-neutral-200 md:text-3xl">
          {item}
        </span>
        <span className="text-neutral-600">✦</span>
      </span>
    ))}
  </div>
);

export default function Marquee() {
  return (
    <div data-testid="editorial-marquee" className="overflow-hidden border-y border-[#27272A] py-6">
      <div className="animate-marquee flex w-max">
        <Row />
        <Row />
      </div>
    </div>
  );
}