// Normalizes a tech/skill label into a comparable slug — strips a leading
// "AWS " (About says "AWS S3", a project's stack list just says "S3"),
// lowercases, and collapses everything else to hyphens. Used to link About's
// skill chips to the matching stack tag inside the Projects cards.
export function tagSlug(label) {
  return label
    .toLowerCase()
    .replace(/^aws\s+/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
