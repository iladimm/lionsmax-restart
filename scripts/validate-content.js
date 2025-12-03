import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_DIR = path.resolve('content');

function validateContent() {
    if (!fs.existsSync(CONTENT_DIR)) {
        console.log('No content directory found.');
        return;
    }

    const files = fs.readdirSync(CONTENT_DIR).filter(file => file.endsWith('.md'));
    let hasErrors = false;

    files.forEach(file => {
        const content = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf-8');
        const { data, content: body } = matter(content);

        // Check Frontmatter
        if (!data.title) {
            console.error(`[${file}] Missing title in frontmatter.`);
            hasErrors = true;
        }
        if (!data.date) {
            console.error(`[${file}] Missing date in frontmatter.`);
            hasErrors = true;
        }

        // Check Body
        if (body.length < 500) {
            console.error(`[${file}] Content too short (${body.length} chars).`);
            hasErrors = true;
        }
        if (body.includes("As an AI language model")) {
            console.error(`[${file}] Contains AI boilerplate.`);
            hasErrors = true;
        }
    });

    if (hasErrors) {
        process.exit(1);
    } else {
        console.log('All content validated successfully.');
    }
}

validateContent();
