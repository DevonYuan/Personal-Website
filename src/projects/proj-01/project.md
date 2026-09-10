---
id: proj-01
number: "01"
name: Unified Storage Pooler
subtitle: Cloud sync across storage providers 
category: FastAPI / React / Cloud Sync
year: "2026"
demo_url: https://example.com/demo1
github_url: https://github.com/DevonYuan/Visualize-Mechanics
image: https://images.unsplash.com/photo-1622737133809-d95047b9e673?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MDZ8MHwxfHNlYXJjaHwyfHxkYXJrJTIwYWJzdHJhY3QlMjAzZCUyMGdlb21ldHJ5JTIwcmVuZGVyfGVufDB8fHx8MTc4ODM2OTc5OXww&ixlib=rb-4.1.0&q=85
---

A desktop app built with FastAPI, React with Vite, SQLite and Electron that allows me to use the free tier quotas of Google Drive and OneDrive together, as one storage pool. I created clients on GCP and Azure, allowing me to work with the Google Drive and Microsoft Graph Files APIs and distribute the additional storage load across the two providers. The virtual file system is built in backend memory when the app is opened, so the app maintains functionality even if users choose to use Google Drive and OneDrive separately (Hence stopping the itnernal file system from breaking due to external modifications).  