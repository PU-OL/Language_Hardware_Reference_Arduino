<section class="titlepage">

# Language Reference

![Logo](../images/logo.png){width=200px}

**Author:** Philipp Uhlendorf

**Date:** October 2025

<br>

> [!NOTE]
>
> In the Reference, ``HIGH`` and ``LOW`` are used.
> If you don’t want to use them, you can also use ``1`` for ``HIGH`` and ``0`` for ``LOW``
>

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

- ``pinnumber``: The Arduino pin number you want to read.

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

<br>
<br>

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

Configures the specified pin to behave either as an ``INPUT`` or an ``OUTPUT``.

See the [Digital Pins](https://docs.arduino.cc/learn/microcontrollers/digital-pins/) page for details on the functionality of the pins.

It is possible to enable the internal pull-up resistors with the mode ``INPUT_PULLUP``. Additionally, the ``INPUT`` mode explicitly disables the internal pull-up.

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

This function calculates the absolute value of a given number.

**Syntax:**

```arduino
abs(x);
```

**Parameters:**

- ``x``: the number to compute.

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

- ``x``: if the input parameter (x) is between ``a`` and ``b``.
- ``a``: if the input parameter (x) is less than ``a``.
- ``b``: if the input parameter (x) is greater than ``b``.

**Example Code:**

```arduino
int sensVal = 50;  // try with 170 and 5 to verify the functionality

void setup() {
  Serial.begin(9600);

  sensVal = constrain(sensVal, 10, 150);  // limits range of sensor values between 10 and 150

  Serial.print("The sensor value is: ");
  Serial.println(sensVal);
}

void loop() {
}
```

**Notes and Warnings:**

Avoid using other functions in the function of ``constrain()``, it may lead to incorrect results.

```arduino
int constrainedInput = constrain(Serial.parseInt(), minimumValue, maximumValue);   // avoid this

// use this instead:
int input = Serial.parseInt();  // keep other operations outside the constrain function
int constrainedInput = constrain(input, minimumValue, maximumValue);
```

#### map()

**Description:**

Re-maps a number from one range to another.That is, a value of *fromLow* would get mapped to *toLow*, a value of *fromHigh* to *toHigh*, values in-between to values in-between, etc.

map() does not onstrain the values to be in the range, out-of-range values are sometimes intended and useful. The ``constrain()`` function may be used befor or after ``map()``.

> [!NOTE]
> Notice that the "lower bounds" of either range may be *larger* or *smaller* than the "upper bounds", so it can be used to reverse a range of numbers.
>
> The ``map()`` function uses integer math so will not generate fractions, when math might indicate that it should do so. Fractional remainders are truncated, and are not rounded or averaged.
>

**Syntax:**

```ardui
map(value, fromLow, fromHigh, toLow, toHigh);
```

**Parameters:**

- ``value``: the input variable with the number to map.
- ``fromLow``: the *lower* bound of the value's *current* range
- ``fromHigh``: the *upper* bound of the value's *current* range
- ``toLow``: the *lower* boundof the value's *target* range
- ``toHigh``: the *upper* boundof the value's *target* range

**Returns:**

The mapped value as ``long``.

**Example Code:**

```arduino
/* Map an analog 10-bit (0-1023) value to 8 bits (0 to 255) */
void setup() {
  Serial.begin(9600);
}

void loop() {
  int val = analogRead(0);

  Serial.print("Input value: ");
  Serial.print(val);

  val = map(val, 0, 1023, 0, 255); // mapping function

  Serial.print(", Output value: ");
  Serial.println(val);

  analogWrite(9, val); // PWM output
  delay(200);
}
```

**Appendix:**

For the mathematically inclined, is here the whole function.

```arduino
long map(long x, long in_min, long in_max, long out_min, long out_max) {
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
```

**Notes and Warnings:**

As previously mentioned, the map() function uses integer math. So fractions might get suppressed due to this. For example, fractions like 3/2, 4/3, 5/4 will all be returned as 1 from the map() function, despite their different actual values. So if your project requires precise calculations (e.g. voltage accurate to 3 decimal places), please consider avoiding map() and implementing the calculations manually in your code yourself.

#### max()

**Description:**

Find the larger number of two numbers using ``max()`` function.

**Syntax:**

```arduino
max(x,y);
```

**Parameters:**

All data types are allowed

- ``x``: the first number to compare.
- ``y``: the second number to compare.

**Returns:**

Returns the larger number of the two numbers.

**Example Code:**

```arduino
int a = 25;
int b = 14;

void setup() {
  Serial.begin(9600);

  int max = max(a, b);

  Serial.print("The larger value is: ");
  Serial.println(max);
}

void loop() {
}
```

Another typlical application could be to constrain a minimum value of a variable, as shown in the following example:

```arduino
sensVal = max(sensVal, 20); // assigns sensVal to the larger of sensVal or 20
                            // (effectively ensuring that it is at least 20)
```

**Notes and Warnings:**

Nothing.

#### min()

**Description:**

Find the smaller number of two numbers using ``min()`` function

**Syntax:**

```arduino
min(x,y);
```

**Parameters:**

All data types are allowed

- ``x``: the first number to compare.
- ``y``: the second number to compare.

**Returns:**

Returns the smaller number of the two numbers.

**Example Code:**

```arduino
int a = 25;
int b = 14;

void setup() {
  Serial.begin(9600);

  int min = min(a, b);

  Serial.print("The smaller value is: ");
  Serial.println(min);
}

void loop() {
}
```

Another typical application could be to constrain a maximum value of a variable, as shown in the following example:

```arduino
sensVal = min(sensVal, 100);  // assigns sensVal to the smaller of sensVal or 100
                              // ensuring that it never gets above 100.
```

**Notes and Warnings:**

Avoid using other functions in the function of ``min()``, it may lead to incorrect results.

```arduino
min(a++, 100);  // avoid this - yields incorrect results

min(a, 100);
a++;  // use this instead - keep other math outside the function
```

#### pow()

**Description:**

Calculates the value of a number raised to a power. pow() can be used to raise a number to a fractional power. This is useful for generating exponential mapping of values or curves.

**Syntax:**

```arduino
pow(base, exponent);
```

**Parameters:**

Only allowed data types: ``float``.

- ``base``: the function input number to compute.
- ``exponent``: the power to which the base is raised.

**Returns:**

The function returns the result of exponentiation as an ``double``.

**Example Code:**

```arduino
float x = 2.0;  // base number
float y = 10.0;  // exponent number

void setup() {
  Serial.begin(9600);

  double z = pow(x, y);

  Serial.print("The power result is: ");
  Serial.println(z);
}

void loop() {
}
```

**Notes and Warnings:**

Nothing.

#### sq()

**Description:**

Calculates the square of a number: multiplies the number by itself.

**Syntax:**

```arduino
sq(x);
```

**Parameters:**

All data types are allowed.

- ``x``: the input number.

**Returns:**

The function returns the square of the number as ``double``

**Example Code:**

```arduino
float x = 2.0;  

void setup() {
  Serial.begin(9600);

  double square = sq(x);

  Serial.print("The result is: ");
  Serial.println(square);
}

void loop() {
}
```

**Notes and Warnings:**

Avoid using other functions in the function of ``sq()``, it may lead to incorrect results.

```arduino
int inputSquared = sq(Serial.parseInt()); // avoid this

//Use instead:
int input = Serial.parseInt();  // keep other operations outside the sq function
int inputSquared = sq(input);
```

#### sqrt

**Description:**

The function ``sqrt()`` calculates the square root of a number.

**Syntax:**

```arduino
sqrt(x);
```

**Parameters:**

All data tyoes allowed.

- ``x``: the number to find the square root of.

**Returns:**

The function returns the inpuzt number's square root as ``double``.

**Example Code:**

```arduino
float x = 9.0;  

void setup() {
  Serial.begin(9600);

  double root = sqrt(x);

  Serial.print("The square root is: ");
  Serial.println(root);
}

void loop() {
}
```

**Notes and Warnings:**

Nothing.

---

©2025 PU-OL
