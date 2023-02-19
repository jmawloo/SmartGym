// NOTE: Before you run the code:
// 1) Unplug the RX/TX pins before uploading to Arduino!!
// 2) Default password 1234



// Include libraries needed
// For HC-05 compatibility
//https://howtomechatronics.com/tutorials/arduino/arduino-and-hc-05-bluetooth-module-tutorial/

// For react native project:
// https://www.bam.tech/article/make-your-first-iot-react-native-application-with-bluetooth-low-energy


#include <Arduino.h>
// #include <SoftwareSerial.h>

// #include "HC05.h"
// #include "Adafruit_BLE.h"
// #include "Adafruit_BluefruitLE_UART.h"
// #include "BluefruitConfig.h"





// #if SOFTWARE_SERIAL_AVAILABLE
//   #include <SoftwareSerial.h>
// #endif

// pin configs / other constants
// Define the pin where the RGB led is wired
const int PIN_R = 2, PIN_G = 3, PIN_B = 4;
const int BT_BAUD = 38400, DEV_BAUD = 9600;

const int BUF_SIZE = 1024;
const char TERM_CHAR = '\n';

// other variables
static const unsigned long rates[] =
    {4800,9600,19200,38400,57600,115200};

// Create variables to check characteristics have been created successful
int counterChannel;
int elevationChannel;

// Initialize the counter to 0
int counter = 0, state = 0;

String buffer;


// HELPER FUNCTIONS

// error handling
// void error(const __FlashStringHelper*err) {
//   Serial.println(err);
//   digitalWrite(pinR, 255);
//   while (1);
// }

// void readUntilTerm() {
//   static byte ndx = 0;
//     char endMarker = '\n';
//     char rc;
    
//     while (Serial1.available() > 0 && newData == false) {
//       rc = Serial1.read();

//       if (rc != endMarker) {
//           receivedChars[ndx] = rc;
//           ndx++;
//           if (ndx >= numChars) {
//               ndx = numChars - 1;
//           }
//       }
//       else {
//           receivedChars[ndx] = '\0'; // terminate the string
//           ndx = 0;
//           newData = true;
//       }
//     }
// }


void setup() {
  pinMode(PIN_R, OUTPUT);
  pinMode(PIN_G, OUTPUT);
  pinMode(PIN_B, OUTPUT);
  // At the beginning all the led are turned down
  digitalWrite(PIN_R, LOW);
  digitalWrite(PIN_G, LOW);
  digitalWrite(PIN_B, LOW);

  // Verify if the serial port is available, and initialize it to display some information
  while(!Serial1) {
    delay(500);
  }

  Serial.begin(DEV_BAUD); // Default communication rate of the Bluetooth module
  Serial1.begin(BT_BAUD);
}

void loop() {
  // put your main code here, to run repeatedly:
  if(Serial1.available() > 0){ // Checks whether data is comming from the serial port
    buffer = Serial1.read(); // Reads the data from the serial port
    Serial.println("Available");

  }

  Serial.println((int) buffer[0]);
  // Serial.println(buffer);
  // Serial.println((int) buffer.c_str()[1]);
  // Serial.println(buffer.c_str());
  delay(500);


  if (buffer[0] == '0' || state == 1) {
    digitalWrite(PIN_R, LOW); // Turn LED OFF
    // Serial1.println("LED: OFF"); // Send back, to the phone, the String "LED: OFF"
    Serial.println("LED: off");
    state = 1;
    // Ensure available for writing:
    if (Serial1.availableForWrite() >= 10) {
      if (Serial1.println("1;3;3600") > 0) { // reps, sets, elapsed total time since beginning.
        Serial.println("This works");
        state = 0;
      }
    }
    
  }
  else if (buffer[0] == '1') {
    digitalWrite(PIN_R, HIGH);
    Serial1.println("LED: ON");
    Serial.println("LED: on");
    state = 0;
  }
  buffer = "";
}
