// Code borrowed from https://arduinogetstarted.com/tutorials/arduino-lcd

#include <LiquidCrystal.h>
#include <ezButton.h>

// Assign pins:
const int RS = 11, EN = 12;
const int D4 = 2, D5 = 3, D6 = 4, D7 = 5;

LiquidCrystal lcd(RS, EN, D4, D5, D6, D7);
ezButton incVal(6), nxtLine(7), decVal(8);

// Define valid states:
const int SETUP_1 = 0, SETUP_2 = 1;

// Other vals:
unsigned long count1 = 0, count2 = 0;
const int debounceTimeMS = 50;
unsigned long *currCounter = nullptr;
bool shouldUpdateLCD = false;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  lcd.begin(16, 2); // Set LCD's # cols + rows (in that order!)

  
}

void updateLCD(unsigned long c1, unsigned long c2) {
  lcd.clear();
  lcd.setCursor(0,0);
  lcd.print("Count1: ");
  lcd.print(c1);
  lcd.setCursor(0,1);
  lcd.print("Count2: ");
  lcd.print(c2);
}

void loop() {
  // put your main code here, to run repeatedly:
  incVal.loop(); decVal.loop(); nxtLine.loop();
  shouldUpdateLCD = false;
  // Swap counters 
  if (nxtLine.isPressed()) {
    currCounter = (currCounter == &count1 ? &count2 : &count1);
  }
  
  if (incVal.isPressed()) {
    (*currCounter)++;    
    shouldUpdateLCD = true;
  } else if (decVal.isPressed() && *currCounter > 0) {
    (*currCounter)--;
    shouldUpdateLCD = true;
  }


  // UPDATE LCD if needed:
  if (shouldUpdateLCD) updateLCD(count1, count2);
}
