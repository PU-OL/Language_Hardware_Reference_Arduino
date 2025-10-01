# Language Reference

**In the Reference are ``HIGH`` and ``LOW`` used. IF you don´t want to use it you can also use ``1`` for ``HIGH`` and ``0`` for ``LOW``**

## Functions

### Digital I/O

---

digitalRead()
-------------

**Description:**

Reads the value of a specific digital pin as ``HIGH`` or ``LOW``

**Syntax:**

```cpp
digitalRead(pinnumber);

```

**Parameter:**

The function admits the following parameter:
``pinnumber``
The Arduino pin number you want to read.

**Returns:**

The function returns the boolean state of the read pin as ``HIGH`` or ``LOW``

**Example Code**

```CPP
int ledPin = 13;  // LED connected to digital pin 13
int inPin = 7;    // pushbutton connected to digital pin 7
int val = 0;      // variable to store the read value

void setup() {
  pinMode(ledPin, OUTPUT);  // sets the digital pin 13 as output
  pinMode(inPin, INPUT);    // sets the digital pin 7 as input
}

void loop() {
  val = digitalRead(inPin);   // read the input pin
  digitalWrite(ledPin, val);  // sets the LED to the button's value
}
```
digitalWrite()
-------------
**Description:**

Write a digital pin to the value ``HIGH`` or ``LOW``.

If the digital pin is configured as an ``OUTPUT`` in ``pinMode()`` the pin will set to 3V or 5V, when the pin is set to ``HIGH`` and to 0V if it is set to ``LOW``.

If the digital pin is configured as an ``INPUT`` in ``pinMode()``, ``digitalWrite()`` will enable or disable (``HIGH`` or ``LOW``) the internal pull-up resistor on the input pin. For reference see [here](https://docs.arduino.cc/learn/microcontrollers/digital-pins/).

If the digital pin is not configured as an ``OUTPUT`` via ``pinMode`` and connect an LED to it, when calling ``digitalWrite(pinnumber, HIGH)`` the LED might be dimmed. Without explicitly setting 
```cpp
pinMode();
digitalWrite();
```
the internal pull-up resistor is set to enable, which acts like a large current-limiting resistor.

**Syntax:**

```cpp
digitalWrite(pinnumber, value);
```

**Parameters:**

- ``pinnumber``: pin number of the controlled Arduino pin
- ``value``: ``HIGH`` or ``LOW``

**Returns:** 

The function returns nothing.

**Example Code:**

```cpp
void setup() {
  pinMode(13, OUTPUT);    // sets the digital pin 13 as output
}

void loop() {
  digitalWrite(13, HIGH); // sets the digital pin 13 on
  delay(1000);            // waits for a second
  digitalWrite(13, LOW);  // sets the digital pin 13 off
  delay(1000);            // waits for a second
}
```
**Notes and Warnings:**

The analog input pins can be used as digital pins, referred to as A0, A1, etc. The exception is the Arduino Nano, Pro Mini, and Mini’s A6 and A7 pins, which can only be used as analog inputs.

pinMode()
---------

**Description:**

Configures the specifiedpin to behave either as an ``INPUT`` or an ``OUTPUT``.

See the [Digital Pins](https://docs.arduino.cc/learn/microcontrollers/digital-pins/) page for daeatils on the functionality of the pins.

It is possible to enable the internal pull-up resistors with the mode ``INPUT_PULLUP``. Additionally, th ``INPUT`` mode explicitly disables the internal pull-up.

**Syntax:**

```cpp
pinMode(pinnumber, mode);
```

**Parameters:**

- ``pinnumber``: pin number of the controlled Arduino pin
- ``mode``: ``INPUT``,``OUTPUT``, or ``INPUT_PULLUP``. For more functions and informations see [here](https://docs.arduino.cc/learn/microcontrollers/digital-pins/) 

**Returns:** 

The function returns nothing.

**Example Code:**
```cpp
void setup() {
  pinMode(13, OUTPUT);    // sets the digital pin 13 as output
}

void loop() {
  digitalWrite(13, HIGH); // sets the digital pin 13 on
  delay(1000);            // waits for a second
  digitalWrite(13, LOW);  // sets the digital pin 13 off
  delay(1000);            // waits for a second
}
```
