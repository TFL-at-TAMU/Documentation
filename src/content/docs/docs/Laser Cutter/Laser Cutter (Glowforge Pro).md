---
title: Laser Cutter (Glowforge Pro)
---

The Glowforge Pro cuts and engraves flat sheet materials — wood, acrylic, cardboard, and more — by tracing your design with a 45W CO₂ laser. It's the fastest way in the lab to go from a 2D drawing to a physical part, and it excels at precise cuts, interlocking parts, enclosures, signage, and surface engraving (including engraving on approved metals). Most jobs finish in minutes. It accepts sheets up to about 20.4" × 12", cuts within a roughly 19.5" × 11" area, and cuts reliably through stock up to about 1/4" thick. If you're not sure this is the right machine for your project, ask a staff member.
<!-- TODO: link /docs/which-machine/ at the end of the intro once that page exists -->

:::danger[LASER CERTIFICATION REQUIRED]
The Glowforge is a **Class 4 laser**. You must hold **TAMU laser safety certification** to operate it — see [Laser Safety Certification](/docs/laser-cutter/laser-safety-certification/) for how to get certified, and be ready to show it to staff. No certification, no laser.
:::

> [!WARNING]
> **Never cut PVC, vinyl, or any material containing chlorine.** It releases gas that is toxic to you and corrodes the machine. Polycarbonate (Lexan), ABS, HDPE, and fiberglass are also prohibited — they melt, catch fire, or produce hazardous fumes. Cut only staff-approved materials.

> [!WARNING]
> **Never leave the machine unattended during a job** unless a staff member has explicitly OK'd it for a long job.

:::caution[EMERGENCY STOP]
**Do not open the lid while a job is running.** To stop the machine, press the **glowing button** on top — it pauses the job. To kill all power, flip the **ON/OFF switch at the rear** of the machine.
:::

:::caution[FIRE PROCEDURE]
Small, brief flames at the cut point are normal. If a flame persists, keep the lid closed (it starves the fire), pause the job, and get a staff member immediately. **Only if no staff member can reach the machine in time:** open the lid and throw the **fire blanket** (located **[location]**) over the workpiece.
:::

> [!WARNING]
> **Never run a job without the ventilation system on.**

> [!WARNING]
> **The passthrough slot on the front and back is off-limits** unless a staff member has specifically trained you on it. Using the slot exposes the laser (Class 4 operation) and requires extra safety precautions.

:::note[Staff note — Glowforge lead]
The stop/fire procedure above follows the lab's safety manual (pause with the button, keep the lid closed, fire blanket as last resort). Glowforge's own documentation instead says opening the lid cancels a job instantly. Confirm which is lab policy and update these callouts to match — then mirror the decision in the `DOCS_FORMAT.md` reference example.
:::

## Before you start

- **First-time users must have a staff member present.**
- Only cut **staff-approved materials**: wood, acrylic, cardboard, rubber (lab-provided), and metal (**engraving only**). Material can be brought in or taken from lab stock. Anything else — including materials you can't identify — needs staff approval first.
- Prepare your design as an **SVG or PDF** for cutting. Plain images (**JPG/PNG**) can be engraved but not cut. **DXF is not supported.**
- The Glowforge is controlled entirely from a web browser on the **lab computer** — open the starred tab called **"LASER CUT HERE"** and have your file accessible from there.
- Material must fit within about 20.4" × 12" and be no thicker than 1/2" with the crumb tray in place.
- No special PPE is required beyond standard lab attire. Keep hands, hair, clothing, and loose items clear of moving parts.

## Operating

1. Check that no job is already running — the machine is visibly/audibly working and the top button is lit during a job. **Don't open the lid to check.**
2. The machine is normally left on. If it's off, flip the **ON/OFF switch at the rear**, and wait for calibration — the head moves around and the app says "Homing," then "Ready."
3. Visually confirm the **exhaust hose** is connected — don't tug on it.
4. Open the lid, clear out any leftover scrap, and place your material flat on the honeycomb crumb tray. Warped material is a fire and focus hazard — use the **hold-down pegs** to flatten it (especially wood), and never stack material. Close the lid.
5. Turn on the **ventilation system** — don't change its settings.
6. In the **"LASER CUT HERE"** tab on the lab computer, upload your file. Your material appears live in the lid camera view — **drag and position your design** directly on the camera image. The preview is close but not pixel-perfect: leave a small margin from material edges and from previous cuts on used stock.
7. Set your material and settings:
   - **Proofgrade material** (has a QR code): the machine detects it and loads settings automatically.
   - **Everything else**: choose the material or "Unknown material" and use tested settings — the **sample cards** around the machine show results for common materials. Run a small test before the main job on unfamiliar material; don't improvise settings.
   - Multiple operations (e.g. engrave + cut) run in the order listed, top to bottom — **do cuts first** to minimize warping.

:::note[Staff note — Glowforge lead]
"Cuts first to minimize warping" is carried over from the original operations manual. Standard practice elsewhere is the opposite — engrave/score first, cut last, so freed pieces can't shift mid-job. Confirm the lab's preference and update the step above.
:::

8. Send the job from the web interface, then flip the **"In Use" sign**.
9. When the **button on top glows**, press it to start. (Pressing it again pauses the job.)

> [!WARNING]
> Stay at the machine for the entire job. Normal operation: smooth motion, smoke drawn toward the exhaust, small flames that extinguish quickly. **Pause the job and notify staff** if you see lingering or spreading flames, excessive smoke or smoke escaping the front of the machine, grinding or knocking noises, a burning smell that doesn't match the material, or weak ventilation. For fire, follow the procedure at the top of this page.

10. When the job finishes, wait for all motion to stop (the button stops glowing and the app shows done), then give the smoke a few seconds to clear before opening the lid.
11. Check your material for smoldering, then remove your parts and any scrap. If pieces fell through the crumb tray, lift it out and collect them.

## Finishing up

- Turn off the **ventilation system**.
- Remove all material and scrap from the bed, including cutoffs in the tray underneath. Leave the machine on — it stays on by default.
- Return usable stock to its place (excess personal material may be donated to the lab if you like).
- Wipe the inside of the lid and the camera with the **provided cloth**.
- Confirm the crumb tray is seated flat for the next user, and flip the **"In Use" sign** back.
- Report any abnormal machine behavior to staff before you leave.
- Take your project and materials with you — the lab has no storage.

## Common problems

**The laser isn't cutting all the way through.** Don't re-run the job — a second pass on shifted material makes it worse. Check that your settings match the sample cards for your material and that the material is flat with the crumb tray seated properly, then notify staff. If settings and material check out, the optics may need cleaning — that's a staff task, so ask.

**The cut is offset from where I placed it.** The camera preview has slight distortion, especially near the bed edges. Keep designs away from the extreme edges, leave margin around previous cuts on used stock, and cut a small test shape first for alignment-critical work.

**Cut edges are heavily charred.** Power is too high or speed too low for the material — recheck against the sample cards and notify staff if it persists. Masking the surface with paper transfer tape before cutting also reduces scorch marks on wood.

**The button is glowing yellow / the app says the machine is too hot or cold.** The Glowforge pauses when it's outside its operating temperature range. Give it a few minutes to cool down or warm up — don't restart the job repeatedly.

**The app says "Offline."** The Glowforge needs internet to do anything. Tell a staff member — don't fiddle with the lab network.

**Ventilation seems weak.** Stop and notify staff — don't run jobs with poor extraction.
