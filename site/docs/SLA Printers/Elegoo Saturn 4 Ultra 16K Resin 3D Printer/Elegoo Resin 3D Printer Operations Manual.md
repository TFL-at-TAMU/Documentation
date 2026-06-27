Disclaimer: YOU WILL NOT LEAVE UNCURED RESIN IN THE WORK AREA

## What This Machine Is For
* Producing high‑resolution resin 3D prints for prototyping, design verification, and small functional or aesthetic parts
* Creating fine‑detail components such as housings, enclosures, fixtures, or display models
* Supporting academic, research, and personal projects that require precision beyond filament (FDM) printing


## What This Machine Is Not For
* Printing with non‑resin materials (e.g., filament, powder, metal)
* Producing food‑safe, medical, or implantable parts
* Large structural parts that exceed the printer’s build volume or load limits



## What You Need Before You Start

Before operating this machine, ensure:

1. Staff present
2. You have read the safety guidelines in [The Fab Lab General Safety Manual](<../../../Fab Lab Operations/Fab Lab Safety & Emergency Manual.md>)
3. Required PPE is worn:
    1. Nitrile gloves (required)
    2. Safety glasses (recommended)
    3. Mask (optional)
4. STL file that has been properly sliced in Elegoo SatelLite



## Machine Overview

![](../../../assets/images/elegoo_manual_image_1.png)Figure 1| ![](../../../assets/images/elegoo_manual_image_2.png)Figure 2  
---|---  
  
1. Z Axis
2. Handle
3. Build Plate
4. LCD Display Screen
5. Resin Tank
6. Chamber Light
7. AI Camera
8. Screw Knob
9. Touch Screen

1. Anti-UV Cover
2. USB Interface
3. Switch
4. DC Socket
5. Extension Port (Connect peripherals)

  
  
MAIN CONTROL INTERFACE:

* Touchscreen (Figure 1: 9): is the control panel for the machine, and all user-level operations are done through this screen. Used to power on the machine interface, select print files, start and stop jobs, and monitor print status and error messages. 



EMERGENCY STOP LOCATION:

* Power Switch (Figure 2: 3): Used to power the machine on and off. This machine does not have a dedicated emergency stop button, so in an emergency, users should stop the print using the touchscreen if possible, or turn off the printer using the power switch and immediately notify Fab Lab staff.



KEY USER INTERACTION POINTS:

* Build plate (Figure 1: 3): is where prints adhere during printing. Users remove this plate after printing to detach parts and must ensure it is securely fastened before starting a job.
* Resin tank (Figure 1: 5): holds the liquid resin during printing. Users are responsible for filling the tank to the correct level and checking for cured resin or damage before use.
* Anti-UV Cover (Figure 1: 1):  is a protective cover that shields users from UV light and contains resin fumes. The cover must remain closed during printing.
* USB Interface (Figure 2: 2): Used to load print files onto the printer.



## Basic Operating Workflow

### Preprint Routine

** The Preprint routine is only done BEFORE printing. **

1. Complete the preprinting cleaning instructions in the [cleaning manual](<../Elegoo Cleaning Procedure/Elegoo Resin 3D Printer Cleaning Manual.md>) Section 3.0
2. If these are not completed, your print is at risk of failing and damaging the machine



### Start-Up

1. Turn on the printer using the rear power switch
2. Verify the touchscreen interface boots correctly
3. Confirm:


1. Resin tank is clean and properly installed (Refer to [cleaning instructions](<../Elegoo Cleaning Procedure/Elegoo Resin 3D Printer Cleaning Manual.md>) in Section 3.0)
2. Build plate is secured



### Running a Job

1. Pour approved resin into the tank BELOW the MAX fill line and ABOVE MIN fill line



![](../../../assets/images/elegoo_manual_image_3.jpeg)

2. Open the SatelLite slicer and open the file using the file icon in the red circle below



![](../../../assets/images/elegoo_manual_image_4.png)

3. If piece printing is a solid piece, use the “Hollow” tool on the top toolbar on the piece and set the wall thickness (~2-3mm, but will vary based on what the user prefers)



![](../../../assets/images/elegoo_manual_image_5.jpeg)

4. Generate supports using the “Support” function at the top of the toolbar next to “Hollow.”
5. After clicking, it will auto-generate supports. Use these. 
6. If your piece is hollow, ensure “Generate internal supports” is clicked.



![](../../../assets/images/elegoo_manual_image_6.jpeg)

Notes for supports: The stock baseplate with automatic supports makes the prints extremely difficult to remove from the baseplate. To combat this, in Advanced Mode:

* Go to the “Baseboard” tab and change the “Baseboard Height” to 0.2mm instead of the stock 0.5mm
* Change the “Bottom Angle” to 45 degrees instead of the stock 60 degrees
* Change the “Baseboard Type” to either projected area or minimal area



** For any other slicing procedures or questions, reference this [Elegoo beginner manual](<https://www.google.com/url?q=https://www.elegoo.com/blogs/3d-printer-user-guide/how-to-do-resin-3d-printing-beginners-guide?srsltid%3DAfmBOoonnDJ2iGhduZr7jUi-neK8gZSHBa8EaXuHVdHhFJLl4xXQTqDB&sa=D&source=editors&ust=1776804178475998&usg=AOvVaw09jnDeSpms6Bakk_LihaUd>) for more information **

7. When done, click Slice and view the layers to ensure supports are generated correctly, and the piece is hollowed out



![](../../../assets/images/elegoo_manual_image_7.jpeg)

8. When confirmed, click “Network Transmission” and click the Elegoo Printer



![](../../../assets/images/elegoo_manual_image_8.jpeg)

9. Click “Send” and wait for the file to transfer. You will know it is done when the percentage reaches 100%, and the “Print” button is Blue on the right-hand side
10. Before you click Print, make sure the printer has a sufficient amount of resin (above Min but below Max) and that the build plate is clean 
11.  Click Print and watch the first couple of layers to ensure the print adheres to the build plate
12. During operation, confirm that:
    1. The printer operates quietly and smoothly
    2. No resin leaks or error messages occur



### 5.4 End-of-Job / Shutdown
1. Allow the print to fully complete and allow excess resin to drip back into the vat
2. Complete the post-processing according to the washing and curing instructions in the [cleaning document](<../../Elegoo Mercury 3.0 Plus Washing And Curing Machine/Elegoo Washing And Curing Machine Manual.md>) Section 6.0.
3. DO NOT USE THE METAL SCRAPER
4. Clean tools and work area with IPA
5. Ensure no pieces of cured resin are in the tank
6. Power off the machine if no further jobs are scheduled



##User Responsibilities 

## ** The user is responsible for all of the following tasks before and after use as specified **

## Before use:

* If the user is changing resin to their own, you must change the resin according to the instructions in the [Cleaning Manual](<../Elegoo Cleaning Procedure/Elegoo Resin 3D Printer Cleaning Manual.md>) Section 5.0
* Filling the resin so the level is between the Min and Max lines



After use:

* If the user used their own resin, they MUST drain the resin and leave an empty vat using the procedures in the [Cleaning Manual](<../Elegoo Cleaning Procedure/Elegoo Resin 3D Printer Cleaning Manual.md>) Section 5.0
* Cleaning the build plate, tools, and surrounding work area
* Disposing of resin waste in the trash
* Reporting failed prints, damage, or abnormal behavior to staff
* DO NOT pour resin or IPA down the drain 
* Wipe resin up with paper towels and throw it in the trash



## Stop Conditions

Stop immediately and notify Fab Lab staff if:

* You hear unusual noises or observe abnormal motion
* You see resin leaks, smoke, sparks, or smell strong or unusual odors
* The printer displays error messages you do not understand
* You are unsure how to proceed safely

Do not attempt major troubleshooting or repairs yourself.


## Common Issues & What To Do

* Issue: Print does not adhere to the build plate  
Action: Clean the build plate thoroughly and attempt the print again. If the print fails again, stop the job and notify staff
* Issue: Layer separation or partial print failure  
Action: Make sure the correct machine model (Saturn 4 Ultra 16K) is selected in the slicer. If the issue continues, stop the job and notify staff
* Issue: Excess cured resin or milky/white release film  
Action: Clean the vat and film and remove cured resin fragments before starting new prints. If the issue continues, stop the job and notify staff
* Issue: Errors or prints not starting correctly (typically a software issue)  
Action: Notify staff so they can update the software



** Lots of online resin troubleshooting if necessary

## External Resources

For more detailed information, refer to:

* Elegoo Saturn 4 Ultra 16K User Manual ([Elegoo Saturn 4 Manual](https://3d.nice-cdn.com/upload/file/Saturn_4_Ultra_16K-_multilang_-20240909.pdf)) 
* Official Elegoo setup and operation videos ([Non-official setup video](https://www.google.com/url?q=https://www.youtube.com/watch?v%3D1k0sVDiMGVo&sa=D&source=editors&ust=1776804178485688&usg=AOvVaw0mN6jK6WUaf6_85ZE0nOAf))
* For more information on typical issues, reference the FAQ at the end of this [manual](https://www.youtube.com/watch?v=1k0sVDiMGVo)
* (For Slicer) Elegoo setup beginner manual ([Elegoo Beginner Manual](https://www.elegoo.com/blogs/3d-printer-user-guide/how-to-do-resin-3d-printing-beginners-guide))