<section class="titlepage">

# Language Reference

![Logo](../images/logo.png){width=200px}

**Autor:** Philipp Uhlendorf

**Datum:** Oktober 2025

> ![Logo](../images/info.png){width=50px}
>
> **In the Reference are ``HIGH`` and ``LOW`` used. IF you don´t want to use it you can also use ``1`` for ``HIGH`` and ``0`` for ``LOW``**

</section>

>[TOC]
>
>

## Functions

### Digital I/O

---

#### digitalRead()

**Description:**

Reads the value of a specific digital pin as ``HIGH`` or ``LOW``

**Syntax:**

```arduino
digitalRead(pinnumber);
```

**Parameter:**

The function admits the following parameter:
``pinnumber``
The Arduino pin number you want to read.

**Returns:**

The function returns the boolean state of the read pin as ``HIGH`` or ``LOW``

**Example Code**

```arduino
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

**Notes and Warnings:**

Nothing.

#### digitalWrite()

**Description:**

Write a digital pin to the value ``HIGH`` or ``LOW``.

If the digital pin is configured as an ``OUTPUT`` in ``pinMode()`` the pin will set to 3V or 5V, when the pin is set to ``HIGH`` and to 0V if it is set to ``LOW``.

If the digital pin is configured as an ``INPUT`` in ``pinMode()``, ``digitalWrite()`` will enable or disable (``HIGH`` or ``LOW``) the internal pull-up resistor on the input pin. For reference see [in the official documentation](https://docs.arduino.cc/learn/microcontrollers/digital-pins/).

If the digital pin is not configured as an ``OUTPUT`` via ``pinMode`` and connect an LED to it, when calling ``digitalWrite(pinnumber, HIGH)`` the LED might be dimmed. Without explicitly setting

```arduino
pinMode();
digitalWrite();
```

the internal pull-up resistor is set to enable, which acts like a large current-limiting resistor.
 
**Syntax:**

```arduino
digitalWrite(pinnumber, value);
```

**Parameters:**

- ``pinnumber``: pin number of the controlled Arduino pin
- ``value``: ``HIGH`` or ``LOW``

**Returns:**

The function returns nothing.

**Example Code:**

```arduino
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

#### pinMode()

**Description:**

Configures the specifiedpin to behave either as an ``INPUT`` or an ``OUTPUT``.

See the [Digital Pins](https://docs.arduino.cc/learn/microcontrollers/digital-pins/) page for daeatils on the functionality of the pins.

It is possible to enable the internal pull-up resistors with the mode ``INPUT_PULLUP``. Additionally, th ``INPUT`` mode explicitly disables the internal pull-up.

**Syntax:**

```arduino
pinMode(pinnumber, mode);
```

**Parameters:**

- ``pinnumber``: pin number of the controlled Arduino pin
- ``mode``: ``INPUT``,``OUTPUT``, or ``INPUT_PULLUP``. For more functions and informations see [in the official documentation](https://docs.arduino.cc/learn/microcontrollers/digital-pins/)

**Returns:**

The function returns nothing.

**Example Code:**

```arduino
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

### Math

---

#### abs()

**Description:**

This function calctulates the absolute value of an given number.

**Syntax:**

```arduino
abs(x);
```

**Parameters:**

``x``: the number to compute.

**Returns:**

- The function returns ``x`` if the input parameter is greater or equal to 0.

- The function returns ``-x`` if the input parameter is less than 0.

**Example Code:**

```arduino
void setup() {
  Serial.begin(9600);
  while (!Serial) {
    ;  // wait for serial port to connect. Needed for native USB port only
  }
  int x = 42;
  Serial.print("The absolute value of ");
  Serial.print(x);
  Serial.print(" is ");
  Serial.println(abs(x));
  x = -42;
  Serial.print("The absolute value of ");
  Serial.print(x);
  Serial.print(" is ");
  Serial.println(abs(x));
}

void loop() {
}
```

**Notes and Warnings:**

Avoid using other functions in the function of ``abs()``, it may lead to incorrect results.

```arduino
abs(a++); // avoid this - yields incorrect results

// use this instead:
abs(a);
a++;  // keep other math outside the function
```

#### constrain()

**Description:**

Constrain a number to be in a range. The input of this function could be, for example, a sensor value that controls a motor position, with the lower and upper ranges of the function being the physical limits of possible movement.

**Syntax:**

```arduino
constrain(x,a,b);
```

**Parameters:**

In all parameters all data types are allowed.

``x``: the number to constrain.
``a``: the lower end of the range.
``b``: the upper end of the range.

**Returns:**

- 
