1.2 Programming basics
A first program
A simple Java program appears below.

A program starts in main(), executing the statements within main's braces { }, one at a time.
Each statement typically appears alone on a line and ends with a semicolon, as English sentences end with a period.
The int wage statement creates an integer variable named wage. The wage = 20 statement assigns wage with 20.
The print and println statements output various values.
PARTICIPATION ACTIVITY
1.2.1: Program execution begins with main, then proceeds one statement at a time.


1

2

3

public class Salary {                       

  public static void main (String [] args) {
      int wage;

      wage = 20;                        

      System.out.print("Salary is ");       
      System.out.println(wage * 40 * 52);   
  }
}

20
wage
Salary is 
41600
20
A program begins executing statements in main(). 'int wage' declares an integer variable. 'wage = 20' assigns wage with 20.

Captions
A program begins executing statements in main(). 'int wage' declares an integer variable. 'wage = 20' assigns wage with 20.
The System.out.print statement outputs 'Salary is ' to the screen at the cursor's present location.
This System.out.println statement outputs the result of wage * 40 * 52, so 20 * 40 * 52 or 41600, and then moves cursor to next line.

Feedback?
PARTICIPATION ACTIVITY
1.2.2: A first program.
Consider the program above.

1)
Program execution begins at main() and executes statements surrounded by which symbols?
Correct

The statements within main() are contained within { }, called curly braces. The { indicates the start of main's statements, and the } indicates the end of main's statements, here meaning the end of the program.
2)
The statement int wage; creates a variable named wage that is used to _____ the value 20.
Correct

The variable wage holds the value 20. The variable wage can be assigned with a different value later in the program, so because the value held can vary, the item is called a variable. Program variables are different from variables in algebra.
3)
Would the following order of statements work the same as above? 
wage = 20;
int wage;
Correct

This order doesn't work. Statements are executed one at a time, starting from the first statement after the opening {. The program must first create the variable wage to hold a value, and only then can assign wage with the value 20. As an analogy, in everyday life, the instructions "Get a teapot. Fill with water." make sense. But the reverse-order "Fill with water. Get a teapot." make no sense, and water will end up on the floor.
4)
Each statement ends with what symbol?
Correct

Like a period ends an English sentence, a semicolon ends a program statement. Even though each statement is usually written on a unique line, a semicolon is needed as a separator because multiple statements could appear on the same line (though that practice is strongly discouraged).
5)
The expression wage * 40 * 52 resulted in what value?
Correct

The variable wage holds 20, so wage * 40 * 52, will calculate 20 * 40 * 52, which is 41600. Note that the symbol for multiplication is * (an asterisk).
6)
Each System.out.print() and System.out.println() statement outputs items to _____.
Correct

In the example, each System.out.print() or System.out.println() statement puts an item on the screen, starting at the screen cursor's present location, and moving the cursor after each output item. System.out.print() just prints the item. System.out.println() prints the item and then moves the cursor to the next line.

Feedback?
zyDE 1.2.1: A first program.
Below is the zyBooks Development Environment (zyDE), a web-based programming practice environment. Click run to compile and execute the program, then observe the output. Change 20 to a different number like 35 and click run again to see the different output.


Load default template...
      wage = 35;



Run
Program executed
Salary is 72800

Feedback?
Basic input
Programs commonly get input values, perform some processing on that input, and put output values to a screen or elsewhere. Input is commonly gotten from a keyboard, a file, fields on a web form or app, etc.

The following code at the top of a file enables the program to get input:
import java.util.Scanner;
A Scanner is a text parser that can get numbers, words, or phrases from an input source such as the keyboard. Getting input is achieved by first creating a Scanner object via the statement: Scanner scnr = new Scanner(System.in);. System.in corresponds to keyboard input. Then, given Scanner object scnr, the following statement gets an input value and assigns x with that value: x = scnr.nextInt() ;

PARTICIPATION ACTIVITY
1.2.3: A program can get an input value from the keyboard.

Start
import java.util.Scanner;

public class Salary {
   public static void main(String [] args) {
      int wage;

      Scanner scnr = new Scanner(System.in);
      wage = scnr.nextInt();

      System.out.print("Salary is ");
      System.out.println(wage * 40 * 52);
   }
}

20
wage
Salary is 
41600
 20   
Input
20
Output
20
Salary is 41600

Captions
A scanner object is setup to scan input from System.in. The scnr.nextInt() statement gets an input value from the keyboard (or file, etc.) and puts that value into the wage variable.
wage's value can then be used in subsequent processing and outputs.

Feedback?
PARTICIPATION ACTIVITY
1.2.4: Basic input.
1)
Assuming scnr already exists, which statement gets an input number into variable numCars?

Feedback?
PARTICIPATION ACTIVITY
1.2.5: Basic input.
1)
Type a statement that gets an input value into variable numUsers. Assume scnr already exists and numUsers has been declared.

Check

Show answer

Feedback?
zyDE 1.2.2: Basic input.
Run the program and observe the output. Change the input box value from 3 to another number, and then run again. Note: Handling program input in a web-based development environment is surprisingly difficult. Preentering the input is a workaround in zyDE. For dynamic output and input interaction, use a traditional development environment.


Load default template...
 
3

Run

Feedback?
Basic output: Text
The System.out.print construct supports output. Outputting text is achieved via: System.out.print("desired text");. Text in double quotes " " is known as a string literal. Multiple output statements continue printing on the same output line.

System.out.println (note the ln at the end, short for "line"), starts a new output line after the outputted values, called a newline. A common error is to type the number "1" or a capital I, as in "in", instead of a lower case l as in "print line".

Figure 1.2.1: Outputting text and new lines.
public class KeepCalm {
   public static void main (String [] args) {

      System.out.print("Keep calm");
      System.out.print("and");
      System.out.print("carry on");
   }
}
Keep calmandcarry on
public class KeepCalm {
   public static void main (String [] args) {

      System.out.println("Keep calm"); 
      System.out.println("and");       
      System.out.println("carry on");
   }
}
Keep calm
and
carry on

Feedback?
Outputting a blank line is achieved by: System.out.println().

PARTICIPATION ACTIVITY
1.2.6: Basic text output.
1)
Which statement outputs: Welcome!
2)
Which statement outputs Hey followed by a new line?

Feedback?
PARTICIPATION ACTIVITY
1.2.7: Basic text output.
End each statement with a semicolon. Do not output a new line unless instructed.

1)
Type a statement that outputs: Hello

Check

Show answer
2)
Type a statement that outputs Hello and then starts a new output line.

Check

Show answer

Feedback?
Outputting a variable's value
Outputting a variable's value is achieved via: System.out.print(x); Note that no quotes surround x. println() could also be used.

Figure 1.2.2: Outputting a variable's value.
public class Salary {
  public static void main (String [] args) {
     int wage;

     wage = 20;

     System.out.print("Wage is: "); 
     System.out.println(wage);
     System.out.println("Goodbye.");
  }
}
Wage is: 20
Goodbye.

Feedback?
Note that the programmer intentionally did not start a new output line after outputting "Wage is: " so that the wage variable's value would appear on that same line.

PARTICIPATION ACTIVITY
1.2.8: Basic variable output.
1)
Given variable numCars = 9, which statement outputs 9?

Feedback?
PARTICIPATION ACTIVITY
1.2.9: Basic variable output.
1)
Type a statement that outputs the value of numUsers (a variable). End statement with a semicolon.

Check

Show answer

Feedback?
Outputting multiple items with one statement
Programmers commonly use a single output statement for each line of output by combining the outputting of text, variable values, and a new line. The programmer simply separates the items with a + symbol. Such combining can improve program readability because the program's code corresponds more closely to the program's output.

Figure 1.2.3: Outputting multiple items using one output statement.
public class Salary {
   public static void main (String [] args) {
      int wage;

      wage = 20;

      System.out.println("Wage is: " + wage); 
      System.out.println("Goodbye."); 
   }
}
Wage is: 20
Goodbye.

Feedback?
zyDE 1.2.3: Single output statement.
Modify the program to use only two output statements, one for each output sentence.

 
In 2014, the driving age is 18. 
10 states have exceptions.

Do not type numbers directly in the output statements; use the variables. ADVICE: Make incremental changes—Change one code line, run and check, change another code line, run and check, repeat. Don't try to change everything at once.

Load default template...
  

Run

Feedback?
PARTICIPATION ACTIVITY
1.2.10: Basic output.
Indicate the actual output of each statement. Assume userAge is 22.

1)
System.out.print("You're " + userAge + " years.");
2)
System.out.print(userAge + "years is good.");

Feedback?
PARTICIPATION ACTIVITY
1.2.11: Output simulator.
The tool below supports a subset of Java, allowing for experimenting with System.out.print statements. The activity is marked as complete upon interacting with the tool.

The following variable has already been declared and assigned: countryPopulation  = 1344130000;. Using that variable (do not type the large number) along with text, finish the output statement to output the following:

China's population was 1344130000 in 2011.


Then, try some variations, like:

1344130000 is the population. 1344130000 is a lot.
System.out.print(
"Change this string!"
);
Change this string! 

Feedback?
CHALLENGE ACTIVITY
1.2.1: Enter the output.
486990.3402974.qx3zqy7
Type the program's output

public class GeneralOutput {
   public static void main (String [] args) {
      System.out.print("Ron is nice.");
   }
}	
Ron is nice.
1
2
3
4
5
1
2
3
4
5

Feedback?
CHALLENGE ACTIVITY
1.2.2: Output basics.
486990.3402974.qx3zqy7

Start
This challenge activity consists of a series of auto-generated, randomized questions allowing unlimited submissions. You must correctly answer a question at each level before proceeding to the next level. The purpose of this first level is to familiarize yourself with how the autograder works.

Click the "Start" button to begin the challenge activity.
Copy the code provided and paste the code into the code window. The following code outputs the string literal "This soup was excellent." followed by a newline.
System.out.println("This soup was excellent.");

Click the "Check" button to run your program. Our autograder automatically runs your program several times, testing different input values each time to ensure your program works for any values. An explanation is also provided.

1

2

3

4

5

6

Check

Next level
1
2
3
4
5
6

Feedback?
CHALLENGE ACTIVITY
1.2.3: Read multiple user inputs.
Write two scnr.nextInt statements to get input values into birthMonth and birthYear. Then write a statement to output the month, a slash, and the year. End with newline.

Ex: If the input is 1 2000, the output is:
1/2000

See How to Use zyBooks for info on how our automated program grader works.

486990.3402974.qx3zqy7
1 test passed
All tests passed

Run

Feedback?
A new output line can also be produced by inserting \n, known as a newline character, within a string literal. Ex: Outputting "1\n2\n3" outputs each number on its own output line. \n consists of two characters, \ and n, but together are considered as one newline character. Good practice is to use println to output a newline when possible, as println has some technical advantages not mentioned here.
