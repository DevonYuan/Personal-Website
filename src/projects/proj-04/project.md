---
id: proj-04
number: "01"
name: Tether
subtitle: Share your local MCP ecosystem with your team — without redeploying it to the cloud
category: StormHacks 2026 / TypeScript / Go / Tailscale / Electron
year: "2026"
demo_url: https://devpost.com/software/tether-6loi18?ref_content=my-projects-tab&ref_feature=my_projects
github_url: https://github.com/DevonYuan/StormHacks-2026-TeamMCP/
image: https://images.unsplash.com/photo-1678366633407-7f49da199a42?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MDZ8MHwxfHNlYXJjaHwyfHxkYXJrJTIwYWJzdHJhY3QlMjAzZCUyMGdlb21ldHJ5JTIwcmVuZGVyfGVufDB8fHx8MTc4ODM2OTc5OXww&ixlib=rb-4.1.0&q=85
---

Tether is a local-first desktop application that lets a small team securely share access to MCP servers already running on one teammate's machine. Built for StormHacks 2026.

The gateway defines no MCP tools of its own. It sits in front of MCP servers you already run locally and adds a secure, team-oriented access layer around them: server registration, remote access via Tailscale, authentication, authorization, MCP routing, server discovery, and activity logging.

The problem it solves: Local MCP servers are powerful precisely because they reach resources on a developer's machine — source code, local files, dev databases, browsers, containers, hardware. But they are configured for one person. Today, sharing them means every teammate reproduces the setup locally, or the team packages and redeploys those servers into cloud infrastructure. Tether asks: what if a developer could securely share their existing local MCP servers with a small team, without redeploying those MCP servers to the cloud?

The underlying workloads keep running on team-controlled hardware. The gateway is only the shared access layer, and from a remote client's perspective, the experience feels like talking to a remotely hosted MCP service.