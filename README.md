# 👨‍💻 Wise Byte Concepts — Developer Portfolio

> *Self-driven developer exploring software development with a focus on .NET, C#, WinUI, and building meaningful, reliable solutions.*

[![GitHub](https://img.shields.io/badge/GitHub-wisebyteconcepts-181717?style=flat&logo=github)](https://github.com/wisebyteconcepts)
![Repositories](https://img.shields.io/badge/Repositories-5-blue)
![Primary Language](https://img.shields.io/badge/Primary%20Language-C%23-239120?logo=csharp)

---

## 🧠 About

**Wise Byte Concepts** is the GitHub home of a self-driven developer passionate about building clean, maintainable, and meaningful software in the .NET ecosystem. The focus is on practical tooling, desktop application development with WinUI3, and creating reusable libraries that genuinely improve developer workflows.

With a commitment to open source and craftsmanship, each project reflects a philosophy of writing code that is lightweight, extensible, and built to last.

---

## 🛠️ Tech Stack

| Area | Technologies |
|---|---|
| Languages | C#, TypeScript |
| Frameworks | .NET 8, WinUI 3 |
| Tooling | Visual Studio, JetBrains Rider |
| APIs | Google Maps API |
| Other | SQLite, async/await patterns, LINQ |

---

## 📦 Projects

### 🔷 [wise-byte-extensions](https://github.com/wisebyteconcepts/wise-byte-extensions)
**A collection of powerful and reusable .NET extensions for WinUI 3**

Built to simplify, optimize, and enhance .NET development workflows. This library provides a growing suite of extension methods and utilities designed for productivity and code readability.

**Highlights:**
- Extension methods for common .NET types: `string`, `IEnumerable<T>`, `DateTime`, `IValueConverter`, `Controls`, `Styles`, and more
- Utilities for collections, LINQ, and data manipulation
- Helper methods for async/await and exception handling
- Designed for .NET 8 with modern C# features
- MIT Licensed — open source and community-driven
- Lightweight, performant, and easy to integrate

```csharp
// Example usage
using WiseByteExtensions;

var items = myCollection.SafeWhere(x => x.IsActive).ToList();
```

**Topics:** `dotnet` `csharp` `winui3` `library` `developer-tools` `productivity`

---

### 🗺️ [wise-byte-geologger](https://github.com/wisebyteconcepts/wise-byte-geologger)
**A modern WinUI desktop app for geotagging photos**

GeoLogger lets you effortlessly tag your photos with accurate geolocation and timestamp data. Powered by the Google Maps API, it processes images in bulk and embeds precise location metadata directly into your files.

**Highlights:**
- Bulk photo geotagging in a modern WinUI 3 interface
- Google Maps API integration for accurate location data
- Embeds geolocation + timestamp into image metadata
- Designed for photographers, travelers, and field researchers

**Topics:** `winui3` `csharp` `google-maps` `geolocation` `desktop-app`

---

### 🗄️ [wise-byte-database-helper](https://github.com/wisebyteconcepts/wise-byte-database-helper)
**A lightweight, attribute-driven database helper for .NET**

Auto-generates SQL tables from your C# classes — no manual schema writing required. Supports SQLite with planned support for SQL Server and PostgreSQL.

**Highlights:**
- Attribute-driven table generation from C# classes
- Custom attributes, foreign keys, and schema management
- Currently supports SQLite; SQL Server & PostgreSQL planned
- Minimal setup, maximum productivity

```csharp
[Table("Users")]
public class User
{
    [PrimaryKey, AutoIncrement]
    public int Id { get; set; }

    [Column("Username")]
    public string Name { get; set; }
}
```

**Topics:** `dotnet` `csharp` `sqlite` `orm` `database`

---

### 🌐 [wisebyteconcepts-website](https://github.com/wisebyteconcepts/wisebyteconcepts-website)
**Official website for Wise Byte Concepts**

Built with TypeScript as part of a Gemini Web Build, serving as the public-facing presence for the Wise Byte Concepts brand and projects.

**Topics:** `typescript` `web` `frontend`

---

## 🏆 GitHub Achievements

| Achievement | Description |
|---|---|
| 🦈 Pull Shark | Opened pull requests that were merged |
| 🎯 YOLO | Merged a pull request without a review |

---

## 🤝 Contributing

All public repositories welcome community contributions. The general workflow is:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit and push your changes
4. Open a pull request

Issues and suggestions are always welcome — simply open one in the relevant repository.

---

## 📄 License

All open source projects by Wise Byte Concepts are released under the **MIT License**, making them free to use, modify, and distribute.

---

## 🔗 Links

- **GitHub Profile:** [github.com/wisebyteconcepts](https://github.com/wisebyteconcepts)
- **Avatar:** [View Profile Image](https://avatars.githubusercontent.com/u/238298640?v=4)

---

*Portfolio generated · May 2026*
