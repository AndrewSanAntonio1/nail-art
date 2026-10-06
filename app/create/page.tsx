import PageContainer from "@/components/layout/PageContainer";
import NailGenerator from "@/components/nail/NailGenerator";

export default function CreatePage() {
  return (
    <PageContainer>
      <h1 className="text-3xl font-bold tracking-tight">Create Your Nail Look ✨</h1>
      <p className="mb-6 mt-1 text-sm text-muted-foreground">
        Pick what you love, lock it in, and let the studio fill in the rest.
      </p>
      <NailGenerator />
    </PageContainer>
  );
}
