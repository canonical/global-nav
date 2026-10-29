### 4.0.0 [29-10-2026]
**Breaking** Styles for global-nav
- The package no longer injects `@font-face` rules for the Ubuntu font. The host page must load the font itself, otherwise the nav falls back to a system font. See [Fonts](README.md#fonts) for how to load it.
