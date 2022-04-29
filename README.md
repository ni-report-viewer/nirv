# NiRV: The NeuroImaging Report Viewer

## Citation

## Relevant files

The relevant files for this repo are:

| Location                               | Content                                                                                                           |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `src/components/ReportParticipant.vue` | Renders contents of a participant level `report` object
| `src/components/ReportGroup.vue`       | Renders contents of a group level `report` object
| `src/App.vue`                          | Main entrypoint, its child component is `src/components/GenReport.vue`                                            |
| `src/components/GenReport.vue`         | Determines if report.json contains a particpant or group level report and calls the appropriate report component. |
| `package.json`                         | File that contains all the JS libraries we need for this.                                                         |

The widget files are:

| Location                          | Content                                                                                                                                          |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |

## Project setup

You should first have NodeJS installed (version >= 10). Then install dependencies with:

```bash
yarn install
```

### Compiles and hot-reloads for development

During development, do:

```bash
yarn serve
```

### Compiles and minifies for production

To build the minified widget files:

```bash
yarn build
```

### Lints and fixes files

```bash
yarn lint
```
