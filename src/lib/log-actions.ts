"use server";

import Database from "better-sqlite3";
import path from "path";

export type LogEntry = {
  id: number;
  level: number;
  level_name: string;
  message: string;
  data: string | null;
  created_at: string;
};

export type LogFilters = {
  level?: number;
  search?: string;
  page?: number;
  perPage?: number;
};

export type LogsResult = {
  logs: LogEntry[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
};

function getDb(): Database.Database {
  const dbPath = path.join(process.cwd(), "logs.db");
  return new Database(dbPath, { readonly: true });
}

export async function getLogs(filters: LogFilters = {}): Promise<LogsResult> {
  const { level, search, page = 1, perPage = 20 } = filters;
  const db = getDb();

  try {
    // Build WHERE clause
    const conditions: string[] = [];
    const params: (string | number)[] = [];

    if (level && level > 0) {
      conditions.push("level = ?");
      params.push(level);
    }

    if (search && search.trim()) {
      conditions.push("(message LIKE ? OR data LIKE ?)");
      const searchTerm = `%${search.trim()}%`;
      params.push(searchTerm, searchTerm);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    // Get total count
    const countStmt = db.prepare(`SELECT COUNT(*) as count FROM logs ${whereClause}`);
    const countResult = countStmt.get(...params) as { count: number };
    const total = countResult.count;

    // Get paginated results
    const offset = (page - 1) * perPage;
    const selectStmt = db.prepare(
      `SELECT * FROM logs ${whereClause} ORDER BY created_at DESC LIMIT ? OFFSET ?`
    );
    const logs = selectStmt.all(...params, perPage, offset) as LogEntry[];

    return {
      logs,
      total,
      page,
      perPage,
      totalPages: Math.ceil(total / perPage),
    };
  } finally {
    db.close();
  }
}

export async function clearLogs(): Promise<{ success: boolean; deleted: number }> {
  const dbPath = path.join(process.cwd(), "logs.db");
  const db = new Database(dbPath);

  try {
    const result = db.prepare("DELETE FROM logs").run();
    return { success: true, deleted: result.changes };
  } finally {
    db.close();
  }
}
