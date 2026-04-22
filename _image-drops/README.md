# Image Drop Folder

Drop any new images here. Claude picks them up, renames to the correct path,
and wires them into the HTML. This keeps things simple and repeatable.

## How it works

1. Open `Cohli_Website_Image_Manifest_v1.0.xlsx` (in the parent Cohli folder).
2. Filter the Placeholders tab by `Status = Needed`.
3. For each row, use the name in the `Drop Filename` column (e.g. `jannah.jpg`,
   `alentejo-eco-farm-hero.jpg`).
4. Drop the file into this folder using that exact name.
5. In a new chat or same chat, tell Claude: "images are dropped".

Claude will:
- Move each file from `_image-drops/` to its final path (`Target Path` column).
- Resize / compress if needed (keeps images under 200KB, max 1600px wide).
- Update the HTML to swap the placeholder for the real image.
- Update the manifest: `Status` = `Live`.
- Leave any drops it didn't recognize, and ask about them.

## Naming rules

- Kebab-case, lowercase, no spaces: `alentejo-eco-farm-hero.jpg`.
- Use the exact `Drop Filename` from the manifest. If you're improvising,
  describe it in chat so Claude can match it to the right row.
- JPEG preferred. PNG only for transparency (logos, icons).

## What NOT to put here

- Final production images already named with their full path (those go
  straight to `img/{cohort-slug}/` if you're placing them manually).
- Anything that isn't a web image (no PSDs, RAWs, videos).

## This folder is git-ignored

Drops here are treated as a staging area and don't get committed. Only final
images under `/img/...` end up in the repo.
