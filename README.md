# 📦 MediaSorter

**MediaSorter** is a desktop application built with **React + Electron** that automatically organizes your downloaded TV episodes. It scans your folders, detects the series and season from the filenames, and moves the episodes into structured folders for easy media library management.

Perfect for users of **Jellyfin**, **Plex**, or local collections.

## 🚀 Features

- Scan folders for video files.
- Automatically detect the series and season from filenames.
- Organize episodes into folders like: `Series Name/Season X`.
- Moves files (does not copy).
- Preview classification before applying changes.
- Simple, intuitive GUI.
- Supports `.mp4`, `.mkv`, `.avi`, and other formats.

## 🛠️ Tech Stack

- ⚛️ React
- ⚡ Electron
- 📦 Vite
- 📁 Node.js + fs for file operations

## 📷 Screenshots

_(Coming soon)_

## 📦 Getting Started (Development)

1. Clone the repository:

```bash
git clone https://github.com/srlsrx/media-sorter.git
cd media-sorter
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

## 🗂️ Project Structure

```
media-sorter/
├── public/              # Static files
├── src/
│   ├── main/            # Electron logic
│   └── renderer/        # React app
├── electron.js          # Electron entry point
├── vite.config.js
├── package.json
└── README.md
```

## ✅ Status

🚧 MVP in progress

## 📄 License

This project is licensed under the MIT License.

---

**MediaSorter** — because organizing your shows shouldn't be a full-time job.
