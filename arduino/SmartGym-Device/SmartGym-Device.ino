// Code borrowed from https://arduinogetstarted.com/tutorials/arduino-lcd

#include <LiquidCrystal.h>
#include <ezButton.h>

// Assign pins:
const int RS = 11, EN = 12;
const int D4 = 2, D5 = 3, D6 = 4, D7 = 5;

//// Part 2)
  const int trigPin=10;
  const int echoPin=9;
  unsigned int repsassigned=0;
  unsigned int repsLeft=0;
  unsigned int setsLeft=0; 
  bool iscomplete=false;  
LiquidCrystal lcd(RS, EN, D4, D5, D6, D7);
ezButton incVal(6), nxtLine(7), decVal(8); // buttons


// TODO: when nxtLine button is pressed 3 times consecutively, user confirms sets + reps. Start timer + tracking.

// Define valid states:
const int SETUP_1 = 0, SETUP_2 = 1;

// Other vals:
const unsigned long DEBOUNCE_TIME_MS = 50;


unsigned int count1 = 0, count2 = 0;
unsigned int *currCounter = &count1;
bool shouldUpdateLCD = true;
bool confirmOption=false;
int confirm=0;

// STATE MACHINE LOGIC
// 0 = SETUP
// 1 = CONFIRMED + REP + SET COUNTDOWN
int state = 0;



void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  lcd.begin(16, 2); // Set LCD's # cols + rows (in that order!)
  incVal.setDebounceTime(DEBOUNCE_TIME_MS);
  decVal.setDebounceTime(DEBOUNCE_TIME_MS);
  nxtLine.setDebounceTime(DEBOUNCE_TIME_MS);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
    
}

void updateSetupLCD(unsigned int c1, unsigned int c2,bool confirmOption) {
  lcd.clear();
  lcd.setCursor(0,0);
  if (confirmOption){
    lcd.print("Confirmed");
    delay(500);
    lcd.clear();

  } else {
    lcd.print("Sets: ");
    lcd.print(c1);
    lcd.setCursor(0,1);
    lcd.print("Reps: ");
    lcd.print(c2);
  }
} 

// Part 2) 
 void sensorLoop(unsigned int* repsLeft, unsigned int* setsLeft){
    // duration is the number of microseconds it took for ping to reach object and return to sensor
    // distance contains distance to object in centimeters
    long duration, distance;
    digitalWrite(trigPin, LOW);
    delayMicroseconds(2);
    digitalWrite(trigPin, HIGH);
    delayMicroseconds(10);
    digitalWrite(trigPin, LOW);
    duration = pulseIn(echoPin, HIGH);
    distance = (duration/2) / 29.1;
    updateRepLCD(repsLeft, setsLeft,iscomplete);
    if (distance < 20){
        
        Serial.println("one rep detected");
        if (*repsLeft!=0){
        *repsLeft = *repsLeft - 1;
        //Serial.println(repsLeft);
          updateRepLCD(repsLeft, setsLeft,iscomplete);
        }
        else if (*repsLeft==0&&*setsLeft!=0){
          *setsLeft= *setsLeft - 1;
          *repsLeft=repsassigned;
          updateRepLCD(repsLeft, setsLeft,iscomplete);
        }
        else if (*repsLeft==0 && *setsLeft==0){
          iscomplete=true;
          updateRepLCD(repsLeft, setsLeft,iscomplete);
        }
        Serial.println(*repsLeft);
        Serial.println(*setsLeft);
        Serial.print("Reps assigned ");
        Serial.println(repsassigned);
      }
  
    delay(800);

}

void updateRepLCD(unsigned int* repsLeft, unsigned int* setsLeft, bool iscomplete) {
  lcd.clear();
  lcd.setCursor(0,0);
  if (iscomplete){
    lcd.print("Workout Finished!");
  }else{
  lcd.print("Sets Left: ");
  lcd.print(*setsLeft);
  lcd.setCursor(0,1);
  lcd.print("Reps Left: ");
  lcd.print(*repsLeft);
  }
}





void loop() {
  // put your main code here, to run repeatedly:
  incVal.loop(); decVal.loop(); nxtLine.loop();

  switch (state) {
    case 0:
      // PART 1) Setup (# Sets, # Reps)

      // Swap counters 
      if (nxtLine.isPressed()) {
        currCounter = (currCounter == &count1 ? &count2 : &count1);
        confirm++;
      }
      
      if (incVal.isPressed()) {
        (*currCounter)++;    
        shouldUpdateLCD = true;
        confirm=0;
      } else if (decVal.isPressed() && *currCounter > 0) {
        (*currCounter)--;
        shouldUpdateLCD = true;
        confirm=0;
      }

      if (confirm==3){
        confirmOption=true;
        shouldUpdateLCD = true;
        confirm=0;
        state=1;
        repsassigned = repsLeft = count2;
        setsLeft=count1; 
      }  
      // UPDATE LCD if needed:
      // Will also update when board first runs.
      if (shouldUpdateLCD) { 
        updateSetupLCD(count1, count2,confirmOption);
        shouldUpdateLCD = false;
      }

      break;
    case 1:
      // Part 2) Measurement + Execution (Timer + Number of Sets and Reps left.)
      if (iscomplete==false)
      sensorLoop(&repsLeft, &setsLeft);
      break;    
    default:
      break;
  }
  
}

 