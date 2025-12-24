"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useCallback } from "react";
import type { LogEntry } from "@/lib/log-actions";

const LEVEL_OPTIONS = [
  { value: 0, label: "All Levels" },
  { value: 1, label: "Error" },
  { value: 2, label: "Warning" },
  { value: 3, label: "Info" },
  { value: 4, label: "Message" },
  { value: 5, label: "Debug" },
];

const LEVEL_CLASSES: Record<number, string> = {
  1: "level-error",
  2: "level-warning",
  3: "level-info",
  4: "level-message",
  5: "level-debug",
};

type Props = {
  initialLogs: LogEntry[];
  total: number;
  page: number;
  totalPages: number;
  currentLevel?: number;
  currentSearch: string;
};

export default function LogViewer({
  initialLogs,
  total,
  page,
  totalPages,
  currentLevel,
  currentSearch,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(currentSearch);

  const updateUrl = useCallback(
    (updates: Record<string, string | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value === undefined || value === "" || value === "0") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });

      // Reset to page 1 when filters change (except when changing page)
      if (!("page" in updates)) {
        params.delete("page");
      }

      router.push(`/log?${params.toString()}`);
    },
    [router, searchParams]
  );

  const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateUrl({ level: e.target.value });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUrl({ search });
  };

  const handlePageChange = (newPage: number) => {
    updateUrl({ page: newPage.toString() });
  };

  const formatData = (data: string | null) => {
    if (!data) return null;
    try {
      return JSON.stringify(JSON.parse(data), null, 2);
    } catch {
      return data;
    }
  };

  return (
    <div className="log-viewer">
      <div className="log-controls">
        <form onSubmit={handleSearchSubmit} className="log-search">
          <input
            type="text"
            placeholder="Search logs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-btn">
            Search
          </button>
        </form>

        <select
          value={currentLevel || 0}
          onChange={handleLevelChange}
          className="level-select"
        >
          {LEVEL_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="log-stats">
        Showing {initialLogs.length} of {total} logs
      </div>

      <div className="log-table-wrapper">
        <table className="log-table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Level</th>
              <th>Message</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {initialLogs.length === 0 ? (
              <tr>
                <td colSpan={4} className="no-logs">
                  No logs found
                </td>
              </tr>
            ) : (
              initialLogs.map((log) => (
                <tr key={log.id} className={LEVEL_CLASSES[log.level]}>
                  <td className="log-time">{log.created_at}</td>
                  <td className="log-level">
                    <span className={`level-badge ${LEVEL_CLASSES[log.level]}`}>
                      {log.level_name}
                    </span>
                  </td>
                  <td className="log-message">{log.message}</td>
                  <td className="log-data">
                    {log.data && (
                      <pre>{formatData(log.data)}</pre>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="log-pagination">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page <= 1}
            className="page-btn"
          >
            Previous
          </button>
          <span className="page-info">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= totalPages}
            className="page-btn"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
