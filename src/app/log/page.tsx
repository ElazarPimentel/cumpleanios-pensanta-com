import { getLogs } from "@/lib/log-actions";
import LogViewer from "./LogViewer";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Logs | PenPlate",
  robots: "noindex, nofollow",
};

type Props = {
  searchParams: Promise<{
    level?: string;
    search?: string;
    page?: string;
  }>;
};

export default async function LogPage({ searchParams }: Props) {
  const params = await searchParams;
  const level = params.level ? parseInt(params.level, 10) : undefined;
  const search = params.search || "";
  const page = params.page ? parseInt(params.page, 10) : 1;

  const result = await getLogs({ level, search, page, perPage: 20 });

  return (
    <main className="container-main border-01 log-page">
      <h1>System Logs</h1>
      <LogViewer
        initialLogs={result.logs}
        total={result.total}
        page={result.page}
        totalPages={result.totalPages}
        currentLevel={level}
        currentSearch={search}
      />
    </main>
  );
}
