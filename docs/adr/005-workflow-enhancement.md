# ADR 005: AI Content Generation Workflow Enhancement

## Status
Accepted

## Context
The current GitHub Action generates content but lacks quality control, validation, and robust error handling. We need to ensure generated content is high-quality, SEO-optimized, and doesn't break the build.

## Decision
We will enhance the `.github/workflows/ai-content-generator.yml` workflow.

1.  **Prompt Engineering**: Externalize prompts to a template file for easier tuning. Include instructions for JSON frontmatter.
2.  **Validation Step**: Add a script to validate the generated Markdown:
    -   Check for Frontmatter (title, date, tags).
    -   Check for minimum word count.
    -   Check for "As an AI language model" phrases (refusal detection).
3.  **Pull Request Workflow**: Instead of pushing directly to `main`, the action should create a Pull Request. This allows human review (or "Architecture AI" review) before publishing.
4.  **Error Handling**: Add retry logic for API calls.

## Detailed Implementation

### Workflow Changes
-   **Trigger**: Add `schedule` (cron) for regular updates.
-   **Output**: Create PR using `peter-evans/create-pull-request` action.
-   **Validation**: Run `scripts/validate-content.js` before committing.

### Prompt Template
```markdown
Write a blog post about {topic}.
Output format: Markdown with Frontmatter.
Frontmatter fields: title, date, excerpt, tags (array), category.
Content requirements: ...
```

## Consequences
-   **Positive**: Higher quality content, safer deployment (PR review), better SEO.
-   **Negative**: Slightly more complex workflow; requires manual merge of PRs (can be automated if validation passes).
