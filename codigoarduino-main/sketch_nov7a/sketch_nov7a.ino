#include <DHT.h>
#define DHTPIN 27      // Define the pin for the DHT sensor
#define DHTTYPE DHT11  // Specify the DHT sensor type
#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "BenjaminWiFi";
const char* password = "benssyca123";
const char* serverUrl1 = "https://ticsproject.onrender.com/temperatureget";
const char* serverUrl2 = "https://ticsproject.onrender.com/buttonsget";

DHT dht(DHTPIN, DHTTYPE);  // Initialize the DHT sensor

unsigned long lastTemperatureCheckTime = 0;     // Initialize the last temperature check time
unsigned long temperatureCheckInterval = 5000;  // Set the temperature check interval to 5 seconds
const int buttonPin1 = 33;                      // Define the pin for the first push button
const int buttonPin2 = 32;                      // Define the pin for the second push button
const int buttonPin3 = 26;                      // Define the pin for the third push button

int lastButtonState1 = LOW;  // Initialize the last button state for button 1 as not pressed
int lastButtonState2 = LOW;  // Initialize the last button state for button 2 as not pressed
int lastButtonState3 = LOW;  // Initialize the last button state for button 3 as not pressed

unsigned long lastDebounceTime1 = 0;  // Initialize the last debounce time for button 1
unsigned long lastDebounceTime2 = 0;  // Initialize the last debounce time for button 2
unsigned long lastDebounceTime3 = 0;  // Initialize the last debounce time for button 3

unsigned long debounceDelay = 2000;  // Set the debounce delay to 2 seconds
unsigned long lastCheckTime = 0;     // Initialize the last check time
unsigned long checkInterval = 5000;  // Set the check interval to 5 seconds

int temperatureOutOfRangeCounter = 0;
const int temperatureNotificationThreshold = 20;

HTTPClient http;

void setup() {
  Serial.begin(9600);
  delay(1000);

  WiFi.mode(WIFI_STA);  // Optional
  WiFi.begin(ssid, password);
  Serial.println("\nConnecting");

  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(100);
  }

  Serial.println("\nConnected to the WiFi network");
  Serial.print("Local ESP32 IP: ");
  Serial.println(WiFi.localIP());

  pinMode(buttonPin1, INPUT_PULLUP);  // Set button 1 pin as input with internal pull-up resistor
  pinMode(buttonPin2, INPUT_PULLUP);  // Set button 2 pin as input with internal pull-up resistor
  pinMode(buttonPin3, INPUT_PULLUP);  // Set button 3 pin as input with internal pull-up resistor

  dht.begin();  // Initialize the DHT sensor
}

void loop() {
  unsigned long currentTime = millis();

  // Check if it's time to check the button state
  if (currentTime - lastCheckTime >= checkInterval) {
    lastCheckTime = currentTime;  // Update the last check time

    // Read the state of each button
    int reading1 = digitalRead(buttonPin1);
    int reading2 = digitalRead(buttonPin2);
    int reading3 = digitalRead(buttonPin3);

    // Check and print the state changes for button 1
    if (reading1 != lastButtonState1) {
      lastDebounceTime1 = currentTime;  // Update the last debounce time for button 1
      lastButtonState1 = reading1;      // Update the last button state for button 1

      if (lastButtonState1 == LOW) {
        Serial.println("Button 1 is pressed.");
      } else {
        Serial.println("Button 1 is released.");
      }
    }

    // Check and print the state changes for button 2
    if (reading2 != lastButtonState2) {
      lastDebounceTime2 = currentTime;  // Update the last debounce time for button 2
      lastButtonState2 = reading2;      // Update the last button state for button 2

      if (lastButtonState2 == LOW) {
        Serial.println("Button 2 is pressed.");
      } else {
        Serial.println("Button 2 is released.");
      }
    }

    // Check and print the state changes for button 3
    if (reading3 != lastButtonState3) {
      lastDebounceTime3 = currentTime;  // Update the last debounce time for button 3
      lastButtonState3 = reading3;      // Update the last button state for button 3

      if (lastButtonState3 == LOW) {
        Serial.println("Button 3 is pressed.");
      } else {
        Serial.println("Button 3 is released.");
      }
    }

    sendButtonStateToServer(serverUrl2, reading1, reading2, reading3);

    if (currentTime - lastTemperatureCheckTime >= temperatureCheckInterval) {
      lastTemperatureCheckTime = currentTime;     // Update the last temperature check time
      float temperature = dht.readTemperature();  // Read temperature from the DHT sensor
      Serial.print("Temperature: ");
      Serial.print(temperature);
      Serial.println(" °C");

      if (temperature <= 0 || temperature >= 28) {
        // Temperature is out of range
        temperatureOutOfRangeCounter++;
        if (temperatureOutOfRangeCounter >= temperatureNotificationThreshold) {
          // Notify when the threshold is reached
          Serial.println("Temperature out of range. Sending notification...");
          sendTemperatureNotificationToServer(serverUrl1, "Temperature out of range.");
        }
      } else {
        // Temperature is within the range, reset the counter
        temperatureOutOfRangeCounter = 0;
      }

      sendTemperatureToServer(serverUrl1, temperature);
    }
  }
}

void sendTemperatureToServer(const char* url, float temperature) {
  // Create an HTTPClient object
  HTTPClient http;

  // Make a POST request to the server URL with the temperature data
  http.begin(url);
  http.addHeader("Content-Type", "application/x-www-form-urlencoded");
  String postData = "temperature=" + String(temperature);
  int httpResponseCode = http.POST(postData);

  if (httpResponseCode > 0) {
    String response = http.getString();
    Serial.print("Temperature POST Response: ");
    Serial.println(response);
  } else {
    Serial.print("Error posting temperature data. HTTP Response Code: ");
    Serial.println(httpResponseCode);
  }

  http.end();  // Close the connection
}

void sendButtonStateToServer(const char* url, int buttonState1, int buttonState2, int buttonState3) {
  // Create an HTTPClient object
  HTTPClient http;

  // Make a POST request to the server URL with the button state data
  http.begin(url);
  http.addHeader("Content-Type", "application/x-www-form-urlencoded");
  String postData = "buttonState1=" + String(buttonState1) + "&buttonState2=" + String(buttonState2) + "&buttonState3=" + String(buttonState3);

  int httpResponseCode = http.POST(postData);

  if (httpResponseCode > 0) {
    String response = http.getString();
    Serial.print("Button State POST Response: ");
    Serial.println(response);
  } else {
    Serial.print("Error posting button state data. HTTP Response Code: ");
    Serial.println(httpResponseCode);
  }

  http.end();  // Close the connection
}

void sendTemperatureNotificationToServer(const char* url, const char* message) {
  HTTPClient http;
  http.begin(url);
  http.addHeader("Content-Type", "application/x-www-form-urlencoded");
  String postData = "message=" + String(message);
  int httpResponseCode = http.POST(postData);

  if (httpResponseCode > 0) {
    String response = http.getString();
    Serial.print("Temperature Notification POST Response: ");
    Serial.println(response);
  } else {
    Serial.print("Error posting temperature notification. HTTP Response Code: ");
    Serial.println(httpResponseCode);
  }

  http.end();  // Close the connection
}
