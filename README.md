# Ascent

Ascent is a free, single-user calisthenics tracker. The skill tree has 192
built-in progressions across 20 paths. Every skill includes technique notes,
a tutorial, prerequisites, and a target you can change.

## Run locally

From the project folder, start a static web server. Run the following command
on Windows with Python 3.

```powershell
py -m http.server 8000
```

Open http://localhost:8000/ in your browser. On macOS or Linux, use
`python3 -m http.server 8000`. To test from a project subdirectory, start the
server one folder up and open the corresponding project URL.

## Deploy for $0

1. Put the files and the `assets` directory in the root of a public GitHub
   repository on your `main` branch. Include `.nojekyll`.
2. In repository Settings, open Pages. Choose **Deploy from a branch**, select
   `main` and `/ (root)`, and save.
3. Open the URL GitHub Pages provides. All app assets use paths relative to the
   project, so it works at `https://username.github.io/repo/`.

The project uses HTML, CSS, JavaScript, and IndexedDB. The published site and
source are public. Workout data stays in the current browser profile and
project URL. All app assets are included in the repo. Tutorial links open
external pages on request.

## Use the tracker

- **Today** shows your level, skills, weekly quests, and next suggested skill.
  Start a workout or open Routines to select a template.
- **Skill tree** shows each path as a map. Follow the connections to see
  prerequisites and look for dashed lines where there are alternate routes.
  Drag to move, pinch or use the zoom controls, and select **Fit** to see the
  whole path. Open a node to see its tutorial, prerequisites, unlocks, and
  best set. Select **Mark mastered** to complete the skill directly. You can
  undo that mark. Workout sets can also meet the editable target. One-sided
  skills require both sides for logged mastery. Standard skills count
  unassisted sets toward the target.
- **Workout log** saves your draft as you work. Choose an exercise, enter reps
  or seconds, and expand Set details for assistance, load, side, tempo, effort,
  rest, and notes. After your first set, the previous set fills the form.
  Timers provide a countdown for rest and a stopwatch for holds.
- **History** includes your training frequency, weekly totals, and best sets.
  View any workout to edit or delete it.
- **Rewards** gives 20 XP and 2 points per day with a completed workout, and
  50 XP and 5 points per mastered skill. Each 100 XP advances one level. Add
  your own rewards and pick how many points each costs. The app recalculates
  XP and earned points from your workouts and current targets after edits.
  Redemptions remain in your history.

## Back up or move to another device

Choose **Data & settings** and **Export JSON**. On the other device or browser,
open the app and import that file. Merge keeps the newest version of matching
records and deduplicates workout and redemption IDs. Restore replaces the
current browser data with the backup. Export a copy before clearing browser
data or changing the site's address.
