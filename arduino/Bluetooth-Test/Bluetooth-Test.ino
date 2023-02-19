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



// other variables
// Create variables to check characteristics have been created successful
int counterChannel;
int elevationChannel;

// Initialize the counter to 0
int counter = 0;


// HELPER FUNCTIONS

// error handling
void error(const __FlashStringHelper*err) {
  Serial.println(err);
  digitalWrite(pinR, 255);
  while (1);
}

void setup() {
  pinMode(PIN_R, OUTPUT);
  pinMode(PIN_G, OUTPUT);
  pinMode(PIN_B, OUTPUT);
  // At the beginning all the led are turned down
  digitalWrite(PIN_R, LOW);
  digitalWrite(PIN_G, LOW);
  digitalWrite(PIN_B, LOW);

  // Verify if the serial port is available, and initialize it to display some information
  while(!Serial) {
    delay(500);
  }

  Serial.begin(DEV_BAUD); // Default communication rate of the Bluetooth module
}

void loop() {
  // put your main code here, to run repeatedly:
  if(Serial.available() > 0){ // Checks whether data is comming from the serial port
    state = Serial.read(); // Reads the data from the serial port
  }

  if (state == '0') {
    digitalWrite(PIN_R, LOW); // Turn LED OFF
    Serial.println("LED: OFF"); // Send back, to the phone, the String "LED: OFF"
    state = 0;
  }
  else if (state == '1') {
    digitalWrite(PIN_R, HIGH);
    Serial.println("LED: ON");;
    state = 1;
  } 
}
