export default function PageContainer({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-7xl px-6 py-6 pb-24 md:pb-8">{children}</div>;
}
