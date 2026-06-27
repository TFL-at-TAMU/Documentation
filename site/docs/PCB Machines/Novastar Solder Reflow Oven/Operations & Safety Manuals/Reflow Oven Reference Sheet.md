---
title: "Reflow Oven Reference Sheet"
source_id: "1yzvVP9LWg9QdLAxOez3YdLrUxt6YLqnjLDWhGGXXg34"
modified: "2026-04-10T17:01:15.723Z"
---

## Reflow Oven Reference Sheet

## Starting Settings

Important: Use these as starting points only. Always follow the solder paste manufacturer’s datasheet when available. Start the timer only after ACTUAL temperature = SET temperature. For more even heating, use full convection with the PCB elevated 1/2–1 in (12–25 mm) above the hotplate.

Solder / Mode| Typical Use| Setup| Start Temp.| Time| Notes  
---|---|---|---|---|---  
SAC305, standard| Most lead-free SMT boards| Hood closed, fan ON| 235–245°C| About 45–60 s above liquidus| Good default setup for most boards  
SAC305, full convection| Dense boards, uneven heating, bottom overheating| Hood closed, fan ON, PCB on 1/2–1 in standoffs| 235–245°C| Same as above| Best for more even top/bottom heating  
Sn63/Pb37, standard| Leaded assemblies only| Hood closed, fan ON| 205–220°C| Shorter than SAC305| Start low, increase only if needed  
Sn63/Pb37, full convection| Leaded boards needing even heating| Hood closed, fan ON, PCB on 1/2–1 in standoffs| 205–220°C| Shorter than SAC305| Reduces direct bottom heating  
Hotplate only| Preheat, rework, special cases| Hood open, fan OFF| Case-dependent| Case-dependent| Not preferred for repeatable full-board reflow  
  
* * *

## 

## Quick Adjustments

If you see…| Try this  
---|---  
Cold joints / incomplete reflow| Increase time slightly; confirm ACTUAL = SET before timing  
Scorching / overheating| Lower temperature and/or time; switch to full convection  
Uneven reflow| Center PCB; use full convection with standoffs  
Temp drops after opening hood| Minimize hood-open time; wait for temp to recover before starting  
  
## Short Note

Note: Reflow settings depend on solder type, paste chemistry, PCB size, and component density. Use the paste datasheet as the main reference and adjust as needed for consistent results.