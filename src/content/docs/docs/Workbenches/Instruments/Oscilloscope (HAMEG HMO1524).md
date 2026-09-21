---
title: Oscilloscope (HAMEG HMO1524)
---

An oscilloscope draws a graph of voltage against time. Where the [multimeter](/docs/workbenches/instruments/multimeter-fluke-17b/) gives you one number — the average voltage at a point — the scope shows you the shape of what's actually happening there: a square wave's edges, a clock's frequency, noise riding on a supply rail, a pulse that's the right height but half the width it should be. Reach for it when the voltages all measure correct but the circuit still misbehaves. The bench scope is a Rohde & Schwarz HAMEG HMO1524, with **four channels** at **150 MHz**, so you can watch four points in a circuit at once and compare their timing.

> [!WARNING]
> **The ground clips of all four probes are connected to each other and to the building's earth, through the scope's power cord.** Clip two of them to different points in your circuit and you've wired those points together — which will short whatever sits between them. Every ground clip goes to your circuit's ground, and nowhere else.

## Before you start

- **No training or checkout is required**, but a scope rewards a bit of patience. If you've never used one, the fastest way in is to probe something you already understand, like a blinking LED's control pin, and watch the trace change as you adjust the controls.
- **Check the probe attenuation.** Scope probes usually have a switch on the body marked **×1** and **×10**. In ×10 the probe divides the signal by ten, and the scope has to be told, or every voltage it shows you will be wrong by a factor of ten. Set the switch and set the channel's probe setting to match — this is the single most common scope mistake.
- Low-voltage bench work only — see the hazard callouts on the [Electric Workbenches](/docs/workbenches/electric-workbenches/) page.
- For anything beyond the basics here, Rohde & Schwarz publish a full user manual for the HMO1000 series that covers every menu on the scope. Ask a staff member if you need a copy.

## The controls

The front panel is grouped by function, and once you know the groups you can find anything.

- **VERTICAL** controls how tall the trace is. **VOLTS/DIV** sets how many volts one grid square represents, **POSITION** slides the trace up and down, and the numbered channel buttons turn each channel on and off and open its menu — including its probe attenuation setting.
- **HORIZONTAL** controls time. **TIME/DIV** sets how much time one grid square represents — turn it one way to see the overall shape, the other way to zoom in on a single edge. **POSITION** slides the view left and right.
- **TRIGGER** is what makes a repeating signal stand still instead of scrolling across the screen. The **LEVEL** knob sets the voltage the scope waits to see before it draws; set it somewhere in the middle of your signal's swing. **AUTO** draws continuously whether or not it finds that level, which is what you want while you're hunting; **NORM** draws only when it triggers, which is what you want for a signal that happens occasionally.
- **AUTOSET**, in the **GENERAL** group, makes the scope guess sensible settings for whatever it can see. It is the right first button to press, and a good way to get back to something readable after you've lost the trace.
- **CURSOR/MENU** and **ANALYZE** hold the measurement tools — cursors you position by hand, and automatic measurements of things like frequency, period, and peak-to-peak voltage.

## Operating

1. Switch the scope on and let it finish booting.

2. **Set the probe's ×1 / ×10 switch**, then press that channel's button and set the same attenuation in its menu. Do this before you measure anything, not after you've written a number down.

3. **Clip the probe's ground lead to your circuit's ground**, and touch the probe tip to the point you want to see.

4. Press **AUTOSET**. In most cases a usable trace appears immediately.

5. **Adjust from there.** Use **VOLTS/DIV** so the trace fills a good part of the screen vertically without running off the top or bottom, and **TIME/DIV** so you can see a few cycles of whatever you're looking at.

6. **If the trace won't hold still**, the scope isn't triggering. Turn the **TRIGGER LEVEL** knob until it sits within the signal's range, and check the trigger is set to the channel you're actually looking at.

7. **Measure.** The automatic measurements under **ANALYZE** cover frequency, period, and amplitude; cursors let you measure anything else by placing two lines and reading the difference.

8. To keep a result, save a screenshot to a USB stick in the port on the front.

## Finishing up

- Disconnect the probes from your circuit before you power anything down.
- **Unclip the ground leads** and check the probe tips aren't bent or missing their tip covers.
- Switch the scope off and coil each probe loosely. Scope probes are surprisingly expensive and a kinked one is a dead one, so don't wind them tightly or knot them.
- Tell a staff member if a probe is damaged or a tip accessory has gone missing.

## Common problems

**Every voltage reads ten times too big or too small.** The probe's ×1 / ×10 switch and the channel's probe setting don't match. Fix both and take the measurement again.

**The trace scrolls across the screen and won't stand still.** The scope isn't triggering. Set the **TRIGGER LEVEL** inside the signal's voltage range, make sure the trigger source is the channel you're watching, and use **AUTO** rather than **NORM** while you're searching.

**There's a flat line where a signal should be.** Check the channel is switched on, that the probe's ground clip is actually on ground, and that the tip is on the node you meant. Then check **VOLTS/DIV** — a small signal at a large volts-per-division setting looks exactly like a flat line. Press **AUTOSET** to rule all of this out at once.

**The signal is buried in fuzz.** Some of that is real noise in your circuit and worth knowing about. Some of it is the probe's long ground lead acting as an antenna — keep the ground clip as close to the measurement point as you can. And check you're not measuring on a scale where the scope's own noise floor is most of what you see.
