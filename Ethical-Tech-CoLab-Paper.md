# The Ethical Tech CoLab Website

### A Research Report on the Public Web Platform of the NYU Center for Global Affairs Ethical Tech CoLab

*Prepared as a plain-language review of the website contained in this repository*
*based on the source code, content, and documentation held here*

---

## Foreword

Research laboratories that work at the frontier of new technology face a
recurring problem: the work is often difficult to see. Prototypes live on
scattered servers, reports sit in shared drives, and the people doing the work
are known only to a small circle of colleagues. When the subject matter touches
human rights, migration, forced labor, and the protection of displaced people,
this invisibility carries a cost. Communities, partners, funders, and
policy-makers cannot engage with work they cannot find.

This repository holds the public website of the NYU Center for Global Affairs
Ethical Tech CoLab, a research initiative run in collaboration with Microsoft.
The website is the lab's front door. It gathers the lab's mission, its research
questions, its cohorts of graduate researchers, its working prototypes, and its
published reports into a single, coherent, public place. This report explains,
in non-technical language, what the website is, what it does, how it is built,
and what it is intended to achieve. It is written for a general, policy, and
institutional audience rather than a technical one.

---

## 1. Executive Summary

1.1 This repository contains a public website. It is the online home of the
NYU Center for Global Affairs Ethical Tech CoLab, a lab that conducts applied
research on how emerging technologies such as artificial intelligence and
decentralized systems can be used to improve the human condition, with a
particular focus on migration, forced labor, refugees, and displaced people.

1.2 The website exists to make the lab's work legible and accessible. It
presents, in plain language, the lab's mission and vision, the research
questions it is pursuing, the graduate researchers and advisors who carry out
the work, the working software prototypes the lab has produced, and the
academic reports that document its findings.

1.3 The site is organized around a small number of clear sections: a home page
that introduces the lab and its current research questions, a portfolio of
projects grouped by research question, a set of live demonstrations of working
software, a publications area, and a team directory with individual profiles.

1.4 A guiding design choice runs through the whole project: the words that
appear on the site are kept separate from the code that displays them. Nearly
all of the site's text lives in a single content file, so that non-technical
contributors can update copy without touching the underlying software. This
keeps the pages presentational and the content easy to maintain.

1.5 The website is built with modern, widely used web technology and is
published as a static site, meaning it is delivered as ready-made pages that
load quickly, cost little to host, and are resilient. It is hosted publicly and
freely available on the open web.

1.6 The site was created and is maintained by the NYU Center for Global
Affairs Ethical Tech CoLab as part of masters research and applied research
carried out by successive cohorts of graduate students, under the direction of
the lab's faculty.

---

## 2. Background and Rationale

2.1 The lab. The Ethical Tech CoLab is a research initiative of the NYU
School of Professional Studies Center for Global Affairs, conducted in
collaboration with Microsoft. It focuses on applied research at the frontier of
AI, decentralized technology, and human rights, with an emphasis on migration,
forced labor, refugees, and displaced people. Each project is intended to move
from a research question to a fielded prototype within a semester-long cohort.

2.2 The problem the website solves. Applied research produces many kinds of
output: papers, proposals, datasets, prototypes, and lessons learned. Without a
shared public home, these outputs are hard to discover and hard to connect to
one another. A visitor cannot easily see how a single prototype fits into a
larger research question, or how one cohort's work builds on the last.

2.3 The response. The website gathers everything into one structured place.
It frames the lab's activity as a set of research questions, then shows the
concrete projects, prototypes, and reports that sit under each question. This
lets a visitor move from a high-level question, such as how AI can inform
evacuation decisions, down to a specific working tool, and then out to the code
or the live demonstration behind it.

2.4 The audience. The site is written for a broad audience: prospective
collaborators and partners, funders, prospective and current graduate
researchers, and members of the public and policy community interested in the
responsible use of technology for human rights and humanitarian ends.

---

## 3. Objectives

The website is designed to:

3.1 Present the lab's mission and vision clearly, so that a first-time
visitor understands what the lab does and why.

3.2 Organize the lab's research around a small set of guiding questions, and
show the concrete projects that explore each one.

3.3 Showcase working prototypes, with direct links to live demonstrations and,
where available, to the underlying source code.

3.4 Publish and surface the lab's academic reports, whether hosted on the site
itself or linked externally.

3.5 Introduce the people behind the work, including the lab director, faculty
advisors, staff, and each cohort of graduate researchers, with individual
profile pages.

3.6 Make the site easy to maintain and update by non-technical contributors,
by keeping the site's copy in one place and separate from the code.

---

## 4. How the Website Is Organized

The site is arranged as a set of connected sections, reachable from a common
navigation bar. A visitor works through them to move from the lab's overall
purpose down to individual projects and people.

### 4.1 Home

The home page introduces the lab with a short statement of purpose and presents
its current research questions. It highlights the active cohort and gives the
visitor an immediate sense of the lab's focus: intervention opportunities at the
intersection of emerging technologies and the human condition.

### 4.2 Portfolio

The portfolio is organized around research questions rather than around
individual products. Each research question, for example how AI can inform
evacuation decisions, or how technology can support the ethical return of
cultural artifacts, opens to reveal the specific projects exploring it. Every
project carries a short plain-language summary, a status, and, where relevant, a
link to view the code or launch a live demonstration.

### 4.3 Live Demonstrations

The live demonstrations section gathers the lab's working software into one
place, so that a visitor can try the prototypes directly. Each demonstration
carries a short description, the primary technology it is built with, and the
cohort it came from, and can be filtered by semester and by theme.

### 4.4 Publications

The publications area lists the lab's academic reports. Each research question
the lab takes on is being written up as a report. Some reports are published on
the site itself, others link out to external documents, and those still in
progress are shown as forthcoming.

### 4.5 Team

The team section introduces the people behind the work: the lab director, the
faculty advisors, the staff, and each cohort of graduate researchers. Every
profiled person has an individual page reachable by a stable web address,
carrying a photograph, a role, and a biography.

---

## 5. How the Website Is Built

5.1 A content-first design. The single most important structural choice in
the project is the separation of content from code. Almost all of the words that
appear on the site are stored in one central content file. The pages themselves
are kept presentational: they arrange and display the content but do not contain
it. This means a contributor can correct a name, update a project summary, or add
a new researcher by editing one well-organized file, without needing to
understand the software that renders the pages.

5.2 Modern web framework. The site is built with a current, widely used web
framework for building interactive websites, together with a typed programming
language that helps catch errors before they reach visitors. This combination is
a mainstream, well-supported choice for professional web work.

5.3 Published as a static site. The website is produced as a set of
ready-made pages rather than being assembled fresh for every visitor. Static
pages of this kind load quickly, are inexpensive to host, and remain available
even under load. The site is published to and served from a public, free hosting
service on the open web.

5.4 Accessibility and performance. The site is designed to be legible and
usable, with attention to readable typography, image handling, and smooth
navigation between pages. Photographs of team members are optional and fall back
gracefully to initials when an image is not yet available.

5.5 Documented for contributors. The repository includes documentation that
explains where the content lives, how to run the site locally during
development, and how to add team photographs. This lowers the barrier for new
contributors, including those who are researchers first and web developers
second.

---

## 6. What the Website Presents

6.1 A living record of research questions. Rather than a fixed brochure, the
site is structured as a set of open research questions, each with the projects
exploring it. As the lab's work advances, new projects and prototypes are added
under the relevant question.

6.2 A portfolio that spans several domains. The projects shown on the site
range across disaster response and evacuation decision-making, the ethical
return of cultural artifacts, verifiable claims in ethical supply chains, and
the rehearsal of high-stakes diplomacy, among others. Earlier cohorts'
projects, covering online safety, sustainability, the carbon footprint of AI,
and generative storytelling, are preserved in an archive.

6.3 Working prototypes, not just descriptions. Where a project has produced a
runnable prototype, the site links directly to a live demonstration, so that the
claim is something a visitor can try rather than only read about.

6.4 The people and the partners. The site names the graduate researchers,
advisors, and staff who carry out the work, and identifies the lab's founding
partners and collaborators. This gives the work a human face and makes the
lab's network of relationships visible.

---

## 7. Maintenance and Contribution

7.1 Editing the content. Because the site's copy is centralized in one
content file, most updates are content edits rather than code changes. A
contributor updates the text in that file, and the affected pages reflect the
change.

7.2 Running the site locally. The repository documents the standard steps to
install the project's dependencies and run a local development version of the
site, so that a contributor can preview changes before they are published.

7.3 Adding people and images. Team photographs are dropped into a dedicated
folder and referenced from the content file. When an image is not present, the
site shows the person's initials instead, so the directory always renders
cleanly.

---

## 8. Limitations and Caveats

The repository is a working website for a research lab, and it is honest about
its evolving nature. Some points to keep in mind:

8.1 It is a living project. Sections, projects, and copy change as the lab's
research and cohorts advance. Content is expected to be revised over time.

8.2 Some items are placeholders. Certain links, social handles, and forms are
intentionally left blank or disabled until the corresponding accounts, reports,
or services exist. The site is written to hide or gracefully disable these until
they are ready.

8.3 The prototypes are experimental. The projects and demonstrations linked
from the site are experimental applied research, offered for demonstration and
learning. They are not finished products, and nothing on the site constitutes
legal, financial, or professional advice.

8.4 Attribution and views. Views and findings expressed on the site are those
of the researchers and do not represent the official positions of New York
University, Microsoft, or any partner institution.

---

## 9. Intended Audience and Use

9.1 The website is aimed at collaborators, partners, funders, prospective and
current graduate researchers, and members of the public and policy community
interested in the responsible use of emerging technology for the human
condition.

9.2 Its value is framed not as a technical showcase but as a bridge: it makes
the lab's research questions, prototypes, publications, and people visible,
connected, and easy to engage with. It is designed to lower the distance between
the work and the audiences who can use, support, or extend it.

---

## 10. Conclusion

10.1 This repository is more than a set of web pages. It is the public
expression of a research program that treats emerging technology as a means to
improve the human condition, with a focus on migration, forced labor, and the
rights of displaced people. By organizing the lab's work around clear research
questions, linking each question to concrete prototypes and reports, and naming
the people who do the work, the site turns a scattered body of research into
something a newcomer can understand and navigate.

10.2 Its most useful quality is quiet but important: the separation of content
from code. That choice keeps the site truthful and current, because the people
closest to the research can keep it up to date without technical friction. The
result is a durable, accessible, and honest window into the work of the NYU
Center for Global Affairs Ethical Tech CoLab.

---

## Attribution

Built and maintained by the NYU Center for Global Affairs Ethical Tech CoLab, a
research initiative of the NYU School of Professional Studies Center for Global
Affairs conducted in collaboration with Microsoft, as part of masters research
carried out by successive cohorts of graduate researchers under the direction of
Prof. Yorke E. Rhodes III (2026).


> Note: This report is a plain-language summary of a research lab's public
> website. The projects and prototypes it describes are experimental applied
> research, provided for demonstration only. Nothing on the site or in this
> report constitutes legal, financial, or professional advice, and the views
> expressed are those of the researchers rather than of New York University,
> Microsoft, or any partner institution.
