// src/pages/dev/config.yml.js

// The raw YAML content for our configuration
const yamlConfig = `
backend:
  name: github
  repo: xovucom/webdesignfla
  auth_type: oauth

media_folder: "public/uploads"
public_folder: "/uploads"

collections:
  - name: "portfolio"
    label: "Portfolio"
    folder: "src/content/portfolio"
    create: true
    slug: "{{slug}}"
    fields:
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Category", name: "category", widget: "string" }
      - { label: "Featured Image", name: "image", widget: "image", required: false }
      - { label: "Body", name: "body", widget: "markdown", required: false }
`;

// This is an Astro API route. It returns the YAML content with the correct header.
export async function GET() {
  return new Response(yamlConfig, {
    headers: {
      'Content-Type': 'text/yaml; charset=utf-8',
    },
  });
}