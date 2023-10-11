---
Node version: V18.17.0
NPM version: 9.8.1
---

# **To DPG**

When I received this exercise, I had only just done the same refactoring coding kata 1-2 months ago for Axxes.
I assumed that you would be most interested in the commit history and my thought process when making the exercice, and not the actual solution. So I provived you with an alternative repository with a slightly altered version of the Gilded Rose kata (with slightly different names for the items), assuming that you would be more interested in the code quality / the different steps taken to achieve the final solution.

You can still find this code at https://github.com/MichielTondeur/gilded-tros/blob/master/TypeScript/src/solution1/gilded-tros.ts

Apparently to satisfy your test cases, you needed the solution to 100% match the initial requirements.
This is a very valid reason, so I created this repo to make sure the code follows the names etc...

Below you can still see some of my comments when I was making the exercice for Axxes, which still apply to this code.
But again, with slightly different names.

---

# I'll try to keep track of my thought process in this file.

## 07/08/2023 - 20:00

Got the project setup after messing around a bit with Github and my WSL setup.

## 07/08/2023 - 20:05

First step was getting my extensions working, including Prettier which was my first 'real' change.

## 07/08/2023 - 20:05

Looking at the exercise, it's clear we need to do some reverse TDD approach here.
The code exist, but not tests.
Before we can start refactoring, let's first get some working tests running so we can refactor with confidence.

## 07/08/2023 - 20:20

Made a very rough working test, just matching names.
Would like to use jest.each, but not sure how to do this with classes, I mostly write functional.
Added jest `describe` and `test` blocks since the test were complaining.
Added `@babel/preset-env` to dev dependencies since the tests were complaining.

## 07/08/2023 - 20:32

Focus on getting `Good Wine` tests working first.
Still not too happy with the current structure, need a proper way to group items and expected resulsts together.
Not sure if I will need to test the sellIn date at some point as well.

## 07/08/2023 - 20:36

Take `Can't be more than 50` condition into consideration.
Also noting here for context I'm running jest watch mode to quickly iterate over my tests.

## 07/08/2023 - 20:44

Add commonItems test case
Group the items together in their own array for now, still not great since the results are not grouped together with the actual test case.

## 07/08/2023 - 20:44

Add keyChain test case
I need to check the sell date doesn't lower for the Keychain, so I need to add this field in my expect somehow.
I'll spend some time finding a proper solution to group everything properly, since my current approach won't continue to work.

## 07/08/2023 - 21:25

Grouped the tests a bit better so I'm able to match the testcases with the expected results.
Still messy imho but for now it works.
I'm now able to also check for the updated sellIn field.
When adding some other tests, saw some tests failing already, where `sellIn` date could become `-1`.
While I want to avoid working on the actual implementation code, I needed to add a `not smaller than 0` check for the tests to run succesfully again.
Let's hope I don't encounter more of these until after all tests have been written.

## 07/08/2023 - 21:57

Reversed the `sellIn` date 0 check since that date could actualy become negative upon rereading the assignment.
Added all tests for the backstage passes, had to make small changes to the actual implementation so it could take the HAXX conference into account.
This time I'm pretty sure if was needed and the logic was faulty.

## 07/08/2023 - 22:07

Added the smelly test cases.
The tests are failing, as to be expected since this code is not implemented yet.
Will continue tomorrow.

---

## 08/08/2023 - 19:24

Resumed work.
Tests are written so I'll commence refactoring.
Clearest solution seems like a switch case, since it makes sense every single item has it's own logic.
I'll try extracting the first case, maybe backstage passes.

## 08/08/2023 - 19:30

Turn off smelly test cases for now.
Extract old updateDetails to it's own separate method and have it be the default switch case.
Test still run fine.

## 08/08/2023 - 19:49

Good wine logic extracted.
Created a private updateWine method.
Logic inside maybe could be it's own small mini method?
Let's extract the rest first and let's see which operations are common enough.
I'm not allowed to edit Item, but a decreaseQuality and decreaseSellIn could make sense to add there.
I might just do it still.

## 08/08/2023 - 19:54

Easy extraction of KeyChain logic

## 08/08/2023 - 20:14

Extracted the Backstage Pass logic.
I had to change my switch case to be a boolean that checks the name matches a certain condition.
I needed this to use a regex to match all strings matching `Backstage Passes`.
Old logic is pretty much cleaned up and only still has the default common item cases.

## 08/08/2023 - 20:20

Extracted the common item default logic.
Next up is cleaning up the code some more.

## 08/08/2023 - 20:25

Small update to clean up some conditions.
Could still be smaller or needs some JSdocs to explain properly, this is some code you don't get at first sight if you were to repeat it in x amount of time.

## 08/08/2023 - 20:30

Use cleaner for loop

## 08/08/2023 - 20:37

Added some basic operations to Item to manipulate the quality and sellIn.
I allowed the methods to take in a number to potentialy increase/decrease with even bigger increments.

## 08/08/2023 - 20:47

Brought back smelly test cases.
Added logic for the smelly items.

## 08/08/2023 - 20:49

Taking a break, might revisit code some more or the tests, since I'm not too happy about those.

---

## 09/08/2023 - 18:09

Resumed work.

## 09/08/2023 - 18:42

Moved some magic variables to constants.
Used `as const` together with `satisfies` to keep the actual values of the constants.
Moved to a regex constructor for the backstage passes.

## 09/08/2023 - 18:58

Contemplated adding JS Doc to the methods but I feel like they speak for themselves.
Changed some of the descriptions of the test cases.

## 09/08/2023 - 19:20

Wrapping up.
Played around a bit and removed the babel preset, should not be necessary for this exercise.
Made some changes so the build output tests don't run.
Should probably stop them from getting included in the build in the first place, but don't feel like doing this rn.
This is my final commit, thanks for following!

---

## 09/08/2023 - 01:08

All the old code / the first solution can be found in the solution1 folder.

Revisited the code and made a second solution, one that violates the initial requirements for this exercise.
I basically tried to lean in as much as I could into inheritance and made some new classes that extend the base Item class.
In this way, I was able to extract a lot more logic into the actual classes, and I just have to call an update method, not really caring about what happens behind the scenes, so proper decoupling.
While I came to a nice solution, I really don't like inheritance and I would favor composition almost any day of the week.
What if you suddenly need an item that only has quality but no sellIn property?
Or classes inheriting classes inheriting classes inheriting classes inheriting ...

I just coded without commiting since this was extra, but a couple of notable things in this change are:

- `as const satisfies`
- a prefixed string type for the backstage passes, which restrict other string to be used that don't begin with `Backstage passes`
- type predicates to narrow the `AllItems` type in the update if conditions
- a neat trick to get all possible names of the `SmellyItems` using keyof and typeof
- constructors with default values
- a barrel file that exposes all CONSTANTS and class types to clean up the imports

The code is currently not working properly, as their is a small part I don't know how to fix just yet, being the default case at the end of all the if conditions inside of `updateQuality`.
The last possible case is a commonItem, but the type of the item is still `AllItems`.
For me this is a discriminated union type, so it should figure it out that this is the last possible case.
But there is something stopping it from infering the correct types, which is why I fell back to the type predicates.
However this does mean my last condition is currently not correctly typed.

To get rid of the AllItems, I tried the following:

```typescript
// ugly hack, not sure how to handle this last case
const commonItem = item as CommonItem;
commonItem.update();
```

While typescript is no longer yelling at me, the tests fail to run as of now, claiming that `commonItem.update() is not a function`.
I'll try to figure out a solution tomorrow.

---

## 10/08/2023 - 21:00 - 21:11

Altered my if conditions to if else, so I get proper type narrowing.
Except that it was failing on KeyChainItem and for some reason was not figuring out the correct type.
As a solution, I had to add some random method to the KeyChain class which I think makes it unique compared to CommonItem?
It's a hack and a proper solution should be found, maybe not using the classes as types but adding a custom type / interface and use that one?
This is the last commit

---
