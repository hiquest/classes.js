classes.js
==========

Basic implementation of classes in JavaScript. Just for educational reason.

Overview
----------
Everyone knows that we don't have classes in JavaScripts. But that doesn't mean that we can't emulate them (even though this is a very dubious feature). 

This is a really simple solution not envolving prototypes (sadly, right?). You can create classes, you can construct objects, and you can extend classes overwriting attributes and methods.

``` JavaScript
   var PetClass = Classes.create({
      fields: ['age', 'name'],
      methods: { 
         growUp: function() {
            this.age(this.age() + 1);   
         }   
      }
   });
   
   var tom = PetClass.create({name: 'Tom', age: 1});
   tom.age(); // 1
   tom.growUp();
   tom.age(); // 2
   
   var Elephant = PetClass.extend({...}); // and so on; you get the point
```


In plans: 

 - types checkings (do we really need this?) 
 - abstract classes (you can't initiate an object unless you extend and implements abstract methods)
 - private and protected methods (you are smart, aren't you?)
 - mixins (oh no, please don't)
 - java-like interfaces (kill me)
