---
title: Lego Flower
---

Print a Lego-compatible flower in three colors, and pick up the AMS, multi-material printing, and supports on the way. Consider it a welcome gift from the Fab Lab team.

![A cluster of 3D-printed Lego-style flowers in yellow, blue, red and white with green stems](../../../assets/images/bambu_x1c_3d_printer_45c661338e.png)

**Read this first:** the [FDM 3D Printer (Bambu Lab X1 Carbon) manual](/docs/fdm-printers/bambu-labs-x1c-3d-printer/fdm-3d-printer-bambu-lab-x1-carbon/), especially [Loading filament into the AMS](/docs/fdm-printers/bambu-labs-x1c-3d-printer/fdm-3d-printer-bambu-lab-x1-carbon/#loading-filament-into-the-ams) and [Slicer settings](/docs/fdm-printers/bambu-labs-x1c-3d-printer/fdm-3d-printer-bambu-lab-x1-carbon/#slicer-settings). This activity assumes both.

## The activity

Download three files from [this Thingiverse model](https://www.thingiverse.com/thing:4283065/files):

- `Flower_Head.stl`
- `Flower_Base_v2.stl`
- `1x1_plate_round_open.stl`

Print all of it on one plate, in three different colors. What you're aiming for:

- **Three flower heads, not one.** Select the head, right-click it, choose **Clone**, and set it to make 2 copies.
- **Everything on a single plate.** At full size the five parts won't fit together, and this is a practice print — don't spend a spool on it. Select them all, click **Scale**, keep **uniform scale** ticked, and set the scale to **25%**.
- **Three filaments assigned** — say a green stem and base, red petals, and a white stud. Use whatever colors the AMS actually has; the point is that the slicer knows which part comes from which slot.
- **Support enabled at a 45° threshold.** The base has overhangs inside and out.

![Bambu Studio with five cloned flower parts selected on the build plate](../../../assets/images/bambu_x1c_3d_printer_ffe2cf6c7a.png)

![The Scale panel in Bambu Studio, with the uniform scale checkbox ticked and a percentage typed into the X field](../../../assets/images/bambu_x1c_3d_printer_0f44aca6bf.png) ![Five scaled-down flower parts arranged so they all fit on one plate](../../../assets/images/bambu_x1c_3d_printer_b35d81f913.png)

## Hints

- On import, Bambu Studio asks whether to load the files as a single object with multiple parts. Answer **No**. Answering **Yes** welds them together and makes assigning separate filaments much harder.
- Re-run **Arrange** after cloning and again after scaling. Parts that overlap won't slice.
- Slice the base once with support off and once with it on, and compare the previews. This printer will very likely manage those overhangs unsupported — seeing that for yourself is more useful than taking the manual's word for it.
- Three filaments means a **purge tower**. It's a chunk of wasted plastic sitting next to your parts, and it's supposed to be there. You could avoid it by printing each color as a separate plate, but then you'd skip the multi-material half of the exercise.

When the print finishes, follow [Finishing up](/docs/fdm-printers/bambu-labs-x1c-3d-printer/fdm-3d-printer-bambu-lab-x1-carbon/#finishing-up) in the manual — cool the plate, pop the parts off, clear the purge tower and the excess chute, and take your flower with you.
