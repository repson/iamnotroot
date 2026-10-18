---
title: Build the handbook with us
description: A small, repeatable workflow for adding a discovery and keeping the reference useful.
updated: 2026-10-14
---
iamnotroot is an independent, vendor-neutral IAM handbook and learning project. Its content and site source live together in a Git repository. Markdown is the source of truth for articles and guides.

## Add a discovery

1. Choose the closest existing topic under `content/`.
2. Copy `templates/article.md` into that topic using a descriptive, lowercase, hyphenated filename.
3. Write a title, a short description, category, ordering number, review date, and useful tags.
4. Explain one concrete subject. Add an example and relevant primary references.
5. Link to related articles with ordinary relative Markdown links.
6. Run `npm run verify` and review the page locally before committing.

The site automatically generates the article route, topic listing, sidebar entry, and search index. Navigation does not require a separate manual article list.

## Keep articles approachable

Start with the idea in plain language. Define an abbreviation the first time it matters. Separate a normative requirement from an implementation choice or illustrative example.

Draw diagrams with ` ```mermaid ` fences (flowchart or sequenceDiagram); the site renders them as graphics. Keep ` ```text ` for literal examples such as tokens, headers, or endpoint URLs.

Avoid presenting one vendor's behavior as a universal protocol guarantee. Explain the conditions and limits of a recommendation.

## Use inspectable sources

Prefer specifications, standards bodies, official documentation, and original research. Link directly to the relevant document. Add a section or version when it helps readers verify the point.

The `updated` date records the latest substantive review. Changing a date is not a substitute for reviewing the content.

## Keep drafts out of publication

Set `draft: true` in an article's frontmatter while working. Draft articles are excluded from public routes, navigation, and search. Do not link to a draft from a published page.

Draft files remain visible in the Git repository if they are committed. Use a private location for material that should not be shared.

## Publish changes

The repository includes a GitHub Actions workflow for GitHub Pages. Once Pages is configured to use GitHub Actions, changes merged or pushed to `main` rebuild and deploy the website.

Use a pull request when a change benefits from review. See the repository [README](https://github.com/repson/iamnotroot#readme) for setup and deployment instructions.

## Corrections and scope

Use [GitHub issues](https://github.com/repson/iamnotroot/issues) to report an incorrect statement, suggest a topic, or explain an unclear example. Include the page and the evidence that would help resolve the issue.

The handbook is educational. Introductory articles explain responsibilities and concepts; production integrations require the full specifications, deployment context, and appropriate validation.
