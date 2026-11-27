#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";

const BASE = "https://sycro-valdovinos.github.io/ARKHE-ZERO";
const server = new McpServer({ name: "arkhe-zero", version: "1.0.0" });

server.tool("arkhe_get_llms", {}, async () => {
  const r = await fetch(`${BASE}/llms.txt`);
  return { content: [{ type: "text", text: await r.text() }] };
});

server.tool("arkhe_get_schema", {}, async () => {
  const r = await fetch(`${BASE}/spec/arkhe-pcs-v1.schema.json`);
  return { content: [{ type: "text", text: await r.text() }] };
});

server.tool("arkhe_verify_sha256", { data: z.string(), expected_sha256: z.string() }, async ({ data, expected_sha256 }) => {
  const got = createHash("sha256").update(data).digest("hex");
  const ok = got.toLowerCase() === expected_sha256.toLowerCase();
  return { content: [{ type: "text", text: JSON.stringify({ ok, got, expected: expected_sha256, timestamp_legal: "NO_EMITIDA - requiere PSC NOM-151 / QTSA eIDAS RFC 3161" }, null, 2) }] };
});

server.tool("arkhe_verify_local_file", { path: z.string(), expected_sha256: z.string() }, async ({ path, expected_sha256 }) => {
  const buf = await readFile(path);
  const got = createHash("sha256").update(buf).digest("hex");
  return { content: [{ type: "text", text: JSON.stringify({ ok: got.toLowerCase() === expected_sha256.toLowerCase(), got, expected: expected_sha256 }, null, 2) }] };
});

await server.connect(new StdioServerTransport());
