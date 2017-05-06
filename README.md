# Learn ElmArchitecture in _Plain_ JavaScript

Learn how to build web applications using
the Elm ("Model Update View") Architecture in "_plain_" JavaScript.

## _Why?_

Organizing code in a web application
is _easy_ to _over-complicate_, <br />
_especially_ when you are just starting out and there
are dozens <br />
of competing ideas all claiming to be the "_right way_".

When we encounter this type of "_what is the **right way**_?"
question <br />
we always follow [***Occam's Razor***](https://en.wikipedia.org/wiki/Occam%27s_razor) and _ask_:
what is the _simplest way_? <br />
And to _that_ question the answer is: the "**Elm _Architecture_**".



When compared to _other_ ways of organising your code, "MUV"
+ There's **no** "***middle man***" to complicate things
(_the way there is in the
[Model-view-Presenter](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93presenter) architecture..._)
+ _Much_ Lower Overhead when compared to implementing MVVM is "overkill" for simple UI operations





## _What?_

### A _Complete Beginner's_ Guide to the "MUV" Pattern




### _Flattening_ the Learning Curve

The issue of the "Elm Learning Curve" was raised in:
[github.com/dwyl/**learn-elm**/issues/**45**](https://github.com/dwyl/learn-elm/issues/45) <br />
and scrolling down to to @lucymonie's [list](https://github.com/dwyl/learn-elm/issues/45#issuecomment-275947200) we see the **Elm _Architecture_** at number four ... <br />
`this` seems fairly logical (_initially_) because the _Elm **Guide**_
uses the _Elm **Language**_ to explain the _Elm **Architecture**_: https://guide.elm-lang.org/architecture
![elm-architecture](https://cloud.githubusercontent.com/assets/194400/25771470/72eccdd6-324a-11e7-8723-f07bcc188c21.png)

i.e. it ***assumes*** that people **already _understand_** the (Core) _Elm **Language**_...
This is a _fair_ assumption given the ordering of the Guide _however_...

### Hypothesis

I ***hypothesize*** that if we _**explain** the **Elm Architecture**_ (_**in** a bit more **detail**_)
using a **language** people are _**already familiar**_ with (_i.e **JavaScript**_) `before` diving into the Elm Language it will ["flatten"](https://english.stackexchange.com/questions/6212/whats-the-opposite-for-steep-learning-curve) the learning curve.

### What is "_Plain_" JavaScript?



## _Who? (Should I Read/Learn This...?)_

Anyone who knows a _little_ bit of JavaScript
and wants to learn how to organize/structure
their code in the most _sane_ and easy to understand way.

## _How?_

### Pre-requisites?


## Futher/Backtround Reading

+ What does it mean when something is "_easy to **reason about**_"? http://stackoverflow.com/questions/18666821/what-does-the-term-reason-about-mean-in-computer-science


<br /> <br /><br /> <br /><br /> <br /><br /> <br /><br /> <br /><br /> <br />
# tl;dr

## "_Rant_" about Architecture and "_Software Architects_"!


![architecture definition](https://cloud.githubusercontent.com/assets/194400/25768938/eebf2318-3205-11e7-90a4-14bd55632818.png)

This is a _clear_ definition for a word
that has existed for _hundreds_ of years! <br />
Everyone on the street _understands_ the word
"Architect" and if you were to <br />
ask someone "_when would you hire an Architect_"
**99%** of people would <br /> _still_ say:
"_To design, plan and oversee construction of a Building._" <br />

It's only in the last couple of decades that
a new type of person has started referring<br />
to themself as "***Software Architect***" ...
https://en.wikipedia.org/wiki/Software_architect

> The _widespread addoption_ of this term
in the Technology industry <br />
_might_ have something to do with
[Bill Gates](https://en.wikipedia.org/wiki/Bill_Gates)
re-branding himself as <br />
"***Chief Software Architect***" in 2000 ... when he stepped down <br />
from his role as "CEO" ... (_which lead to
["**Microsoft's Lost Decade**"](http://www.vanityfair.com/news/business/2012/08/microsoft-lost-mojo-steve-ballmer) ..._)<br />
Who _doesn't_ want to _associate_ themself with the _most successful_ <br />
software developer in the world...?

## Designing Software/Systems _Can_ be _Difficult_

I _acknowledge_ that the ***Design*** of a **Software System**
_can_ be an ***immensely complex*** thing <br />
requiring many years of practice/experience.
In _some_ cases the Design of a Software System <br />
_can_ even be more complex than a house.

> _**Most** of the time **systems don't need** to be **complex**, <br />
they are made that way by **people** who are too **lazy** to simplify <br />
or worse they are deliberately complicated in order to <br />
**justify higher compenation**!
That is a different topic <br /> involving
[Parkinson's Law](https://en.wikipedia.org/wiki/Parkinson%27s_law) ...!
For now let's just focus on <br />
the name/word "Architect" and it's misappropriation._

#### Are you _Really_ an "Architect" or did you just draw a few "Boxes and Arrows"?

It _annoys_ me when people refer to themselves as an
["_Architect_"](https://en.wikipedia.org/wiki/Architect)
when they did not _study_
[***Architecture***](https://en.wikipedia.org/wiki/Architecture)!

The software industry has _appropriated_ a word that had
a _clear_ meaning that _everyone_ understood <br />
and applied it to mean the design of software systems ...
I _cannot_ help but think this is a case of <br />
["_Uptitling_"](https://www.collinsdictionary.com/dictionary/english/uptitling)
whereby people give themselves a "_fancy-sounding_" title
to inflate their importance <br />
(_and thus justify getting paid more!_) ...
"***Software System Designer***" (_while way more accurate_) <br />
does not sound anywhere near as _important_!

## The _Difficult_ Part in Building Software

I _especially_ detest when people calling themselves "Architect"
feel (_convince themself_) <br />
that drawing a "Network Topology", "Infrastructure Diagram"
or "Application Model" <br />
is the "difficult part" in the process of of building software,
and that the rest is "detail" <br />
they don't need to be _involved_ in.

> _This is akin to a [male](https://en.wikipedia.org/wiki/Male) thinking
that aiding in **conception** is <br />
the **most difficult part** in **raising**
a **human child**. <br />
And once he has
done "**his bit**" **the rest** is "**easy**"_.

The _real_ difficulty in building digital products & services  <br />
is not the order the pieces of the puzzle fit together, rather it's <br />
the _picture_ end-users see (_and use_)
once the application is _complete_.

User Interface / User Experiene is at least **10x More important**
than "Architecture". <br />
The _user_ of your system, **does _not_ care**
or even _want_ to understand how the App Works! <br />
They care that it solves _their_ problem,
works as expected and looks nice while they are using it.

## Do We _Need_ "Software Architects"?

The answer to this question depends on a number of factors. <br />
+ Is there an _existing_ ("_legacy_") system being replaced?
+ Can we use a "_Backend-as-a-Service_" ("_BaaS_") provider like Firebase?
+ What is the _expected usage volume_ and do we need to "_build for scale_" now?

In _most_ cases a software project just needs
smart/experienced people building it. <br />
Those smart people can make their own informed decisions
on ["Technology Stack"](https://github.com/dwyl/technology-stack) <br />
based on the _practicality_ of the components;
_not how many buzzwords they can fit <br />
on a PowerPoint slide to impress (other) "Architects"!_

Focus on User Experience and making something lightweight <br />
that can be iterated
and integrate user feedback as fast as possible.

All decisions should be in aid of this ***user-focussed goal***. <br />
If a "Serverless Microservice Architcture" will ensure the <br />
application performs the best it can for the first 10 users, <br />
then _maybe_ the complexity is _justifiable_ ...


## _Conclusion_

Maybe the only way to "_beat_" this,
is for _everyone_ to call themselves an "Architect: ...? <br />
Well, now that you _know_ how to use the Elm Architecture,
you should update your <br />
LinkedIn Profile/Title to reflect this?
e.g: "_Full-Stack Solution Architect_" (_or similar BS_)<br />
And why not throw in the word "_Head_" or "_Chief_" for good measure? <br />
Even if you are in a team of _one_ person, you're still the _Head_ right? <br />
Anyway, back to the "_boring_" part of
actually _making_ things people _love_ using.
