// ─────────────────────────────────────────────────────────────────────────
// "VANGO: The Art Passport", a plain-language research report on the VANGO
// prototype, transcribed from VANGO-Paper.md in the VANGO repository.
// Rendered by src/app/publications/vango/page.tsx. Kept here so the page
// stays presentational, matching the site's content/ convention.
//
// House style for this report: no em dashes, no dash ranges, no inline bold.
// The source paper follows those rules; keep them if you edit this file.
// ─────────────────────────────────────────────────────────────────────────

/** A paragraph is either plain prose, or prose introduced by a bold lead-in
 *  (used for the labelled limitation entries). */
export type Paragraph = string | { lead: string; text: string };

export interface ReportSection {
  id: string;
  number: string;
  title: string;
  paragraphs: Paragraph[];
}

export interface Citation {
  ref: string;
  url?: string;
}

export const vangoReport = {
  eyebrow: "Publications · Academic report",
  title: "VANGO: The Art Passport",
  subtitle: "A Digital Passport for Recording Visits to Works of Art",
  org: "Ethical Tech CoLab",
  advisor: "NYU Center for Global Affairs",
  date: "2026",
  authors:
    "Melanie MacKew. Developed as part of masters research at the NYU Center for Global Affairs, under the Ethical Tech CoLab.",
  thesis:
    "A passport does not evaluate the traveller or rank the countries visited. It records that a person was in a particular place on a particular day. VANGO applies that idea to art: each participating artwork carries a short code, a visitor standing in front of the work scans or types it, and a dated stamp is added to a passport carried on their phone. The application is a record of attendance, not of ownership, value, or authenticity. It answers one question only: who went to see what, and when.",

  // Figures pulled from the body for the hero stat band.
  stats: [
    {
      value: "7",
      label:
        "artworks in the catalogue, five invented for demonstration and two real",
    },
    {
      value: "4",
      label:
        "interface languages, English, French, Italian, and Hausa",
    },
    {
      value: "5",
      label:
        "fixed colour schemes, selected arithmetically from the stamp's own identifier rather than at random",
    },
    {
      value: "10",
      label:
        "limitations the prototype states about itself, including that a code proves nothing about presence",
    },
  ],

  sections: [
    {
      id: "foreword",
      number: "00",
      title: "Foreword",
      paragraphs: [
        "Most people who visit a museum, a biennale, or a small studio exhibition leave with nothing to show for it. The ticket is thrown away. The photograph is lost in a phone. A few months later the visitor can recall that the work was striking but not what it was called, who made it, or where it was seen. For the institution, the encounter is equally invisible: a body passed through a room and left no trace of having been moved by anything.",
        "There is an older technology that solved a version of this problem. A passport does not evaluate the traveller or rank the countries visited. It simply records, in a durable and personal form, that a person was in a particular place on a particular day, and it does so with a stamp that carries the character of the place that issued it.",
        "VANGO is a research prototype that applies this idea to art. It is a digital passport, carried on a phone, in which a visitor collects a stamp for each artwork they go and see. This report explains in non-technical language what VANGO is, how it works, what each piece of information it stores actually represents, and what it deliberately does not attempt to do.",
      ],
    },
    {
      id: "executive-summary",
      number: "01",
      title: "Executive Summary",
      paragraphs: [
        "VANGO is a research prototype, an experimental piece of software, that takes the form of a small illustrated passport book displayed on a mobile phone screen. Each participating artwork is given a short code. A visitor who is standing in front of the work either scans a printed square barcode, known as a QR code, or types the code by hand. The application then adds a stamp for that artwork to the visitor's passport, dated with the day of the visit.",
        "The application is a record of attendance, not of ownership, value, or authenticity. It answers one question only: who went to see what, and when.",
        "The prototype contains a catalogue of seven works. Five are invented demonstration pieces with fictional artists and venues. Two are real: the marble David by Michelangelo at the Galleria dell'Accademia in Florence, and Bura ceramics from Niger, a class of Iron Age terracotta object discussed in Section 9 of this report.",
        "Each stamp is drawn as a perforated postage stamp with a hand-drawn illustration of the work, in one of five colour schemes. The colour is not chosen at random each time it is displayed. It is derived arithmetically from the stamp's own identifier, so that a given stamp always appears in the same colours to every user, on every device, forever.",
        "The application can be used in two ways. In guest mode nothing leaves the visitor's own phone and no account is required. In account mode the visitor registers with an email address and password, and the collection is stored on a server so that it survives a change of device.",
        "The interface is available in four languages: English, French, Italian, and Hausa, one of the principal languages of Niger and northern Nigeria.",
        "VANGO is a student research prototype. It is a demonstration of an idea about audience engagement. It is not a finished consumer product, it has not been tested with real museum visitors, and, as Section 10 sets out, several parts of it are visibly unfinished.",
      ],
    },
    {
      id: "background",
      number: "02",
      title: "Background and Rationale",
      paragraphs: [
        {
          lead: "The problem.",
          text: "Cultural institutions have limited ways of encouraging repeat attendance or of connecting a visit to one venue with a visit to another. Loyalty schemes are commercial in tone and tend to reward spending rather than attention. A visitor who has seen forty exhibitions over five years holds that history only in memory.",
        },
        {
          lead: "The precedent.",
          text: "The design borrows openly from an established and well-evidenced model. Since 1986 the United States National Park Service, in partnership with the non-profit now known as America's National Parks, has run the Passport To Your National Parks programme, a small booklet in which visitors collect ink cancellation stamps at park visitor centres. The scheme has endured for four decades because the reward is not a discount but a record. VANGO transposes this format from landscape to art.",
        },
        {
          lead: "The gap.",
          text: "The paper passport works because each park has a physical desk and a rubber stamp. Individual artworks do not. An exhibition may run for six weeks in a rented pavilion. What VANGO proposes is that a printed code placed beside a work can perform the same function as the rubber stamp at the ranger's desk, at negligible cost and with no staffing requirement.",
        },
        {
          lead: "The response.",
          text: "VANGO is therefore built around the smallest possible unit of proof: a short code, posted in public, that a visitor converts into a dated entry in a personal book. Everything else in the application, the illustrations, the page-turning animation, the passport number, exists to make that entry feel worth keeping.",
        },
      ],
    },
    {
      id: "objectives",
      number: "03",
      title: "Objectives",
      paragraphs: [
        "The prototype is designed to give a visitor a durable, personal, and pleasing record of the individual works of art they have gone to see.",
        "To reduce the cost of participation for an institution to the price of printing a sheet of paper, so that a small studio can take part on the same terms as a national museum.",
        "To work without a network connection to any central service, and without requiring the visitor to create an account, so that a person can use the tool with no disclosure of personal information at all.",
        "To present the record in a form that is legible across languages, including a West African language, rather than defaulting to English and the major European languages alone.",
        "And to ensure that a given artwork's stamp looks the same in every visitor's passport, so that the stamp functions as a shared emblem of the work rather than as decoration generated afresh for each person.",
      ],
    },
    {
      id: "how-it-works",
      number: "04",
      title: "How VANGO Works",
      paragraphs: [
        "The application has four moving parts: a catalogue of artworks, a way of capturing a code, a book in which stamps are stored, and an optional account.",
        {
          lead: "The catalogue.",
          text: "The catalogue is a fixed list held inside the application itself. Each entry consists of a code and three pieces of descriptive text: the title of the work, the artist, and the venue. The seven current entries are Chromatic Drift, Fault Lines, Hollow Choir, Echo Garden, Voidwalk, Bura Ceramics, and David. Because the catalogue is written into the application, a new artwork can only be added by editing the software and publishing it again. The README file documents how to do this. There is no facility for a gallery to register its own work without a developer.",
        },
        {
          lead: "Capturing a code.",
          text: "A visitor opens the add-stamp panel and chooses one of two methods. The first uses the phone's camera to read a QR code. The second is a text box in which the code is typed. A third route exists for institutions that would rather share a web link than print a barcode: a specially formed web address carries the code within it, and opening that link adds the stamp directly.",
        },
        "Before a code is looked up it is normalised, meaning it is converted into a single standard form. The application converts all letters to capitals and removes any spaces and hyphens. The practical effect is that a visitor who types \"chroma-14\", \"CHROMA 14\", or \"Chroma14\" gets the same result. This is a small decision with a large effect on how forgiving the tool feels to someone squinting at a label in a dim room.",
        "If the code matches no catalogue entry, the visitor is told that no artwork is registered for that code. If it matches a work already in the passport, the visitor is told so rather than being given a duplicate.",
        {
          lead: "The book.",
          text: "The passport is presented as a book that opens and whose pages turn. The first page inside the cover is the biography page. Each subsequent page holds exactly two stamps. A back page invites the visitor to collect another. When a new stamp is earned the book automatically turns to the page where it has landed, after a short animation showing the stamp being pressed.",
        },
        {
          lead: "The account.",
          text: "A visitor may register with an email address and password, or continue as a guest. The two paths are described in Section 7. The distinction matters because it determines where the visitor's record is kept and who else can see it.",
        },
      ],
    },
    {
      id: "variables",
      number: "05",
      title: "The Variables Explained",
      paragraphs: [
        "This section is the heart of the report. VANGO stores a small number of pieces of information, and each was chosen for a reason. What follows explains, in ordinary words, what each one represents, why it exists, and what it does.",
        {
          lead: "The code.",
          text: "The code is a short string of capital letters and digits such as CHROMA14 or DAVID01. It is the only thing a visitor needs in order to claim a stamp. It must be short enough to type on a phone while standing up, distinctive enough not to be confused with a neighbouring work, and printable in large type on a card. Codes in the catalogue combine a word suggesting the work with a number, which makes them memorable without being guessable in a systematic way. The code is the key that unlocks the catalogue entry: everything the stamp displays about the artwork comes from looking up this one value.",
        },
        "An honest observation about the code. It is a public secret. It is printed beside the work for anyone to see, and it can be photographed, texted to a friend, or published online. The application performs no check on the visitor's location and no check on the time of day. A person who never entered the building can collect the stamp.",
        {
          lead: "Title, artist, and venue.",
          text: "These three pieces of text are held in the catalogue, not entered by the visitor, and they appear on the face of the stamp along with the date. They are the minimum needed for the record to mean anything later. A stamp reading only CHROMA14 would be an unreadable souvenir. Naming the artist alongside the title also matters as a matter of practice, in that it treats the maker rather than the venue as the primary fact about the work.",
        },
        {
          lead: "The date collected.",
          text: "The date is recorded as the calendar day on which the stamp was claimed, with no time of day. It is stored in the international standard order of year, then month, then day, and displayed in the style of a border control stamp, for example 14 MAY 2026. The day is the meaningful unit of a visit. Storing the hour and minute would add precision that no one needs and would make the record more personally revealing than it has to be. The date is printed on the stamp, it determines the order in which stamps appear in the book, and in guest mode it forms part of the rule that prevents a work being stamped twice on the same day.",
        },
        {
          lead: "The stamp identifier.",
          text: "Every stamp is given an internal identifier made by joining the artwork code to the date, for example CHROMA14-2026-05-14. This value is never shown to the visitor. The application needs a way to tell one stamp from another when arranging them on a page, and it needs a stable value from which to derive the stamp's appearance.",
        },
        {
          lead: "The colour palette and the seed.",
          text: "The application holds five fixed pairs of colours: a teal, a pink, a bronze, a blue-violet, and a gold, each paired with a darker version of itself. Every stamp is drawn in one of these five schemes. The scheme is not chosen by the person who added the artwork, and it is not chosen at random. The application takes the stamp identifier and runs it through a hashing function, which is a piece of arithmetic that turns a piece of text into a number. It then divides that number by five and uses the remainder to select the palette.",
        },
        "This method is deterministic, meaning that the same input always produces the same output. Because the identifier for a given artwork on a given date is always the same, the resulting colour is always the same. Two visitors comparing passports will see the same colours for the same work. Had the colours been picked at random when the stamp was created, they would differ between visitors and might change if the application were reinstalled, which would make the stamp feel arbitrary rather than official. The two chosen colours are used throughout the stamp, in the illustration, the border, and the lettering.",
        {
          lead: "The illustration.",
          text: "Each of the seven catalogue entries has its own hand-drawn illustration built into the application as line and shape instructions rather than as a photograph. The David stamp shows the figure with the subtitle FIRENZE 1504. The others are similarly bespoke. Drawings avoid the copyright and licensing questions that photographs of artworks raise, they remain sharp at any size on any screen, and they carry the visual character of an engraved postage stamp, which is the aesthetic the whole application is reaching for.",
        },
        "There is also a fallback. If a work has no bespoke drawing, the application generates an abstract composition of between four and six shapes, again derived arithmetically from the stamp identifier so that it is stable rather than random. In the current catalogue every work has a bespoke drawing, so this fallback is not visible, but it is what would appear if a new code were added without artwork.",
        {
          lead: "The visitor's own details.",
          text: "Three items describe the passport holder rather than the art: the display name, which the visitor types in the settings panel and which defaults to \"Explorer\"; the profile picture, which the visitor uploads from their own device; and the passport number. The application also stores two preferences: whether the interface is shown in its dark or light colour scheme, and which of the four languages is in use.",
        },
        {
          lead: "The passport number and the membership date.",
          text: "These two variables are the least settled part of the prototype, and the report would be less useful if it glossed over that. When a visitor registers an account, the server generates a passport number in the style of a real travel document: three letters followed by six digits. The letters are drawn from an alphabet that deliberately omits I and O, because those characters are easily confused with the digits 1 and 0 when read aloud or copied by hand. This is a considered choice and matches the convention used on machine-readable travel documents.",
        },
        "However, the biography page inside the book does not display this number. It displays the figure 1000 plus the number of stamps the visitor holds. A visitor with three stamps sees passport number 1003, and that number changes to 1004 the moment they collect another. The same page derives the membership date from the earliest stamp in the collection rather than from the date the account was created, so a visitor who has collected nothing sees no date at all. The most likely explanation is that the biography page was written first, as a visual mock-up, and the server was added later without the page being updated to read from it. Whatever the cause, the figures on the biography page are at present decorative rather than authoritative, and this should be corrected before anyone treats a VANGO passport number as an identifier.",
        {
          lead: "The rule against duplicates.",
          text: "The application prevents the same work being stamped twice, but the rule differs between the two modes of use, and the difference is deliberate. For a registered account the database enforces one stamp per artwork per account, permanently. A visitor who returns to the David a second time will not receive a second stamp. In guest mode the rule is looser: one stamp per artwork per day. A guest may therefore accumulate repeat visits to the same work on different dates.",
        },
        "The permanent rule expresses the passport metaphor faithfully, in that a passport records that you have been to a country rather than how many times. The daily rule makes the guest mode easier to demonstrate, since a person showing the application to someone else can collect the same stamp again tomorrow without clearing their data. It is a demonstration convenience rather than a principled position.",
        {
          lead: "Two stamps per page.",
          text: "The book places exactly two stamps on each page, and inserts an empty page when the current page is full so that the visitor always sees somewhere for the next stamp to go. This is a presentational constant chosen to suit a phone screen held upright, and it is the one variable in the application whose value carries no meaning beyond layout.",
        },
        {
          lead: "Demonstration stamps.",
          text: "A guest opening the application for the first time is given three stamps already collected: Chromatic Drift, Fault Lines, and Hollow Choir, dated across May and June 2026. These are not real visits. They exist so that a person opening the demonstration sees a passport with contents rather than an empty book, which would communicate very little about what the tool is for. A registered account starts genuinely empty.",
        },
      ],
    },
    {
      id: "reading-the-results",
      number: "06",
      title: "Reading the Results",
      paragraphs: [
        "What the visitor sees is a book, not a score. VANGO produces no rating, no ranking, no leaderboard, and no recommendation. There is nothing to optimise. This is a design decision worth naming, because the obvious commercial version of this application would gamify attendance, and this one declines to.",
        "The biography page shows the holder's name and photograph, the number of stamps collected, and the passport number and membership date discussed above. It carries an emblem labelled Ars Pro Mundo, and the line \"Interact with art and receive a unique stamp for each piece you visit.\"",
        "The stamp pages show the stamps themselves, two to a page, each with its illustration, title, artist, venue, and date, inside a perforated border with decorative rosettes at the corners. The back page carries the line \"Every world leaves a mark\" and a button to collect another stamp.",
        "The only number in the entire application that a visitor might be tempted to compete over is the count of stamps collected, and nothing is built on top of it.",
      ],
    },
    {
      id: "two-ways-to-use-it",
      number: "07",
      title: "Two Ways to Use It",
      paragraphs: [
        {
          lead: "Guest mode.",
          text: "The visitor taps past the sign-in screen. Stamps are held in the phone's own browser storage. Nothing is transmitted anywhere and no account exists. The record survives closing the application but is lost if the browser's data is cleared or the phone is replaced. For a visitor who does not want to hand over an email address in exchange for a souvenir, this is the whole application, working, at no cost in privacy.",
        },
        {
          lead: "Account mode.",
          text: "The visitor registers with an email address, a password of at least eight characters, and optionally a name. The password is not stored. It is passed through a one-way scrambling process called hashing, using a deliberately slow method known as bcrypt, so that a person who obtained a copy of the database could not read the passwords out of it. The visitor's session is then held by a signed token that expires after seven days.",
        },
        {
          lead: "What the server stores.",
          text: "The database holds two lists. The first is people: email address, hashed password, name, uploaded picture, membership date, passport number, and the moment the account was created. The second is stamps: which person, which artwork code, and on what date. That is the entire extent of it. The server does not record where the visitor was, what device they used, or how long they looked at anything.",
        },
        {
          lead: "An important practical caveat.",
          text: "The published demonstration on the public web cannot reach a server. The address of the server is written into the application as a local address on the developer's own machine. A visitor opening the public demonstration can therefore use guest mode fully, but registration and sign-in will not work. The account system is real, tested code, but it is at present only usable by someone running both halves of the application on their own computer.",
        },
      ],
    },
    {
      id: "language-and-reach",
      number: "08",
      title: "Language and Reach",
      paragraphs: [
        "The entire interface, including error messages and the welcome sequence, is translated into four languages: English, French, Italian, and Hausa. The translations are held as complete parallel sets of every phrase rather than being assembled from fragments, which keeps the tone consistent within each language.",
        "The inclusion of Hausa is the notable choice. Hausa is one of the most widely spoken languages of West Africa, including in Niger, and it is not a language that consumer applications of this kind ordinarily support. Read alongside the presence of Bura ceramics in the catalogue, it suggests the prototype is not addressed solely to a European museum audience. The README lists only English, French, and Italian, so the Hausa translation, which was added later, is currently undocumented.",
      ],
    },
    {
      id: "cultural-property-context",
      number: "09",
      title: "Cultural Property Context",
      paragraphs: [
        "One catalogue entry raises questions the rest do not. Bura Ceramics is attributed in the catalogue to Niger rather than to a named artist, and to a venue given only as the initials AABC, which the repository does not expand.",
        "The Bura culture refers to a group of Iron Age archaeological sites in the lower Niger River valley, in south-western Niger and south-eastern Burkina Faso, whose terracotta funerary vessels and equestrian figures were first excavated in the 1980s. The sites have since been looted on a very large scale. Terracotta statuettes and pottery from the Bura system appear on the Red List of West African Cultural Objects at Risk published by the International Council of Museums, a listing that exists specifically to alert museums, dealers, customs officers, and collectors that objects of that description are likely to have been removed illegally.",
        "Niger is a State Party to the 1970 UNESCO Convention on the Means of Prohibiting and Preventing the Illicit Import, Export and Transfer of Ownership of Cultural Property, the principal international instrument requiring states to control the movement of cultural objects across borders and to cooperate in their return.",
        "The relevance to VANGO is narrow but real. The application records that a person went to see an object. It records nothing whatsoever about how that object came to be where it is. If a stamp is issued beside a Bura vessel in a gallery, the visitor's passport will say only that they saw it, on a particular day, at that venue. The document is silent on whether the object should be there.",
        "This is not a criticism of the design. It is a boundary that ought to be stated plainly, because a document styled as a passport carries an implication of officialdom that the underlying record does not support. A future version placing works of contested origin in its catalogue would do well to carry the object's collection history on the stamp page, or to link to the holding institution's own published account of it.",
        "For completeness, and because the question naturally arises with any software touching art: VANGO has no relationship to the provenance research frameworks that govern restitution claims, such as the 1998 Washington Principles on Nazi-Confiscated Art, and no relationship to stolen-art databases such as the Art Loss Register. It does not check, assert, or store anything about title, authenticity, or ownership history. It is a record of attendance.",
      ],
    },
    {
      id: "limitations",
      number: "10",
      title: "Limitations and Caveats",
      paragraphs: [
        "The prototype has real and visible limits, and a reader deciding whether to build on it should know them.",
        {
          lead: "The code cannot prove presence.",
          text: "Anyone holding the code can collect the stamp from anywhere in the world. There is no location check, no time window, and no single-use mechanism. For a souvenir this matters little. For anything that conferred a benefit, such as a discount or a prize, the scheme would be trivially defeated.",
        },
        {
          lead: "The published demonstration cannot sign anyone in.",
          text: "The address of the account server is written into the application as a local address on the developer's own machine, so sign-in and registration fail on the public web.",
        },
        {
          lead: "The passport number is not the one the server issues.",
          text: "The passport number and membership date shown to the visitor are derived from the stamp collection rather than read from the server, so both are decorative rather than authoritative.",
        },
        {
          lead: "The catalogue cannot be extended without editing the software.",
          text: "There is no interface through which a gallery could register a work. Seven works is a demonstration, not a deployment.",
        },
        {
          lead: "Most of the catalogue is fictional.",
          text: "Five of the seven entries are invented. The application has, so far as the repository shows, never been placed in a real exhibition or tested with real visitors.",
        },
        {
          lead: "Each illustration must be drawn by hand in code.",
          text: "This is what makes the stamps attractive and it is also what prevents the catalogue from growing quickly. A catalogue of hundreds of works would need either a different approach to imagery or a great deal of labour.",
        },
        {
          lead: "QR scanning is not universally available.",
          text: "It depends on a barcode-reading capability that not every mobile browser provides. The application detects this and directs the visitor to type the code instead, which is a sound fallback but a less pleasant one.",
        },
        {
          lead: "Profile pictures are stored inefficiently.",
          text: "They are uploaded and stored in a form that makes them substantially larger than the original file, and are held in the same database as the account records. This is workable at demonstration scale and would not be the right approach at any real volume.",
        },
        {
          lead: "Three versions of the application coexist.",
          text: "The repository contains the current source, a superseded starting page, and a single large self-contained file of roughly two-thirds of a megabyte. Which of these is authoritative is not documented, though the build configuration makes clear that the current source is what is published.",
        },
        {
          lead: "No automated tests exist.",
          text: "The repository contains none.",
        },
      ],
    },
    {
      id: "practical-nature",
      number: "11",
      title: "Practical Nature of the Tool",
      paragraphs: [
        "VANGO runs in an ordinary mobile web browser. There is nothing to install from an application store. A visitor follows a link or scans a code and the passport opens.",
        "The visitor-facing half of the application is published automatically to a free public web host each time the software is changed. The optional account server is a separate program that must be run by whoever operates the service.",
        "For an institution, participation requires printing one page per artwork. The repository provides a ready-made page for each of the seven works, containing the code, the artwork details, and a QR code, designed to be printed and displayed beside the work.",
      ],
    },
    {
      id: "audience",
      number: "12",
      title: "Intended Audience and Use",
      paragraphs: [
        "The immediate audience is the exhibition visitor, and the design assumes that person is holding a phone, standing up, and has perhaps thirty seconds of patience.",
        "The secondary audience is the small or temporary venue: a studio, a pavilion, a biennale stand, an institution without the budget for a mobile application of its own.",
        "The prototype is best read as a demonstration of an argument, namely that a record of having seen something is a form of value in itself, and that it can be given to a visitor at almost no cost and without collecting anything about them in return.",
      ],
    },
    {
      id: "conclusion",
      number: "13",
      title: "Conclusion",
      paragraphs: [
        "VANGO takes a forty-year-old idea from national park visitor centres and asks whether it works for individual works of art. The answer the prototype gives is a qualified yes. The mechanism is simple enough to explain in one sentence, the cost to a venue is a sheet of paper, and the guest mode demonstrates that the whole thing can function without collecting a single piece of personal information.",
        "The prototype's most considered decision is the one a visitor will never notice: that a stamp's appearance is calculated from its own identity rather than picked at random, so that the same artwork wears the same colours in every passport in the world. That is what separates a stamp from a decoration.",
        "Its weakest points are equally clear. The published version cannot sign anyone in, the passport number on the biography page is a placeholder, the catalogue is small and mostly invented, and a code printed on a wall proves nothing about where the person holding it was standing.",
        "The application is honest about its own scope in the only way that matters, which is by not overreaching. It does not claim to authenticate, to value, to rank, or to establish where an object came from. It records that someone went to look at something. For a research prototype, knowing precisely which question it is answering is a considerable part of the work.",
      ],
    },
  ] as ReportSection[],

  citations: [
    {
      ref: "United States National Park Service and America's National Parks. Passport To Your National Parks, established 1986.",
    },
    {
      ref: "International Council of Museums. Red List of West African Cultural Objects at Risk, which lists terracotta statuettes and pottery of the Bura system.",
      url: "https://icom.museum/en/resources/red-lists/",
    },
    {
      ref: "UNESCO. Convention on the Means of Prohibiting and Preventing the Illicit Import, Export and Transfer of Ownership of Cultural Property, 1970. Niger is a State Party.",
    },
    {
      ref: "Washington Conference Principles on Nazi-Confiscated Art, 1998. Cited only to record that VANGO has no relationship to it.",
      url: "https://www.state.gov/washington-conference-principles-on-nazi-confiscated-art/",
    },
    {
      ref: "The Art Loss Register. Cited only to record that VANGO has no relationship to it.",
      url: "https://www.artloss.com",
    },
  ] as Citation[],

  // The live prototype and the source paper.
  liveUrl: "https://ethical-tech-colab.github.io/VANGO/",
  repoUrl: "https://github.com/Ethical-Tech-CoLab/VANGO",
};
