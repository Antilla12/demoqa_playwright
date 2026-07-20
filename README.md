# DemoQA Playwright Automation

UI automation testing suite for [DemoQA](https://demoqa.com) using **Playwright + JavaScript**, with Page Object Model structure, accessibility checks, and Allure reporting.

## What's covered

### Elements
- Text Box
- Check Box
- Radio Button
- Web Tables
- Buttons
- Links
- Upload / Download
- Dynamic Properties

### Forms
- Practice Form (multi-field form submission)

### Alerts, Frames & Windows
- Browser Alerts

### Widgets
- Accordion
- Date Picker
- Slider
- Progress Bar
- Tabs
- Tool Tips
- Menu
- Select Menu

### Interactions
- Sortable
- Selectable
- Resizable
- Drag and Drop

## Project structure

```
├── pages/                    # Page Object Model classes (one per DemoQA section)
│   ├── AlertsPage.js
│   ├── ButtonsPage.js
│   ├── CheckBoxPage.js
│   ├── DatePickerPage.js
│   ├── DragDropPage.js
│   ├── DynamicPropertiesPage.js
│   ├── FormsPage.js
│   ├── LinksPage.js
│   ├── MenuPage.js
│   ├── ProgressBarPage.js
│   ├── RadioButtonPage.js
│   ├── ResizablePage.js
│   ├── SelectMenuPage.js
│   ├── SelectablePage.js
│   ├── SliderPage.js
│   ├── SortablePage.js
│   ├── TabsPage.js
│   ├── TextBoxPage.js
│   ├── ToolTipsPage.js
│   ├── UploadDownloadPage.js
│   └── WebTablesPage.js
├── tests/                     # One spec file per DemoQA section, mirroring pages/
├── playwright.config.js
└── package.json
```

## Tech stack

- **Playwright** — browser automation and test runner
- **@axe-core/playwright** — automated accessibility (a11y) checks
- **allure-playwright** — rich, interactive HTML test reports

## Skills demonstrated

- Page Object Model applied consistently across 20+ distinct UI component types
- Complex widget interactions: date pickers, sliders, drag-and-drop, sortable/selectable/resizable elements
- File upload and download handling
- Dynamic property detection (disabled/enabled/visible/color-changing elements)
- Accessibility testing integrated into functional test suites
- Structured, readable test reporting via Allure

## Running tests

```bash
npm install
npx playwright install

# Run everything (headless)
npx playwright test

# Run a specific suite
npx playwright test tests/forms.spec.js
npx playwright test tests/dragdrop.spec.js

# Run a single browser only
npx playwright test --project=chromium

# View the standard HTML report
npx playwright show-report
```

### Allure report

```bash
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
```

> **Note:** In cloud/CI environments without a display (e.g. GitHub Codespaces), run headless — don't use `--headed` or `--ui`.

## Notes

- `debug-screenshot.png` is a leftover local debugging artifact — safe to delete or add to `.gitignore`.
