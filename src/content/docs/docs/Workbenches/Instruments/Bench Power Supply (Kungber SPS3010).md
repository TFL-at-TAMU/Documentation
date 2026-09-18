---
title: Bench Power Supply (Kungber SPS3010)
---

The bench power supply gives your circuit adjustable DC power with a **current limit** — a ceiling you set yourself, above which the supply refuses to deliver any more. That limit is the whole reason to use a bench supply instead of a wall adapter or a battery: when you've wired something backwards, a battery cheerfully delivers enough current to melt a trace, while a current-limited supply just sits there at its limit and nothing is destroyed. Use it to power breadboards, development boards, and prototypes, to test how a circuit behaves at different voltages, and to see how much current your design actually draws. It supplies **0–30 V at up to 10 A**, and DC only — it can't produce AC.

> [!WARNING]
> **Check polarity before you enable the output.** Red to your circuit's positive rail, black to ground. Most integrated circuits are destroyed by reverse polarity in well under a second, and a current limit won't save them — the current that kills them is small.

> [!WARNING]
> **Don't use it as a battery charger.** A bare current-limited supply has none of the protection a lithium cell needs, and an overcharged lithium cell vents and catches fire. Charging batteries needs a proper charging circuit — ask a staff member.

## Before you start

- **No training or checkout is required.**
- **Know roughly what your circuit should draw** before you connect it. You don't need a precise figure — enough to tell whether 200 mA or 2 A is the sensible ceiling. The current limit only protects you if you set it somewhere near what you expect.
- **Check your leads.** Banana plugs fully seated, no exposed conductor outside the terminals, and no bare wire ends that can touch each other.
- Work out which of your circuit's connections is positive and which is ground before anything is switched on.

## The controls

The display shows three numbers: **volts**, **amps**, and watts. Two indicators next to them tell you which mode the supply is in:

- **C.V** — constant voltage. The supply is holding the voltage you asked for, and the current reading is simply what your circuit is drawing. This is normal operation.
- **C.C** — constant current. Your circuit tried to draw more than the limit you set, so the supply has capped the current and dropped the voltage to whatever that takes. On a circuit you've just built, **C.C usually means a short or a wiring mistake** — switch off and check before you raise the limit.

Below the display are **coarse and fine knobs for voltage and for current**, and an **OUTPUT** button. The terminals are **+** (red), **−** (black), and a separate **GND** — use **+** and **−** for your circuit; **GND** is an earth connection, not the negative rail.

> [!NOTE]
> Nothing appears at the terminals until **OUTPUT** is pressed. A supply that's switched on and showing a voltage is not yet powering anything — which is exactly the behaviour you want while you're wiring up.

## Operating

1. Switch the supply on, with **OUTPUT off**.

2. **Set the voltage** your circuit needs, using the coarse knob to get close and the fine knob to land on it.

3. **Set the current limit.** Choose a little above what you expect your circuit to draw — enough headroom that normal operation doesn't trip it, low enough that a mistake gets caught. If you're unsure, start low: a limit that's too tight just puts the supply into C.C, which tells you something without breaking anything.

   If you want to set the limit exactly, do it before your circuit is connected: with the leads shorted together and **OUTPUT** on, the supply sits in C.C and the current display reads the limit directly. Switch **OUTPUT** off and separate the leads before going any further.

4. **Connect your circuit** — red to positive, black to ground — and check the polarity again.

5. **Press OUTPUT**, then watch the current reading for the first few seconds. Roughly what you expected, in C.V, means you're fine. Jumping straight to your limit, in C.C, means switch off immediately and find the short.

6. **Switch OUTPUT off before you change anything** in the circuit. Rewiring a live board is how parts get shorted together.

## Finishing up

- **Press OUTPUT off first**, then switch off the supply itself.
- Disconnect your leads from the circuit and from the terminals.
- Leave the voltage and current knobs where they are — the next person will set their own, and there's no setting that's "safe" for a circuit you haven't seen.
- Coil the leads loosely and put them back where they live.

## Common problems

**The supply jumps straight to C.C and the voltage collapses.** Your circuit is drawing more than the limit. On something newly built, treat it as a short until proven otherwise: switch off, and check for a solder bridge, a backwards component, or a wire in the wrong hole. Don't raise the limit to "get past it".

**The voltage reads correctly but my circuit does nothing.** Check **OUTPUT** is actually on, then check the leads are in **+** and **−** rather than **GND**, then check continuity from the terminals to your board with the [multimeter](/docs/workbenches/instruments/multimeter-fluke-17b/). A lead that looks connected but isn't clamped is common.

**The voltage at my board is lower than the display says.** The supply measures at its own terminals, not at your circuit. Thin or long wires, a loose plug, or a poor breadboard contact all drop voltage along the way — measure at the board itself to see what it's really getting.

**It won't go as high as I need.** 30 V and 10 A are the supply's limits, and 300 W caps the two together — you can't have 30 V and 10 A at the same time. If your project needs more than that, talk to a staff member about the right way to power it.
