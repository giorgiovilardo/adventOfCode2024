# Advent of code 2024

## Intro

Holy crap TS needs tons of boilerplate for setup.

The IDE experience with WebStorm is topnotch but not sure if it's worth.

## Day 1

Easy day, but I totally miss more advanced methods on collection.

## Day 2

First one really easy; part 2 I just brute-forced and had no time to clean up.

## Day 3

Part one: pretty easy with regexes, I wonder if a parser combinator/ast parser would have been easier

An easy command parser can be extracted to fix part one and part two and do everything with one pass.

## Day 4

Spent more time trying to write transpose methods than real business logic,
and since i suck at algos I used chat gpt for the diagonal one, and it delivered.
Thanks new AI overlords!

Part 2 I was really stuck until I realized I had the wrong windowing -_-
`for` cycles with indexes are really hard for me to grasp for some reason...

## Day 5

Ez part 1

Tough part 2

look at: topological sort, and before/after data structure

## Day 6

I love toy problems in OOP, it takes a lot of time but the
satisfaction of doing new thing -> do thing -> do thing -> result is amazing.
This would have been fun also in a recursive "state of the world" functional style.
SCALA I MISS YOU

I was bitten hard by reference equality of TS, as I put objects into a Set thinking
it would compare hash of the sets for equalities :\ I think this is default in Py...
