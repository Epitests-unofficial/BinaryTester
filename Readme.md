# BinaryTester

What if you can test every single program you make, test Stdout, test Stderr and Status code of all your program in any language you want !

It's just what BinaryTester do !

### Requirements

You must have nodejs and npm installed
It Works only on linux

### Examples

1. For this example, I choose to test echo command, I think this command is safe but anyway we test it....

   First I need to write a file (in yaml or json) to design my tests

   ```yaml
   Tests:
     -
       name: "echo"
       description: "Echo Test, this is an example"
       command: "echo 'This is an example'"
       testType: "refer"
       referCommand: "echo 'This is an example'"
   ```

   Here I check if ```echo 'This is an example'``` is the same as ```echo 'This is an example'``` I think it is but let's check...

   So let's run our favourite BinaryTester -> ```./binaryTester example/ootb.yaml```

   Out :

   ```
   Starting Tests...

   Test 1: echo...         OK

   Tests Results
   ->      Success: 1      Fail: 0         Skipped: 0      <-
   ```

   Okay the echo command is the same that.... the echo command !

### Test by yourself

1. Clone this repo
2. Run ```npm run build``` to build package locally
3. Then you can test it in the current directory with ```./bin/cli```
4. Help with ```binaryTester -h```
5. Example of tests files in [Examples](https://github.com/Epitests-unofficial/BinaryTester/tree/main/example)
6. Run ```npm run installPack``` to install package globally
   Then you have ```binaryTester``` globally in any directory you want
