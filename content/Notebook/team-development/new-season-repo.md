---
title: Creating a Repo for a New Season
description: How to set up the robot code repository for a new FTC season
---

# Creating a Repo for a New Season

Each season we start a fresh code repository from the official FTC SDK. This keeps old seasons intact and gives us a clean base on the newest SDK. Our 2025-26 repo is `ftc-25805/biobuzz`; follow the same steps with a new name.

## Before You Start

- You need push access to the [ftc-25805](https://github.com/ftc-25805) GitHub organization.
- Install `git` and the [GitHub CLI](https://cli.github.com/) (`gh auth login`).
- Pick a repo name (lowercase, one word, e.g. `biobuzz`).

## 1. Create the Empty Repo on GitHub

Create it in the `ftc-25805` org with **no** README, `.gitignore`, or license. The SDK already ships its own, and a non-empty repo makes the first push fail.

```bash
gh repo create ftc-25805/<name> --private --description "FTC 25805 <season> robot code"
```

Or use the web UI: **ftc-25805 → New repository**.

## 2. Clone the Official SDK

```bash
git clone https://github.com/FIRST-Tech-Challenge/FtcRobotController.git <name>
cd <name>
```

The default branch holds the latest released SDK. To pin to a specific release instead, check out its tag first (`git tag`, then `git checkout -b main <tag>`).

## 3. Point the Repo at Our Remote

The clone's `origin` points at FIRST's repo. **Change it before pushing**, or you will try to push to FIRST's repository.

```bash
git remote set-url origin https://github.com/ftc-25805/<name>.git
git remote -v        # confirm both lines show ftc-25805
git branch -M main
git push -u origin main
```

If HTTPS asks for a username, either use the SSH URL (`git@github.com:ftc-25805/<name>.git`) or authenticate through `gh`:

```bash
git -c credential.helper='!gh auth git-credential' push -u origin main
```

## 4. Check It Worked

- Open `https://github.com/ftc-25805/<name>` and confirm the SDK files are there.
- Open the project in Android Studio and let Gradle sync.
- Build the `TeamCode` module once to make sure the base compiles.

## 5. Set Up the Repo

- Add team members under **Settings → Collaborators and teams**.
- Protect `main` (require pull requests) so competition-ready code can't be broken by a stray push.
- Put team code in `TeamCode/src/main/java/org/firstinspires/ftc/teamcode`. Avoid editing `FtcRobotController` so future SDK updates merge cleanly.
- Add a short README noting the season, game name, and who maintains the code.

## 6. Update the Website

- Add a season page under `content/Season/` (see [[Season/BioBuzz|BioBuzz]] for an example).
- Link the new repo from that page.
- Add a build log note under `content/Notebook/`.

## Updating the SDK Mid-Season

To pull in a newer SDK release without losing our code:

```bash
git remote add upstream https://github.com/FIRST-Tech-Challenge/FtcRobotController.git
git fetch upstream --tags
git merge <new-tag>
```

Resolve any conflicts, rebuild, and test on the robot before merging to `main`.
