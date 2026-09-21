---
title: Which Machine?
---

A directory of everything in the Fab Lab, and what each machine is actually good at. Use it to work out where your project belongs before you read a manual cover to cover.

Nothing here is a substitute for the machine's own page — this tells you *which* machine, the manual tells you *how*. And if your project doesn't obviously fit any of these, ask a staff member. That's not a last resort; it's usually faster than guessing.

## Start here

| If you want to… | Go to |
|---|---|
| Make a 3D part out of plastic, fast | [Bambu Lab X1 Carbon](#bambu-lab-x1-carbon) |
| Make a 3D part in more than one color or material | [Bambu Lab X1 Carbon](#bambu-lab-x1-carbon) |
| Make a small 3D part with fine detail and a smooth finish | [Resin printers](#sla-resin-printers) |
| Cut or engrave a flat sheet of wood, acrylic or cardboard | [Glowforge Pro](#glowforge-pro) |
| Cut or engrave metal, or mill a precise part | [Makera Carvera](#makera-carvera) |
| Cut vinyl, cardstock, paper or iron-on | [Cricut Explore 4](#cricut-explore-4) |
| Turn a real object into a 3D model | [Creality Raptor Pro](#creality-raptor-pro) |
| Assemble a circuit board with surface-mount parts | [PCB machines](#pcb-assembly-machines) |
| Solder, measure, test or repair electronics | [Electric workbenches](#electric-workbenches) |

## 3D printing

Two different processes live here, and they are not interchangeable. **FDM** melts plastic filament and draws your part layer by layer — fast, cheap, tough, and visibly layered. **SLA** cures liquid resin with light — much finer detail and a smoother surface, but smaller parts, more cleanup, and more care around the material.

### Bambu Lab X1 Carbon

FDM. The lab's workhorse, and where most projects should start.

- **Good for:** prototypes, brackets, enclosures, jigs, replacement parts — anything you'd rather hold than look at on a screen.
- **Build volume:** 256 × 256 × 256 mm.
- **Colors and materials:** up to four at once, from the AMS filament changer.
- **Speed:** most parts come off in a few hours.
- **There are four of them** — George, John, Paul and Ringo.

[FDM 3D Printer (Bambu Lab X1 Carbon) →](/docs/fdm-printers/bambu-labs-x1c-3d-printer/fdm-3d-printer-bambu-lab-x1-carbon/)

### SLA resin printers

The lab has two: the **Elegoo Saturn 4 Ultra 16K** and the **Formlabs Form 3**.

- **Good for:** high-resolution prints for prototyping, design verification, and small functional or aesthetic parts — fine detail, thin walls, and a surface with no visible layers.
- **Not for:** anything that isn't resin, or large structural parts that exceed the build volume or load limits.
- **Build volume (Elegoo):** 211 × 118 × 220 mm — tall and narrow rather than a cube.
- **Every resin print needs washing and curing afterwards** — that's a separate machine and a required step, not an optional finish. Budget another 20–30 minutes after the print comes off.

:::caution
Resin is the messiest material in the lab and the one with the most rules. Liquid resin irritates skin and eyes, so gloves are required from the moment a print leaves the printer until it comes out of the curing cycle, and uncured resin never gets left in the work area. Read the machine's page before you print, not after.
:::

[Resin 3D Printer (Elegoo Saturn 4 Ultra 16K) →](/docs/sla-printers/elegoo-saturn-4-ultra-16k-resin-3d-printer/resin-3d-printer-elegoo-saturn-4-ultra-16k/) · [Elegoo wash and cure →](/docs/sla-printers/elegoo-mercury-30-plus-washing-and-curing-machine/wash-and-cure-station-elegoo-mercury-30-plus/) · [Formlabs Form 3 →](/docs/sla-printers/formlabs-form-3-resin-printer/operations--safety-manuals/formlabs-3-resin-printer-operations-manual/) · [Formlabs wash & cure →](/docs/sla-printers/formlabs-form-3-resin-printer/wasing-and-curing-machines/formlabs-washing-machines-operations-manual/)

## Cutting and milling

### Glowforge Pro

A 45 W CO₂ laser that cuts and engraves flat sheet material by tracing your design.

- **Good for:** precise cuts, interlocking parts, enclosures, signage, and surface engraving — including on approved metals. The fastest way in the lab from a 2D drawing to a physical part.
- **Materials:** wood, acrylic, cardboard and more.
- **Sheet size:** up to about 20.4″ × 12″, cutting within roughly 19.5″ × 11″.
- **Thickness:** cuts reliably up to about 1/4″.
- **Speed:** most jobs finish in minutes.

:::danger[Certification required]
The Glowforge is a **Class 4 laser**. You must hold TAMU laser safety certification to operate it, and be ready to show it. See [Laser Safety Certification](/safety/#laser-safety-certification).
:::

[Laser Cutter (Glowforge Pro) →](/docs/laser-cutter/laser-cutter-glowforge-pro/)

### Makera Carvera

An enclosed desktop CNC mill. Slower than the laser, but it cuts metal and works in three dimensions.

- **Good for:** precision-milled parts, pockets and profiles, engraving, and — with the optional 4th axis — rotational work on cylindrical stock.
- **Materials:** hard and soft woods, MDF and HDF; 6061 aluminum and brass; ABS and acrylic. Brittle, fibrous or "dead soft" materials can't be milled. The approved list changes, so ask about anything not on it.
- **A staff member must be present** whenever it runs.

:::danger[Certification required for the laser module]
The Carvera includes a **Class 4 laser**. TAMU laser safety training and goggles are required before using it.
:::

[CNC Mill (Makera Carvera) →](/docs/cnc-mill/cnc-mill-makera-carvera/)

### Cricut Explore 4

A desktop cutting machine that drags a small blade across sheet material to cut any shape you can draw.

- **Good for:** vinyl decals and stickers, iron-on transfers, paper and cardstock models, labels, stencils, and cardstock packaging. It can also draw on material with a pen instead of cutting.
- **Width:** sheets up to 12″ (or 12″ × 24″ on the long mat).
- **Thickness:** up to 2.0 mm. Anything thicker, or anything rigid like plywood, metal or acrylic, belongs on another machine.
- **No training, no checkout, and no PPE** — one of the lowest-risk machines in the lab.

[Cricut (Explore 4) →](/docs/cricut/cricut-explore-4/)

## Scanning

### Creality Raptor Pro

A handheld 3D scanner that captures the geometry — and optionally the color — of real objects and turns them into 3D mesh models.

- **Good for:** reverse engineering, digitizing freeform shapes like body panels or organic forms, and full-surface capture where calipers are impractical.
- **Object size:** roughly coin-sized up to about 4 m with markers.
- **Accuracy:** about 0.05–0.2 mm depending on mode — far coarser than calipers, so it's the tool for complex surfaces, not for precisely measuring simple features.
- **Won't scan** black, reflective or transparent surfaces without scanning spray.
- **No training required** to use it in the lab.

[3D Scanner (Creality Raptor Pro) →](/docs/3d-scanner/3d-scanner-creality-raptor-pro/) · [How 3D Scanning Works →](/docs/3d-scanner/how-3d-scanning-works/)

## Electronics

### PCB assembly machines

Three machines that run in order, and assembling a surface-mount board means using all three in this sequence.

1. **NeoDen FP2636 solder stencil** — applies solder paste to the board.
2. **NeoDen YY1 pick & place** — sets each surface-mount component at the exact coordinates from your design file, far faster and steadier than tweezers. Boards up to 315 × 350 mm. Not for production runs, and not for advanced packages like BGA, CSP or flip-chip.
3. **DDM Novastar GF-C2 reflow oven** — melts the paste to lock everything in place. A 12″ × 12″ hotplate with about 3″ of clearance under the hood; a typical board reflows in under a minute. It also runs as a plain hotplate for preheating and rework.

:::caution
A trained staff member must be present for the pick & place and the reflow oven, and the oven can never be left running unattended.
:::

[Solder stencil →](/docs/pcb-machines/neoden-solder-stencil/operations--safety-manuals/neoden-fp2636-machine-operation-manual/) · [Pick & place →](/docs/pcb-machines/neoden-pick--place/pick-and-place-machine-neoden-yy1/) · [Reflow oven →](/docs/pcb-machines/novastar-solder-reflow-oven/solder-reflow-oven-ddm-novastar-gf-c2/)

### Electric workbenches

Benches rather than a single machine, for hand work on electronics.

- **Good for:** assembling, soldering and testing circuits and prototypes; measuring voltage, current, resistance and signal waveforms; reworking, repairing or modifying PCBs.
- **Not for:** mechanical or plumbing repairs, or anything that plugs into a wall outlet — the benches are for low-voltage work only.
- **Instruments:** each has its own page — [multimeter](/docs/workbenches/instruments/multimeter-fluke-17b/), [soldering station](/docs/workbenches/instruments/soldering-station-weller-we1010na/), [oscilloscope](/docs/workbenches/instruments/oscilloscope-hameg-hmo1524/), [bench power supply](/docs/workbenches/instruments/bench-power-supply-kungber-sps3010/), and [hot air rework station](/docs/workbenches/instruments/hot-air-rework-station-sparkfun-8508d/).

[Electric Workbenches →](/docs/workbenches/electric-workbenches/)

## Still not sure?

Ask a staff member. Describe what you're trying to make rather than which machine you think you need — the answer is often a different machine, or a combination of two.

Whatever you land on, read that machine's page before you start, and check the [Safety & Emergency Manual](/safety/) for the lab-wide rules that apply everywhere.
