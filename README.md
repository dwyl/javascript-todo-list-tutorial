# Learn Elm Architecture in _Plain_ JavaScript

Learn how to build web applications using
the Elm ("Model Update View") Architecture in "_plain_" JavaScript.

> We think Elm is the _future_ of Front End Web Development <br />
for all the reasons described in:
[github.com/dwyl/**learn-elm#why**](https://github.com/dwyl/learn-elm#why) <br />
However we _acknowledge_ that Elm is _not_ for _everyone_! <br />
This step-by-step tutorial is a _gentle_ introduction to
the Elm Architecture, <br />
for people who write JavaScript and want an elegant, efficient
and fast <br />
way of organizing their JavaScript without
having the learning curve <br />
of a completely new (_functional_) programming language!


## _Why?_

![simple-life](https://cloud.githubusercontent.com/assets/194400/25773897/ea0c11fa-327d-11e7-86e0-7d8721c2d7ea.png)

_Organizing_ `code` in a Web (_or Mobile_) Application
is _really easy_ to ***over-complicate***, <br />
_especially_ when you are just starting out and there
are dozens of competing ideas <br />
all claiming to be the "_right way_".

When we encounter this type of "_what is the **right way**_?"
question <br />
we always follow [***Occam's Razor***](https://en.wikipedia.org/wiki/Occam%27s_razor) and _ask_:
what is the ***simplest way***? <br />
And to _that_ question the ***answer*** is:
the "**Elm (MUV) _Architecture_**".


When compared to _other_ ways of organizing your code,
"MUV" has the following benefits:
+ There's **no** "***middle man***" to complicate things
(_the way there is in the
[Model-view-Presenter](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93presenter) architecture..._)
+ _Much_ Lower Overhead when compared to implementing "Model-View-ViewModel" (MVVM) is "overkill" for simple UI operations.
+ Easier to _understand_ what is going on in more advanced apps
because the "_flow_" is always the same.


### _Flattening_ the Learning Curve

The issue of the "Elm Learning Curve" was raised in:
[github.com/dwyl/**learn-elm**/issues/**45**](https://github.com/dwyl/learn-elm/issues/45) <br />
and scrolling down to to @lucymonie's [list](https://github.com/dwyl/learn-elm/issues/45#issuecomment-275947200) we see the **Elm _Architecture_** at number four ... <br />
`this` seems fairly logical (_initially_) because the _Elm **Guide**_
uses the _Elm **Language**_ to explain the _Elm **Architecture**_: https://guide.elm-lang.org/architecture
![elm-architecture](https://cloud.githubusercontent.com/assets/194400/25771470/72eccdd6-324a-11e7-8723-f07bcc188c21.png)

i.e. it ***assumes*** that people **already _understand_** the (Core) _Elm **Language**_... <br />
This is a _fair_ assumption given the _ordering_ of the Guide _however_
... we have a _different_ idea:

#### Hypothesis: Learn (& Practice) Elm Architecture `before` Learning Elm?

We ***hypothesize*** that if we _**explain** the **Elm Architecture**_
(_**in detail**_) using a **language** <br />
people are _**already familiar**_ with (_i.e **JavaScript**_)
`before` diving into the Elm Language <br />
it will ["flatten"](https://english.stackexchange.com/questions/6212/whats-the-opposite-for-steep-learning-curve)
the learning curve.

> _**Note**: Understanding the **Elm Architecture**
will give you a **massive headstart** <br />
on [learning **Redux**](https://github.com/dwyl/learn-redux)
which is the "de facto" way of structuring React.js Apps. <br />
So even if you
decide not to learn/use Elm, you will still gain
**great frontend skills**!_

## _What?_

![image](https://cloud.githubusercontent.com/assets/194400/25772120/3fa2492c-325b-11e7-9aee-90b059360c14.png)

### A _Complete Beginner's_ Guide to "MUV"

Start with a few definitions:

+ **M**odel - or "data model" is the place where all data is often referred to as the application's `state`
+ **U**pdate - how your app handles `actions` performed by people and `update` the `state` of your.
+ **V**iew - what the people using your app can see; a way to `view` your state as `HTML`

![elm-muv-architecture-diagram](https://cloud.githubusercontent.com/assets/194400/25773775/b6a4b850-327b-11e7-9857-79b6972b49c3.png)




## _Who? (Should I Read/Learn This...?)_

Anyone who knows a _little_ bit of JavaScript
and wants to learn how to organize/structure
their code in the most _sane_ and easy to understand way.

### Pre-requisites?

+ _Basic_ JavaScript Knowledge.
see: https://github.com/iteles/Javascript-the-Good-Parts-notes
+ A computer
+ 30 minutes.

> No other knowledge is assumed or implied.
If you have **_any_ questions**, ***please ask***:


## _How?_

![all-you-need-is-less](https://cloud.githubusercontent.com/assets/194400/25772135/a4230490-325b-11e7-9f12-da19fa4eb5e9.png)

#### 1. Clone this Repository

```sh
git clone https://github.com/dwyl/learn-elm-architecture-in-plain-javascript.git && learn-elm-architecture-in-plain-javascript
```

#### 2. Open one of the Example `.html` files in your Web Browser

e.g: `examples/01-counter-basic.html`:

![image](https://cloud.githubusercontent.com/assets/194400/25774194/cebab492-3282-11e7-813c-6f504def949e.png)

Try clicking on the buttons to increase/decrease the counter

#### 3. Edit Some Code!

In your Text Editor / IDE of choice,
edit one of the _value_ of the model (_e.g: initialize it to 9_):

![update-value-of-model](https://cloud.githubusercontent.com/assets/194400/25774210/111bdb2c-3283-11e7-9d9f-b54896056736.png)

#### 4. Refresh the Web Browser

When you refresh the your Web Browser you will see
that the "_initial state_" is now **9**:

![image](https://cloud.githubusercontent.com/assets/194400/25774222/61cc2cac-3283-11e7-8a72-31bc8fd541f4.png)

#### 5. Read Through the Code in the Example

> We have attempted to make the code & comments as legible as possible,
please inform us if anything is unclear!


#### Optional: Install "Live Server" for "_Live Reloading_"

If you prefer not to have to _manually_ refresh the page each time,
simply run the following command:

```
npm install && npm start
```
This will download the dependency on `live-server`
which will auto-open your `default` browser:

![elm-arch-live-server](https://cloud.githubusercontent.com/assets/194400/25774279/569848d8-3284-11e7-9861-b401e13a89e0.png)


e.g: http://127.0.0.1:8000/examples/01-counter-basic.html



<br /> <br />

## Futher/Background Reading

+ What does it mean when something is "_easy to **reason about**_"? http://stackoverflow.com/questions/18666821/what-does-the-term-reason-about-mean-in-computer-science


<br /> <br /><br /> <br /><br /> <br /><br /> <br /><br /> <br /><br /> <br />
# tl;dr


### What is "_Plain_" JavaScript?

"_Plain_" JavaScript just means not using _any_ frameworks
or features that require "compilation".

The point is to _understand_ that you don't need
_anything_ more than
["***JavaScript the Good Parts***"](https://github.com/iteles/Javascript-the-Good-Parts-notes) <br />
to build something full-featured and easy/fast to read!!

[![babel](https://cloud.githubusercontent.com/assets/194400/25772913/72a818f4-326c-11e7-8020-9b5dab715987.png)](https://twitter.com/iamdevloper/status/787969734918668289 "Babel, how to show off that you don't have core ES5 skills.")

If you can build with "ES5" JavaScript: <br />
a) you side-step the
[_noise_](https://twitter.com/iamdevloper/status/610191865216786432)
and focus on core skills that _already_ work everywhere! <br />
b) you don't need to waste time installing
[_**Two Hundred Megabytes**_](https://cloud.githubusercontent.com/assets/194400/13321493/39fcfa30-dbc7-11e5-8b05-f046675f9cb6.png)
of dependencies just to run a simple project! <br />
c) You ***save time*** (_for yourself, your team and end-users!_)
because your code is _already_ optimized to run in _any_ browser!

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

+ https://en.wikipedia.org/wiki/Software_architect
+ https://en.wikipedia.org/wiki/Architectural_pattern

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

#### Are you _Really_ an "Architect" _or_ did you just draw a few "Boxes and Arrows"?

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
