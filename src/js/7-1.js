// This example is from JavaScript: The Definitive Guide, 3rd Edition.
// That book and this example were Written by David Flanagan.
// They are Copyright (c) 1996, 1997, 1998 O'Reilly & Associates.
// This example is provided WITHOUT WARRANTY either expressed or implied.
// You may study, use, modify, and distribute it for any purpose,
// as long as this notice is retained.

// A short-cut function, sometimes useful instead of document.write()
// This function has no return statement, so it returns no value.
function print(msg)
{
    document.write(msg, "<BR>");
}

// A function that computes and returns the distance between two points
function distance(x1, y1, x2, y2)
{
    var dx = x2 - x1;
    var dy = y2 - y1;
    return Math.sqrt(dx*dx + dy*dy);
}

// A recursive function (one that calls itself) that computes factorials
// Recall that x! is the product of x and all positive integers less than it.
function factorial(x)
{
    if (x <= 1)
        return 1;
    return x * factorial(x-1);
}
