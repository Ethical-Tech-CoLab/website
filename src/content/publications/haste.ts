// ─────────────────────────────────────────────────────────────────────────
// "HASTE": plain-language research report on the HASTE rapid damage
// assessment platform, transcribed from HASTE-Paper.md in the
// Ethical-Tech-CoLab/haste repository, which is a fork of microsoft/haste.
// Rendered by src/app/publications/haste/page.tsx. Kept here so the page
// stays presentational, matching the site's content/ convention.
//
// Attribution note: the software is Microsoft's, not the CoLab's. Only this
// plain-language report was prepared under the CoLab. Keep that distinction
// intact if you edit this file.
//
// House style for this report: no em dashes, no dash ranges, no inline bold.
// The source paper follows those rules; keep them if you edit this file.
// ─────────────────────────────────────────────────────────────────────────

/** A paragraph is plain prose, prose introduced by a bold lead-in (used for
 *  the labelled variable and limitation entries), a bulleted list, or a small
 *  data table. The objectives, the imagery providers, the label classes, and
 *  the reported performance figures are all reference material the reader
 *  scans rather than reads, so they keep their original structure. */
export type Paragraph =
  | string
  | { lead: string; text: string }
  | { intro?: string; list: string[]; ordered?: boolean }
  | { table: { caption?: string; headers: string[]; rows: string[][] } };

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

export const hasteReport = {
  eyebrow: "Publications · Academic report",
  title: "HASTE: High-speed Assessment and Satellite Tracking for Emergencies",
  subtitle: "Rapid Post-Disaster Building Damage Assessment",
  org: "Software by the Microsoft AI for Good Lab · Report by Ethical Tech CoLab",
  advisor: "NYU Center for Global Affairs",
  date: "2026",
  authors:
    "HASTE was developed by the Microsoft AI for Good Lab and released as open-source software under the MIT Licence. The contributors recorded in the repository's commit history are Meygha Machado, Caleb Robinson, Joaquín Rivero, Cameron Birge, Marcelo Duarte, and Anthony Cintron Roman. The accompanying research paper additionally credits Anthony Ortiz, Simone Fobi Nsutezo, Kevin White, Inbal Becker-Reshef, and Juan M. Lavista Ferres. This plain-language report was prepared under the Ethical Tech CoLab at the NYU Center for Global Affairs as part of masters research (2026), on the fork of the project held at Ethical-Tech-CoLab/haste.",
  thesis:
    "In the hours after an earthquake, a hurricane, or a wildfire, the single most useful thing a relief coordinator can hold is a map of which buildings are still standing. The traditional answers are slow, and neither reliably delivers inside the first days, which is the window in which decisions about people, supplies, and attention are actually being made. HASTE lets a trained analyst who is not a machine-learning engineer take fresh imagery of a disaster zone, mark a small number of examples by hand, and have a computer extend those examples across the whole affected area. This report explains what it does, what each of its settings means, and what it cannot be trusted to do.",

  // Figures pulled from the body for the hero stat band.
  stats: [
    {
      value: "31",
      label:
        "field deployments since early 2023, a record of adoption rather than of accuracy, and reported by the platform's own developers",
    },
    {
      value: "3",
      label:
        "labelled buildings, across at least two categories, before the in-browser classifier will train",
    },
    {
      value: "0.1",
      label:
        "damage threshold, one tenth of a building's visible area, the most consequential single number in the platform and set low on purpose",
    },
    {
      value: "0.84",
      label:
        "area under the ROC curve from one per cent of labels, against 0.88 fully supervised. Parity arrives at ten per cent, where it reaches 0.91",
    },
  ],

  sections: [
    {
      id: "foreword",
      number: "00",
      title: "Foreword",
      paragraphs: [
        "In the hours after an earthquake, a hurricane, or a wildfire, the single most useful thing a relief coordinator can hold is a map of which buildings are still standing. Where should search teams go first? Which neighbourhoods need shelter, and how many people are likely to need it? Which roads lead to places that no longer exist? Those questions have to be answered before anyone on the ground has been able to walk the affected area, and often before the affected area is safe to walk at all.",
        "The traditional answers are slow. Teams fly helicopters over the damage, photograph it, and interpret the photographs by hand. Official mapping services task a satellite, wait for a cloud-free pass, and publish a product days later. Both are careful and both are valuable, but neither reliably delivers inside the first days, which is the window in which decisions about people, supplies, and attention are actually being made.",
        "HASTE, which stands for High-speed Assessment and Satellite Tracking for Emergencies, is an open-source research platform built to shorten that gap. It lets a trained analyst who is not a machine-learning engineer take fresh satellite or aerial imagery of a disaster zone, mark a small number of examples by hand, and have a computer extend those examples across the whole affected area to produce a building-by-building damage estimate. This report explains, in non-technical language, what HASTE does, how it does it, what each of its settings means, and what it cannot be trusted to do.",
      ],
    },
    {
      id: "executive-summary",
      number: "01",
      title: "Executive Summary",
      paragraphs: [
        "HASTE is a web-based platform that turns post-disaster satellite imagery into an estimate of which individual buildings have been damaged. It was developed by the Microsoft AI for Good Lab and released as open-source software under the MIT licence. The version reviewed here is the copy held in the Ethical Tech CoLab repository, which is a fork of the original project at microsoft/haste.",
        "The platform's central design choice is to train a fresh model for each disaster rather than maintain one global model that tries to recognise damage everywhere. A hurricane in Jamaica and an earthquake in Türkiye leave visually different traces on visually different building stock, and a model tuned to one is not expected to work on the other. HASTE accepts that limitation deliberately in exchange for speed: a model fitted to one event, from one analyst's labels, can be ready in minutes.",
        "A human being is required at every stage. A person chooses the imagery, marks the training examples, inspects the predictions, checks a random sample of them against their own eyes, and decides whether the result is fit to be shared. There is no automatic mode, and the project documentation states repeatedly that outputs are preliminary signals requiring expert validation rather than authoritative damage assessments.",
        "HASTE offers two routes from imagery to an answer. The faster route, Rapid Building Assessment, computes a numerical fingerprint for every building in the area, asks the analyst to label a handful of them, and trains a very small classifier inside the web browser that scores all the rest in seconds. The slower route, Damage Mapping, asks the analyst to draw damaged and undamaged areas by hand and trains a full image-segmentation model on a graphics processor, producing a continuous, pixel-level damage map.",
        "Both routes end at the same place: a per-building damage figure, a set of accuracy measures computed against a human-labelled validation sample, and an estimate of the total number of damaged buildings with a stated margin of error.",
        "The platform depends on outside data it does not produce. Imagery comes from commercial and public providers such as Planet, Maxar, Airbus, the European Union's Copernicus programme, and the United States National Oceanic and Atmospheric Administration. Building outlines come from the Overture Maps Foundation, which itself draws heavily on OpenStreetMap and on machine-derived building datasets. Where those outlines are missing or wrong, HASTE has nothing to attach its predictions to.",
        "According to the research paper published alongside the platform, HASTE has been used in thirty-one field deployments since early 2023, and its outputs have been released openly through the Humanitarian Data Exchange.",
      ],
    },
    {
      id: "background",
      number: "02",
      title: "Background and Rationale",
      paragraphs: [
        {
          lead: "The problem.",
          text: "Rapid damage assessment is a timing problem before it is a technical one. Imagery of a disaster zone often becomes available within a day. An interpretation of that imagery detailed enough to direct a response team to a particular neighbourhood usually does not. The interval between the two is where humanitarian decisions are made with the least information and the greatest consequences.",
        },
        {
          lead: "The gap.",
          text: "Established products have real strengths and known constraints. Copernicus Emergency Management Service Rapid Mapping, the European Union's free on-demand crisis mapping service, delivers standardised map products within hours to days of an activation, but must be formally activated by an authorised user and covers only large-scale emergencies. Manual aerial surveys are accurate but limited in geographic reach and slow to process. Neither easily absorbs the specific situational context that a particular responding organisation cares about, such as one parish, one road corridor, or one category of structure. Those two are not the nearest neighbours, though, and describing the field by them alone would make the platform look more novel than it is. HASTE is benchmarked on xBD, the dataset built for the xView2 building damage challenge, and that challenge produced a substantial body of automated damage classification work which is the real comparator. The honest claim is not that nothing existed. It is that the existing machine learning approaches assume a globally pretrained model applied to a new disaster, and HASTE trades that for a disposable per event model that an analyst fits by hand, in a browser, without writing code.",
        },
        {
          lead: "The response.",
          text: "HASTE was built around two propositions that emerged from earlier in-browser damage-assessment research at the same laboratory. The first is to train per event rather than for the world, accepting narrow, disposable models in exchange for speed and local fit. The second is that human oversight should be structural rather than advisory: the operator is not reviewing a machine's conclusion after the fact, the operator is the source of everything the machine knows about this event.",
        },
        "The design also reflects a practical constraint on who does this work. The people who understand what damage looks like in a given country are rarely the people who can write machine-learning code. HASTE is presented as a no-code platform so that the person supplying the expert judgment and the person operating the model can be the same person.",
      ],
    },
    {
      id: "objectives",
      number: "03",
      title: "Objectives",
      paragraphs: [
        {
          intro: "The platform is designed to do the following.",
          list: [
            "Produce a building-level damage estimate from post-disaster imagery quickly enough to be useful inside the first days of a response.",
            "Allow a non-programmer to fit a model to a specific event using only a map interface, a mouse, and their own visual judgment.",
            "Keep a human in control of every consequential step, including the decision to release a result at all.",
            "Express uncertainty honestly, by measuring the model against a separate human-labelled sample and reporting a margin of error on the headline damage figure rather than a single confident number.",
            "Produce outputs in standard geographic file formats so that they can be opened in the mapping software humanitarian organisations already use, and published openly where appropriate.",
            "Remain deployable by others. The platform can be run on a laptop for evaluation or installed on an organisation's own cloud infrastructure, in which case that organisation, and not Microsoft, controls the imagery and the outputs.",
          ],
        },
      ],
    },
    {
      id: "how-it-works",
      number: "04",
      title: "How HASTE Works",
      paragraphs: [
        "The workflow has a shared beginning, then splits into two routes, then rejoins for validation and reporting.",
        {
          lead: "The shared beginning.",
          text: "An analyst first creates a project, which is simply a container for one disaster event. It records a name, a description, the date of the event, and the affected countries. The date and the countries are stored for reference and do not affect any calculation.",
        },
        "Into that project the analyst adds an image layer, which is the imagery being assessed. HASTE accepts GeoTIFF files, a standard image format that carries the geographic coordinates of every pixel alongside the picture itself. Several files covering the same area can be uploaded together and are merged into a single mosaic. Imagery from before the event is optional and is used for visual comparison, not for the calculation.",
        "HASTE then obtains the outlines of every building in the area covered by the imagery. By default it downloads them automatically from Overture Maps, an open dataset maintained by the Overture Maps Foundation under the Linux Foundation, which combines OpenStreetMap with machine-derived building datasets from Microsoft and Google and, on the foundation's own account, covers roughly 2.3 billion buildings worldwide. An analyst who has better local data can upload their own outlines instead, as a GeoPackage file of up to 500 megabytes; HASTE converts it to the standard global coordinate system and trims it to the imagery area. When the layer is created the analyst chooses a workflow, Building or Standard, which determines which of the two routes is available.",
        {
          lead: "Route A, Rapid Building Assessment.",
          text: "This route is available when building outlines exist and produces an answer in minutes with no separate training job. First, HASTE computes an embedding for every building. An embedding is a compact list of numbers that describes what the imagery around that building looks like: its texture, its colour, its edges. Two buildings that look alike receive similar lists of numbers. Nothing in the embedding knows anything about damage; it is simply a numerical description of appearance.",
        },
        "The analyst then opens a map, clicks buildings, and assigns each one to one of three categories: Intact, Damaged, or Cloudy, the last meaning that cloud or shadow makes the building impossible to judge. A left click labels a building, a right click removes the label, and holding the control key while dragging labels many at once.",
        "Once at least three buildings have been labelled across at least two categories, a very small statistical model called a logistic regression trains automatically in the browser and immediately predicts a category for every other building in view. The analyst can flip between what they labelled and what the model predicted, see where it is wrong, label a few more examples, and watch the prediction improve. This loop takes seconds, which is what makes the route fast. When satisfied, the analyst runs a final pass that scores every building in the layer and saves the result as a geographic data file.",
        {
          lead: "Route B, Damage Mapping with a trained model.",
          text: "This route does not require building outlines and produces a continuous damage picture across every pixel of the imagery rather than a verdict per building. The analyst draws polygons, rectangles, or circles over a small part of the image and assigns each shape a class. The default classes are Background, Building, and Damaged Building; additional classes of No Damage and Flood Extent are offered for particular event types. The project documentation advises drawing at least five to ten shapes per class, considers seventy to one hundred a good training set, and states that more than roughly one hundred and fifty is unnecessary.",
        },
        "Those shapes train an image-segmentation model, which is a model that assigns a class to every individual pixel rather than to a whole picture. The architecture used is a U-Net with a ResNeXt-50 encoder, a standard and well-understood design in satellite image analysis, started from weights pre-trained on ordinary photographs and then fitted to the analyst's labels. Training runs on a graphics processor, either locally in a container or on cloud computing capacity. The trained model is then run across the entire image layer, producing a per-pixel damage prediction that can be viewed alongside the imagery and downloaded.",
        {
          lead: "Turning pixels into buildings.",
          text: "A per-pixel damage map is not directly useful to a responder, who needs to know about buildings. HASTE therefore overlays the building outlines onto the pixel predictions and, for each building, counts what proportion of the classified pixels inside that outline were called damaged. That proportion, between zero and one, is the building's damage fraction. It is the number that drives everything downstream. The same step also records what proportion of each building was obscured by cloud, so that unreadable buildings can be set aside rather than silently counted as undamaged.",
        },
        {
          lead: "Validation.",
          text: "Both routes end with the same discipline. The analyst opens a validation tool that presents a random sample of roughly two hundred building outlines over the post-event imagery and asks them to judge each one independently as Damaged, Not Damaged, or Unknown. These human judgments are treated as the ground truth against which the model's predictions are scored. Buildings marked Unknown are excluded from the scoring entirely rather than being guessed at.",
        },
      ],
    },
    {
      id: "variables",
      number: "05",
      title: "The Variables, Explained Simply",
      paragraphs: [
        "This section is the heart of the report. Every number an analyst can adjust, and every number fixed inside the code, is described below in ordinary terms: what it represents, why it is set where it is, and what it changes about the answer.",
        {
          lead: "The label classes.",
          text: "These are the categories an analyst draws with. Each is stored internally as a class value, and later steps identify a class by that position rather than by its name.",
        },
        {
          table: {
            headers: ["Class", "Stored value", "What it marks"],
            rows: [
              ["Background", "1", "Ground and anything that is not a building."],
              ["Building", "2", "An intact structure."],
              [
                "Damaged Building",
                "3",
                "A structure showing damage. This is the class the damage figures are computed from.",
              ],
              [
                "Cloud",
                "4",
                "Areas where cloud or shadow makes the imagery impossible to read.",
              ],
            ],
            caption:
              "The four positional label classes and the values they are stored as.",
          },
        },
        "Two of these choices carry more weight than they appear to. The reason Background exists as a class in its own right is that the model is only taught by the pixels the analyst actually marked, so if a damaged roof is labelled without the ground around it, the model is never told what the ground is, and can produce a blurry, spreading prediction without ever being penalised for it. Labelling a building together with its surroundings is what forces the model to learn a boundary. And cloudy buildings are excluded from the damage statistics rather than counted as intact, which would otherwise bias the result downward in exactly the wet, storm-affected conditions where damage assessment matters most.",
        {
          lead: "No Damage and Flood Extent.",
          text: "Two additional classes offered for earthquake, fire, and flood event types respectively. Flood Extent lets the analyst mark standing water, which HASTE can intersect with building outlines to say which buildings are in water. It does not estimate how deep that water is.",
        },
        {
          lead: "Normalisation means and standard deviations.",
          text: "Image pixels are stored as whole numbers, but models learn more stably from values between 0 and 1, so each channel is rescaled by subtracting a mean and dividing by a standard deviation. In the worked example shipped with the platform these are set to 0 and 255, which is a plain rescaling of ordinary 8-bit imagery. When an image layer is prepared automatically, HASTE instead sets every mean to zero and sets each channel's divisor to the brightness value at that channel's 98th percentile, so that the brightest two per cent of pixels are treated as glare and clipped rather than being allowed to compress everything else into a narrow band. This matters because imagery from different sensors arrives on different numeric scales, and a wrong divisor makes the picture unrecognisable to the model.",
        },
        {
          lead: "Ground resolution.",
          text: "It is worth stating plainly that HASTE never checks, records, or standardises how many metres of ground each pixel covers. It works on whatever grid the supplied imagery has. Several settings are expressed in pixels rather than metres as a result, and the physical area covered by a training tile therefore varies with the imagery source.",
        },
        {
          lead: "Learning rate, default 0.0001.",
          text: "How large a correction the model makes each time it discovers it was wrong. Too large and it lurches past the right answer; too small and it never gets there within the time available. The default is a conservative value appropriate to fine-tuning a model that already carries useful pre-trained weights. Batch size, default 32 for training, sets how many image tiles the model examines before making one correction. Larger batches give a steadier, less noisy signal about which direction to move in, but require proportionally more memory on the graphics processor.",
        },
        {
          lead: "Maximum epochs.",
          text: "One epoch is one complete pass through the training data. A small number is intended here, for a clear reason: the model is being fitted to a few dozen hand-drawn shapes from a single event, and training it longer would mainly teach it to memorise those particular shapes rather than the general appearance of damage. The repository is inconsistent about the actual figure. The worked example specifies 10, the form in the web interface offers 3, and the server falls back to 1 when nothing is supplied, while the training script separately imposes a hardcoded minimum of 10. An analyst who selects 3 in the interface is therefore asking for a maximum below the enforced minimum. This is worth flagging to anyone reproducing a result.",
        },
        {
          lead: "Training chip size, 256 pixels.",
          text: "The model does not see the whole scene at once. It is shown small square cut-outs 256 pixels on a side, drawn at random from the labelled area, and it is shown 1,024 batches of them per epoch. The model's whole view of the disaster is assembled from these fragments.",
        },
        {
          lead: "Buffer, nominally 3 metres.",
          text: "Applied to the Building class using the Background class. When a person traces a building, the traced line is never exactly on the wall. This setting draws a narrow band around each building polygon and treats it as Background, which stops the imprecision of human tracing from teaching the model that the pavement is part of the structure. The setting is written in metres but is applied by counting pixels, so it means three metres only when a pixel happens to represent one metre of ground. The script's own documentation notes this.",
        },
        {
          lead: "Patch size, default 2048, and padding, default 64.",
          text: "Used when running the finished model across the full image. Satellite scenes are far too large to process in one piece, so they are cut into square tiles. Predictions are least reliable at the very edge of a tile, where the model can see no context, so each tile is processed with 64 pixels of overlap that are then discarded. This is what stops a visible grid pattern from appearing across the finished damage map.",
        },
        {
          lead: "Initial weights, default none.",
          text: "Meaning the model starts from weights learned on ordinary photographs. An analyst can instead start from a previously trained HASTE model held in the model catalogue, which is offered only where the event type and imagery source match, since a model fitted to wildfire imagery is not a sensible starting point for flood imagery.",
        },
        {
          lead: "The cloud penalty.",
          text: "An optional setting, switched off by default, changes how the model is corrected in areas the analyst marked as Cloud. Rather than being told what class those pixels really are, which nobody knows, the model is penalised whenever it predicts damage beneath a cloud. In plain terms it is taught not to claim to see through weather.",
        },
        {
          lead: "Embedding backbone.",
          text: "The method used to convert the appearance of a building into numbers. The lightweight default is MOSAIKS, an approach published in Nature Communications in 2021 that passes the image through a large set of randomly generated filters rather than learned ones. The counter-intuitive finding of that work is that random filters, applied at sufficient scale, describe an image well enough for a simple linear model to make accurate predictions from them, at a tiny fraction of the computational cost. The alternative offered is DINOv2, a family of vision models released by Meta AI in 2023 that learned general visual features from 142 million unlabelled images, available in small and base sizes.",
        },
        {
          lead: "Output dimensions, default 1024.",
          text: "Applicable to MOSAIKS only. How many numbers describe each building. More numbers capture more nuance and cost more time and memory. When DINOv2 is used this setting is ignored, because the size of the description is fixed by the model itself: 384 numbers for the small version, 768 for the base version, 1024 for the large one.",
        },
        {
          lead: "Kernel size, default 7.",
          text: "The width in pixels of each random filter. Small filters respond to fine texture such as roof material and rubble; larger ones respond to coarser structure. Seven pixels is a middle setting suited to detecting the change in surface texture that collapse produces.",
        },
        {
          lead: "Resize factor, default 4.",
          text: "How much the small image crop around each building is enlarged before being described. In moderate-resolution satellite imagery a single house may span only a handful of pixels, too few for the filters to find anything. Enlarging the crop fourfold gives them something to work with. This is a real trade-off and not a free gain: enlarging an image does not create detail that the sensor never recorded, it only makes the recorded detail large enough to be measured. Choosing DINOv2 forces this setting back to 1, because that model brings its own fixed way of dividing an image into pieces.",
        },
        {
          lead: "Context padding, 8 pixels.",
          text: "Each building crop reaches a little beyond the traced outline, so that the description includes some of the ground immediately around the structure. Debris and scorch marks sit there rather than on the roof.",
        },
        {
          lead: "What is actually described.",
          text: "The crop is divided into a grid of small tiles, each tile is described separately, and only those tiles falling inside the building's outline are averaged together to produce the building's final list of numbers. Buildings that fall outside the imagery keep their place in the file with an empty entry rather than being dropped, because everything downstream matches buildings to predictions by position in the file rather than by name. That design decision is efficient and fragile in equal measure. A crop cap fixed at 192 source pixels stops a single very large building, such as a warehouse or a stadium, from generating an enormous crop and exhausting the available memory; oversized footprints are cropped from the centre instead.",
        },
        {
          lead: "The in-browser classifier.",
          text: "The model that turns a handful of labelled buildings into predictions for all of them is a logistic regression, one of the oldest and simplest classifiers in statistics. It fits a straight-line boundary through the space of building descriptions and reports, for each building, how far onto the damaged side of that boundary it falls. Its learning rate is 0.1 and it takes 500 steps, values fixed in the code rather than exposed to the analyst, chosen to complete in well under a second so that the label-and-see loop stays interactive.",
        },
        {
          lead: "Regularisation strength, 0.01.",
          text: "A deliberate penalty that discourages the model from placing heavy reliance on any single one of the thousand-odd numbers describing each building. Without it, a model trained on three examples would seize on whatever coincidental feature happened to separate those three, and would fail on the fourth. This single small number is the main defence against overfitting in a workflow explicitly built around very few labels.",
        },
        {
          lead: "Holdout fraction, 0.2 in practice.",
          text: "One fifth of the analyst's labels are held back from training and used only to score the model, which is what produces the live precision, recall, and F1 figures shown for the Damaged class in the side panel. Because those numbers come from labels the model was never shown, they are an honest indication of quality rather than a report of how well the model memorised its own training data. Two weaknesses are worth naming. The sample is tiny: with twenty labels the holdout is four buildings, and four buildings cannot tell you much. And the split is drawn afresh every time a label is added, so the displayed figures jump around from click to click. The code comments say so explicitly.",
        },
        {
          lead: "Buffer distances, 0, 10, and 20 metres.",
          text: "HASTE calculates each building's damage fraction three times: once inside the traced outline, once inside a ring extending ten metres beyond it, and once at twenty metres. There are two reasons. Building outlines and satellite imagery are frequently misaligned by several metres, particularly in dense cities and where the ground itself has moved, so the strict outline may sit over the neighbouring plot. And some kinds of damage, notably debris fields and burn scars, appear around a structure rather than on it. The wider measurements are recorded so that this can be examined rather than assumed.",
        },
        {
          lead: "Damage fraction.",
          text: "For a given buffer, the number of pixels classified as Damaged Building divided by the number of classified pixels of any kind inside that shape. Unclassified pixels, recorded as zero, are excluded from both the top and the bottom of that division, so a building half outside the imagery is judged on the half that was actually seen. The result is capped at 1.",
        },
        {
          lead: "Damage threshold, default 0.1.",
          text: "The proportion of damaged pixels above which a building is declared damaged. This is the most consequential single number in the entire platform, and it is set low on purpose. A tenth of a building's visible area showing damage indicators is treated as enough, reflecting a judgment that in the first days of a response, missing a damaged building is a worse error than flagging one that turns out to be intact. It also compensates for partial visibility: a structure photographed from overhead shows mainly its roof, and serious structural damage may present as only a modest patch of altered texture there. Because the threshold is a setting rather than a fixed rule, and because the platform also publishes a full precision-and-recall curve across all possible thresholds, an analyst who disagrees with this trade-off can see exactly what a different choice would cost.",
        },
        {
          lead: "A wrinkle a careful reader should know about.",
          text: "The exported data file also carries a simple yes-or-no damaged column, and that column is set whenever a building contains even one damaged pixel, with no threshold at all. The validation report reads that column; the assessment report applies the tenth-part threshold. The same model and the same human labels will therefore yield slightly different accuracy figures in the two reports. Nothing in the documentation flags this, and it is the kind of discrepancy that could confuse a reader comparing the two.",
        },
        {
          lead: "Minimum footprint area, default 50 square metres.",
          text: "Buildings smaller than this are excluded from the population used for the final headline estimate. The stated reasoning is that these are structures a human reviewer could not realistically have judged in the validation step, so including them in an extrapolation built from human judgments would be unsound. Note the consequence, which the platform does not hide: small informal structures are absent from the headline count, and those structures are common in precisely the settlements most exposed to disaster.",
        },
        {
          lead: "Cloud exclusion.",
          text: "Any building with a cloud fraction above zero is excluded from the damage count entirely. This is a strict rule, not a proportional one; a building need only be slightly obscured to be set aside.",
        },
        {
          lead: "The final estimate.",
          text: "HASTE does not simply count the buildings its model called damaged and publish that number. It uses the human-validated sample to estimate the true damage rate and scales that rate up to the full population of buildings. The arithmetic is a standard finite-population survey estimate. The sample proportion, written as p-hat, is the number of buildings a human confirmed as damaged divided by the number of buildings the human judged either way, with Unknown buildings excluded from both figures. The population, written as N, is the count of building outlines larger than the minimum area, and the estimated number of damaged buildings is simply N multiplied by p-hat.",
        },
        {
          lead: "The sampling fraction, written as f.",
          text: "The size of the validated sample divided by the population. It enters the calculation through what statisticians call a finite-population correction, the term (1 minus f) in the variance. Its effect is intuitive: if you have checked half of all the buildings by hand, your uncertainty about the other half should be smaller than if you had checked one per cent of them. Standard survey formulas assume an infinite population and would overstate the uncertainty here.",
        },
        {
          lead: "The critical value z, fixed at 1.959963984540054.",
          text: "This is the constant that turns a standard error into a 95 per cent confidence interval, and it is written out as a literal number in the code specifically so that the platform does not have to load a heavy statistical library to obtain it. The reported interval runs from N times (p-hat minus z times the standard error) to N times (p-hat plus z times the standard error).",
        },
        {
          lead: "What the interval means in plain terms.",
          text: "If the same sampling exercise were repeated many times, an interval calculated this way would contain the true number of damaged buildings in about nineteen cases out of twenty. It accounts for the fact that a sample was taken. It does not account for a mislabelled sample, misaligned building outlines, or a model that is wrong in a consistent direction, and it should not be read as expressing total uncertainty about the figure.",
        },
      ],
    },
    {
      id: "reading-the-results",
      number: "06",
      title: "Reading the Results",
      paragraphs: [
        {
          lead: "The visualiser.",
          text: "The pre-event and post-event imagery are shown side by side with a swipe control between them, the predicted damage layer overlaid on both, and the raw per-pixel predictions available as an optional toggle. Opacity, contrast, hue, and saturation sliders help make damage visible in imagery that was captured in poor light.",
        },
        "On the map, each building is shaded according to its damage fraction in five bands, cut at one fifth, two fifths, three fifths, and four fifths, running from white through pale peach and orange to red and dark red. This is a presentational scale only. It should not be read as a severity classification in the sense used by structural engineers, because the model was never taught degrees of damage. It only ever learned to separate damaged from intact, and the shading reflects how much of a roof it flagged rather than how badly the building was hurt.",
        {
          lead: "The validation report.",
          text: "This compares the model's predictions against the analyst's own validation labels and reports overall accuracy, precision, recall, and F1 for each class, a macro-averaged F1, and a confusion matrix. Precision answers the question: of the buildings the model called damaged, what share really were? Recall answers the opposite: of the buildings that really were damaged, what share did the model find? These two errors have different humanitarian costs, and the report deliberately does not merge them into a single figure.",
        },
        {
          lead: "The assessment report.",
          text: "This summarises the whole layer: the total number of building outlines, how many were excluded as cloud-covered, how many of the remainder were predicted damaged and what percentage that represents, the accuracy metrics at the chosen threshold, a precision-and-recall curve across all thresholds, and the estimated total of damaged buildings with its 95 per cent confidence interval. Where no validation labels exist, the report still shows the prediction counts but withholds the accuracy metrics and the estimate rather than presenting an unvalidated number.",
        },
        {
          lead: "Downloads.",
          text: "Results can be exported as a GeoPackage, an open standard file that opens in common mapping software, along with the training artefacts and the building outlines used. This matters for accountability: a partner receiving a HASTE layer can inspect it independently rather than taking a summary figure on trust.",
        },
      ],
    },
    {
      id: "data-sources",
      number: "07",
      title: "Data Sources",
      paragraphs: [
        {
          lead: "Imagery.",
          text: "HASTE holds no imagery of its own; the analyst supplies it. Only GeoTIFF files are accepted. The documentation records that in past activations imagery has come from the following providers.",
        },
        {
          list: [
            "Planet, a commercial operator of a large constellation of small satellites that publishes disaster imagery openly.",
            "Maxar, now Vantor, a commercial provider of high-resolution imagery with its own open data programme for disasters.",
            "The Airbus Foundation.",
            "Sentinel-1 and Sentinel-2, the radar and optical satellites of the European Union's Copernicus programme, whose data is free to all.",
            "Products from the Copernicus Emergency Management Service.",
            "Aerial imagery from the United States National Oceanic and Atmospheric Administration.",
          ],
        },
        "The software itself has no live connection to any of these providers. Placeholder functions for fetching imagery directly from Maxar and Planet exist in the code but are empty. In practice the analyst supplies a link to a file, and for security reasons those links may point only at Azure Blob Storage or Amazon S3, the two hosting services on the platform's permitted list. Public disaster imagery from the major providers is generally published on one of those, which is why the restriction is workable.",
        "HASTE does adjust for the provider in one respect. Different satellites record their colour bands in different orders, and some record bands the human eye cannot see, so the platform holds a lookup table of band orders for Planet Scope, Planet Skysat, Maxar, Sentinel-2, and one partner-specific format, and uses it to assemble a correct colour picture. Where the source is unknown it falls back to reading the labels embedded in the file, and failing that assumes the first three bands are red, green, and blue.",
        {
          lead: "Building outlines.",
          text: "Overture Maps by default, with OpenStreetMap and Microsoft Building Footprints as the underlying open datasets, and analyst-supplied outlines where better local data exists. HASTE reads the Overture data anonymously from a public store, taking the most recent release available and falling back to a fixed February 2026 release if it cannot determine one. Only polygons are kept, and everything is converted to the standard global coordinate system.",
        },
        {
          lead: "What HASTE does not use.",
          text: "The platform draws on imagery and building outlines and nothing else. It does not read ground reports, weather data, sensor networks, social media, or population figures. Its picture of a disaster is strictly what a camera in orbit could see, which is a narrower thing than what happened.",
        },
        {
          lead: "Personal data.",
          text: "The platform is not designed to identify people, does not ingest or output personal data, and does not treat person-scale features in imagery as signal.",
        },
      ],
    },
    {
      id: "evidence",
      number: "08",
      title: "Evidence of Performance",
      paragraphs: [
        {
          lead: "Everything in this section is the developer's own account.",
          text: "The benchmark results, the deployment record, and the field precision and recall figures all originate from the Microsoft paper and repository. None of them has been independently reproduced or externally validated, here or elsewhere, so they should be read as what the team that built the platform reports about it rather than as third-party verification. That is not an accusation of overstatement. It is the provenance of the evidence, and it is the first thing a sceptical reader is entitled to know.",
        },
        {
          lead: "Validated accuracy.",
          text: "The research paper published alongside the platform, HASTE: A Platform for Rapid Post-Disaster Building Damage Assessment (arXiv:2607.11838), reports experiments on xBD, a public benchmark dataset of paired pre-event and post-event satellite imagery with expert damage annotations. The team collapsed the benchmark's minor, major, and destroyed categories into a single damaged category and measured how well each embedding method performed as the number of labels was varied.",
        },
        "The discrimination score in the table below is the area under the receiver operating characteristic curve, usually shortened to AUROC. In plain terms it is the probability that the model ranks a randomly chosen damaged building above a randomly chosen intact one. It runs from 0 to 1, a coin flip scores 0.5, and 1.0 would mean the model never gets a pair the wrong way round. It is worth knowing that this measure says nothing about where the threshold should sit: a model can rank buildings well and still mislabel a great many of them once a cutoff is applied.",
        {
          table: {
            headers: ["Approach", "Labels used", "Discrimination score"],
            rows: [
              ["Strongest embedding", "1 per cent", "0.84"],
              ["Strongest embedding", "10 per cent", "0.91"],
              ["Fully supervised ResNet-50", "All labels", "0.88"],
            ],
            caption:
              "Reported performance on the xBD benchmark as the number of labels was varied.",
          },
        },
        "The practical claim is that a handful of labels plus a good general-purpose image description gets close to a conventionally trained model. It should be read precisely, because the headline figure is a modest deficit rather than a match: at one per cent of labels the score is 0.84 against the fully supervised 0.88, and it is at ten per cent, where it reaches 0.91, that the fast route actually overtakes the baseline. What one per cent buys is not equal accuracy but most of the accuracy, hours sooner and without a machine-learning engineer, which is a real trade and a different claim.",
        "The table does not say which of the two embedding methods produced these scores, and this report cannot resolve it from the published material. Since the lightweight option is the default an analyst would run, and the heavier one is the more capable, that gap matters to anyone reading the figures as a prediction of what they will get.",
        {
          lead: "Deployment record.",
          text: "The figures that follow are evidence of adoption rather than of correctness, and only the Rolling Fork assessment carries an accuracy measurement against field ground truth.",
        },
        "The same paper reports thirty-one field deployments since early 2023, including four cities assessed within three days of the February 2023 Türkiye earthquakes, a tornado assessment in Rolling Fork delivered in under two hours at 0.86 precision and 0.80 recall against field ground truth, and the August 2023 Maui wildfire, where imagery available at nine in the morning yielded an assessment by one in the afternoon identifying roughly 1,700 damaged buildings.",
        "For Hurricane Melissa in Jamaica in late 2025, four areas covering about 2,300 square kilometres were assessed. In Black River, some 110,000 building outlines were examined, of which around 65,000 were obscured by cloud.",
        {
          table: {
            headers: ["Area", "Recall", "Precision", "Estimated damaged"],
            rows: [
              ["Black River", "96 per cent", "82 per cent", "31,000 buildings"],
              ["Montego Bay", "86 per cent", "71 per cent", "Not reported"],
            ],
            caption:
              "Validated results for two of the areas assessed during the Hurricane Melissa response.",
          },
        },
        "These numbers deserve to be read carefully. The variation between Black River and Montego Bay, on the same event with the same team days apart, is substantial, and the very large share of cloud-obscured buildings in Black River is a reminder that a headline damage estimate can rest on a minority of the buildings actually present.",
      ],
    },
    {
      id: "oversight",
      number: "09",
      title: "Human Oversight and Governance",
      paragraphs: [
        "The project documentation is unusually direct that human oversight is structural rather than procedural. There is no autonomous mode. A person selects the imagery, provides every label the model learns from, reviews the predictions, validates a sample, and decides whether to distribute the result.",
        "Outputs distributed publicly, including through the Humanitarian Data Exchange and partner mapping systems, carry notices warning against over-reliance, encouraging cross-validation against ground reports and other imagery, framing the output as exploratory rather than definitive, and naming HASTE, the imagery provider, and the building-outline dataset so that a downstream user can assess provenance for themselves.",
        "The documentation states that where a widespread inaccuracy or pattern of misuse is identified, the laboratory may publish guidance recommending temporary suspension or restricted use of the workflow.",
        "Labels are not reused. Each event's labels belong to that event and are not accumulated into a global training set, which follows directly from the train-per-event design and also limits the accumulation of one analyst's interpretive habits across many responses.",
      ],
    },
    {
      id: "limitations",
      number: "10",
      title: "Limitations and Caveats",
      paragraphs: [
        "The repository documents its own weaknesses at length. The most consequential are these.",
        {
          lead: "Every performance figure in this report is developer-supplied.",
          text: "This one is not in the repository's own list, and it is the limitation a sceptical reader should weigh first. The xBD benchmark results, the deployment record, and the field precision and recall figures all come from the Microsoft paper and repository. Nothing has been independently reproduced, here or elsewhere. The rest of this report reads the source code and reports what it finds, which is first-hand; the evidence of how well the platform performs is not, and the two should not be given the same weight.",
        },
        {
          lead: "The output depends heavily on who did the labelling.",
          text: "Two competent analysts working the same event from the same imagery can produce materially different results. The documentation gives a concrete example from the Hurricane Melissa response, where an initial set of 153 labels produced predictions that described buildings as around 20 per cent damaged when they were in fact totally destroyed; the error was caught by visual inspection and corrected by adding a further 107 labels and retraining.",
        },
        {
          lead: "Imagery quality governs everything.",
          text: "Cloud, haze, low light, and imagery captured at an angle rather than from directly overhead all degrade performance, sometimes severely. Planet imagery in particular sits below the roughly 30 centimetre resolution that building-detection models generally prefer, which is part of why the platform leans on external building outlines rather than trying to find buildings itself.",
        },
        {
          lead: "Building-outline coverage is uneven in a way that matters.",
          text: "OpenStreetMap and Microsoft Building Footprints are weakest in the Global South, in informal settlements, in conflict-affected areas, and where construction has been rapid and recent. These are precisely the populations most exposed to disaster. A building with no outline is invisible to HASTE regardless of how badly it was damaged, and the 50 square metre minimum area removes further small structures from the headline figure.",
        },
        {
          lead: "Spatial misalignment is routine.",
          text: "Imagery and outlines disagree most in dense urban areas and where the ground has deformed, which is to say after earthquakes.",
        },
        {
          lead: "The model does not generalise, by design.",
          text: "A model fitted to a Caribbean hurricane is not expected to work on an earthquake in Türkiye. This also means HASTE cannot be operated as a standing monitoring system.",
        },
        {
          lead: "False positives and false negatives have distinct causes.",
          text: "False positives arise from shadows, ordinary construction and demolition unrelated to the disaster, atmospheric artefacts, and vegetation change. False negatives arise from subtle structural damage visible only from an angle, damage hidden by cloud or shadow, and damage at a scale finer than the imagery can resolve.",
        },
        {
          lead: "No contextual data is incorporated.",
          text: "There is no ground truth, no weather, no sensors, no population data. Flood extent is intersected with buildings but water depth is never estimated, so HASTE can say a building is in water and not how deep.",
        },
        {
          lead: "The confidence interval understates real uncertainty.",
          text: "It quantifies the error introduced by sampling and nothing else.",
        },
        "Some findings from reading the source code should be added to the project's own list, since they bear on how much weight an output can carry.",
        {
          lead: "There is no genuinely held-out validation data in the trained-model route.",
          text: "The measure used to decide which version of the model to keep is computed on random cut-outs of the same imagery the model was trained on. It is therefore a measure of fit rather than of generalisation. The independent check in HASTE comes later, from the human validation sample, which is the number a reader should rely on.",
        },
        {
          lead: "The meaning of each class is fixed by its position in a list.",
          text: "Damaged Building is understood downstream as the third class and Cloud as the fourth. An analyst who reorders the classes when setting up a project will get damage figures computed from the wrong category, without any error being raised.",
        },
        {
          lead: "Several defaults disagree between the worked example, the web form, and the server.",
          text: "This is most visible for the number of training passes. Two analysts following the documentation by different routes may not be running the same configuration.",
        },
        {
          lead: "Predictions are matched to buildings by position in a file rather than by an identifier.",
          text: "This is fast, and it means that anything which reorders or filters the building list between steps would silently misattribute damage. The developers are evidently aware of the risk, since the code goes to some trouble to preserve row positions even for buildings it cannot assess.",
        },
        {
          lead: "The platform is not validated for production or autonomous use.",
          text: "It has not been designed, tested, or validated for production deployment or autonomous decision-making, and its outputs are not authoritative damage assessments. The documentation states plainly that users should not rely solely on HASTE outputs for decisions affecting safety, property, or human life, and should not use them to trigger public alerts or resource deployments without independent verification.",
        },
      ],
    },
    {
      id: "practical-nature",
      number: "11",
      title: "Practical Nature of the Platform",
      paragraphs: [
        "HASTE is a full web application rather than a single page or a script. It consists of a browser interface, a set of programming interfaces that the interface calls, background workers that handle long jobs such as preparing imagery and training models, a tile server that streams large satellite images into the map view, and a shared Python library holding the analysis logic.",
        "It can be run in two ways. A complete local instance can be started on one machine using Docker, a tool that packages software with everything it needs to run, which requires no cloud account and is intended for evaluation. A production instance is deployed to Microsoft Azure with a single command, and the deploying organisation controls it entirely.",
        "The local configuration is explicitly flagged as unsuitable for production, since it disables authentication and uses an in-memory storage emulator. A separate hardening checklist is provided for real deployments.",
        "The repository shows active and careful security practice, including automated code scanning and secret scanning, and documented handling of known vulnerabilities in the underlying geospatial libraries where a patched version was not available. Sample data from Hurricane Melissa and the Lahaina wildfire is published so that the platform can be tried without sourcing imagery first.",
      ],
    },
    {
      id: "audience",
      number: "12",
      title: "Intended Audience and Use",
      paragraphs: [
        "HASTE is aimed at trained humanitarian and disaster-response practitioners working with post-event imagery, and at researchers studying rapid damage-assessment methods. The documentation names non-governmental organisations, United Nations agencies, and government users as the intended downstream consumers of its outputs.",
        "Its stated purpose is to contribute information to preliminary damage assessment in the first hours and days, supplementing rather than replacing expert assessment, and to indicate where damage may be concentrated so that attention can be directed.",
        "It is explicitly not intended as an authoritative damage register, as ground truth for insurance, governmental, or public-reporting purposes, as the sole basis for search-and-rescue tasking or resource allocation, or as any kind of automated alerting system.",
      ],
    },
    {
      id: "conclusion",
      number: "13",
      title: "Conclusion",
      paragraphs: [
        "HASTE's most useful contribution is not a modelling advance but a reallocation of labour. It moves the machine-learning work out of the way so that the scarce resource, the judgment of someone who can look at an image and know what damage looks like in that country, is applied where it counts: to choosing the imagery, marking the examples, and checking the answer. The model is small, disposable, and fitted to one event, and the platform treats it as such.",
        "The reporting design is equally deliberate. By requiring an independent human validation sample before it will publish an accuracy figure, by separating precision from recall rather than averaging them away, by setting cloud-obscured buildings aside instead of counting them as intact, and by attaching a confidence interval to its headline number, the platform makes it harder to mistake a fast estimate for a survey.",
        "The honest reading is that HASTE is fast, transparent about its assumptions, and constrained by things it does not control. Its ceiling is set by the resolution of the imagery available and the completeness of the building outlines beneath it, and both of those are weakest in the places where humanitarian need is greatest. That is not a flaw in the software so much as a statement about the wider data landscape, but it means the platform's value in any given response depends on conditions decided long before the disaster occurred. Read alongside its own documented limitations, it is a credible example of a machine-learning tool built to assist expert judgment rather than to displace it.",
      ],
    },
  ] as ReportSection[],

  citations: [
    {
      ref: "Microsoft AI for Good Lab. HASTE: A Platform for Rapid Post-Disaster Building Damage Assessment. arXiv:2607.11838.",
      url: "https://arxiv.org/abs/2607.11838",
    },
    {
      ref: "Microsoft AI for Good Lab. HASTE, open-source platform released under the MIT Licence.",
      url: "https://github.com/microsoft/haste",
    },
    {
      ref: "Overture Maps Foundation. Buildings theme, combining OpenStreetMap with machine-derived building datasets from Microsoft and Google.",
      url: "https://overturemaps.org",
    },
    {
      ref: "OpenStreetMap contributors. OpenStreetMap building data.",
      url: "https://www.openstreetmap.org",
    },
    {
      ref: "Microsoft. Global ML Building Footprints.",
      url: "https://github.com/microsoft/GlobalMLBuildingFootprints",
    },
    {
      ref: "xBD. Public benchmark dataset of paired pre-event and post-event satellite imagery with expert damage annotations.",
    },
    {
      ref: "MOSAIKS. A generalizable and accessible approach to machine learning with global satellite imagery. Nature Communications, 2021.",
    },
    {
      ref: "Meta AI. DINOv2, a family of vision models trained on 142 million unlabelled images, 2023.",
    },
    {
      ref: "European Commission. Copernicus Emergency Management Service, Rapid Mapping.",
      url: "https://rapidmapping.emergency.copernicus.eu/",
    },
    {
      ref: "European Union. Copernicus Sentinel-1 and Sentinel-2 radar and optical satellite data.",
      url: "https://www.copernicus.eu",
    },
    {
      ref: "Planet. Open disaster imagery from a constellation of small satellites.",
      url: "https://www.planet.com",
    },
    {
      ref: "Maxar, now Vantor. Open Data Program for disaster response imagery.",
      url: "https://www.maxar.com/open-data",
    },
    {
      ref: "United States National Oceanic and Atmospheric Administration. Emergency response aerial imagery.",
      url: "https://storms.ngs.noaa.gov",
    },
    {
      ref: "OCHA. Humanitarian Data Exchange, the channel through which HASTE outputs have been released openly.",
      url: "https://data.humdata.org",
    },
  ] as Citation[],

  // The Microsoft project site and the CoLab fork holding this report.
  liveUrl: "https://microsoft.github.io/haste/",
  repoUrl: "https://github.com/Ethical-Tech-CoLab/haste",
};
