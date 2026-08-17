# CV

LaTeX sources for my CV. The PDFs here are built artifacts: edit the `.tex`, rebuild, never hand-edit the PDF.

| File | What it is |
|---|---|
| `nadacv.sty` | Shared layout: fonts, section rules, entry/project macros, contact line |
| `master-cv.tex` | The long form: every role and project. The source of truth |
| `nada-mohamed-cv-1page.tex` | One-page cut for applications |

## Build

```bash
pdflatex master-cv.tex
pdflatex nada-mohamed-cv-1page.tex
```

Needs a TeX Live install with `lmodern`, `enumitem`, `microtype`, `ragged2e`, `geometry`, `hyperref`, and
`fontawesome5` (Debian/Ubuntu: `texlive-latex-base texlive-latex-recommended texlive-latex-extra
texlive-fonts-recommended texlive-fonts-extra lmodern`). Without `fontawesome5` the style falls back to
text glyphs for the contact icons, so the document still builds.

## Making a tailored variant

Copy `nada-mohamed-cv-1page.tex`, cut, and rebuild. Two things to hold onto:

- **One page is a hard constraint.** `pdflatex` reports the page count on the last line of its output.
  If it spills, the cheapest fix is rewording bullets that wrap to a second line for one trailing word,
  which reads better than shrinking the font or the margins.
- **`nadacv.sty` takes a `compact` option** that tightens the vertical rhythm. The one-pager uses it;
  the master doesn't.

## Notes on content

- The one-pager keeps Payramid deliberately light on implementation detail. The platform source is
  private, so the links point at the public landing page and its repository instead.
- Project dates come from each repository's commit history rather than memory.
