---
title: Electric Workbenches
sidebar:
  order: 1
---

The electric workbenches are where electronics gets built by hand. Each bench is a work surface with a set of instruments on it — a multimeter, a soldering station, an oscilloscope, a bench power supply, and a hot air rework station — and most jobs use several of them together: solder a board, power it up, measure whether it does what you expected, and rework the parts that don't. It's the right place for assembling and testing circuits and prototypes, repairing or modifying boards, and diagnosing anything electronic. If you're not sure this is the right place for your project, see [Which Machine?](/docs/which-machine/) or ask a staff member.

This page covers the bench itself — what to know before you sit down, how to work through a job, and how to leave it. Each instrument has its own page, listed under [The instruments](#the-instruments) below.

> [!WARNING]
> **A soldering iron tip at 350 °C looks exactly like one at room temperature.** Assume every iron you see is hot. Put it back in its stand every single time you set it down, and if one falls, let it drop and step back — never grab at it.

> [!WARNING]
> **Don't work on anything that plugs into a wall outlet.** These benches are for low-voltage circuits powered by the bench supply or a battery. Never probe, open, or power mains-connected equipment here — bring it to a staff member instead.

:::caution[IF SOMETHING GOES WRONG]
Smoke, sparks, popping or crackling, a burning smell, or a component too hot to touch: **cut the power first** — switch off whatever is feeding the circuit, or pull its plug — then step back and get a staff member. There is no emergency-stop button at these benches; the plug is the disconnect. Don't try to diagnose it while it's still powered.
:::

## Before you start

- **No training or checkout is required.** Read this page and the page for whichever instrument you need. If anything here doesn't match what you see at the bench, ask a staff member rather than guessing.
- **Wear safety glasses**, and keep them on while anyone next to you is soldering. Clipped component leads fly when you snip them, and hot flux spits. Closed-toed shoes are required everywhere in the lab.
- **Bring your own board, components, and wire.** The lab keeps solder and basic supplies at the bench, but stock varies — ask a staff member what's on hand before you plan around it.
- **The solder at the bench is lead-free.** It needs a hotter iron than leaded solder and it wets more slowly — that's the solder behaving normally, not a faulty iron.
- **Switch the fume extractor on before you heat the iron**, and keep its intake close to your work. Solder fumes are mostly vaporised flux, and they're a respiratory irritant you shouldn't be breathing.
- **Wire and rewire with the power off.** A circuit only gets energised once it's fully connected and you've looked it over.
- Tie back long hair and push loose sleeves clear, the same as anywhere else in the lab.

## The instruments

Each of these has its own page with its controls, its procedure, and its own troubleshooting.

- **[Multimeter (Fluke 17B+)](/docs/workbenches/instruments/multimeter-fluke-17b/)** — the instrument you'll reach for most. Voltage, current, resistance, continuity, and diode checks.
- **[Soldering Station (Weller WE1010NA)](/docs/workbenches/instruments/soldering-station-weller-we1010na/)** — a 70 W temperature-controlled iron for through-hole work, wires, and connectors.
- **[Oscilloscope (HAMEG HMO1524)](/docs/workbenches/instruments/oscilloscope-hameg-hmo1524/)** — draws a graph of voltage against time, for anything a multimeter's single number can't explain.
- **[Bench Power Supply (Kungber SPS3010)](/docs/workbenches/instruments/bench-power-supply-kungber-sps3010/)** — adjustable DC power with a current limit, so a mistake doesn't cook your board.
- **[Hot Air Rework Station (SparkFun 8508D)](/docs/workbenches/instruments/hot-air-rework-station-sparkfun-8508d/)** — melts solder without touching it, for removing and replacing surface-mount parts.

For assembling a surface-mount board from scratch, the [PCB machines](/docs/which-machine/#pcb-assembly-machines) — stencil, pick & place, and reflow oven — do the job far better than hand rework.

## Working at the bench

1. **Look the bench over before you touch anything.** Check for damaged power cords, cracked probe bodies, frayed test leads, and an iron left out of its stand. If something's damaged, don't use it — tell a staff member.

2. **Switch on only the instruments you need**, and give them a moment to settle. The soldering station takes a minute or two to reach temperature, and the oscilloscope needs to finish booting.

3. **Set each instrument up before it's connected to anything** — soldering temperature, the power supply's voltage and current limit, the multimeter's function and range, the scope's probe attenuation. Getting these right first is most of the job, and it's much harder to do with a live circuit attached.

4. **Assemble your circuit with everything unpowered.** Connect the power supply's leads last, and check polarity before you enable the output.

5. **Power up and pay attention for the first few seconds.** Watch the current reading on the power supply and smell the air. Current far above what you expected, or any smell of hot plastic, means switch off immediately — see the callout at the top of this page.

6. **Measure, adjust, repeat.** Power the circuit down again before you move a wire or add a component.

## When your circuit doesn't work

Most of the time it isn't obvious what's wrong, and the temptation is to start changing things. Work through it in this order instead — each step rules out a whole class of problem, and it's faster than guessing.

1. **Look at the current draw** on the bench supply before anything else. Far higher than expected means a short somewhere. Essentially zero means power isn't reaching the circuit at all. This one number usually tells you which half of the board to look at.
2. **Power down and check continuity** with the multimeter. Confirm that the connections you think exist actually exist, and — just as important — that the ones you think don't exist, don't. A solder bridge between two adjacent pins is invisible and extremely common.
3. **Power up and measure DC voltages** at each supply rail and at the pins that matter. A part being fed the wrong voltage, or no voltage, explains most failures without any further work.
4. **Reach for the oscilloscope last**, when the voltages are all correct but the behaviour still isn't — a signal that's the right voltage on average but the wrong shape, timing, or frequency. That's the question a multimeter can't answer.

If you've been through all four and you're still stuck, ask a staff member. Bring what you've measured — it's a much better starting point than "it doesn't work."

## Finishing up

- **Put the soldering iron in its stand and switch the station off.** Leave it in the stand to cool — don't move it, wrap its cord around it, or put it away while it's still hot.
- **Turn the power supply's output off before the supply itself**, then disconnect its leads from your circuit.
- Switch off every other instrument you turned on, and switch off the fume extractor.
- **Disconnect probes and test leads, coil them loosely, and put them back where you found them.** Don't kink a scope probe or wind a lead tightly around anything — that's how they die.
- **Clear the bench of clipped leads, wire offcuts, solder debris, and packaging.** Clipped leads are sharp and they end up in the next person's hands.
- Tell a staff member about anything damaged or behaving strangely, even if you worked around it at the time.
- Take your project and your parts with you — the lab has no storage.
