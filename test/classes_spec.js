describe("Classes", function () {

    var Pet;

    beforeEach(function () {
        Pet = Classes.create
        ({
            fields: ['kind', 'age', 'name'],
            methods: {
                growUp: function() {
                    this.age(this.age() + 1);
                },

                changeNameAndAge: function(name, age) {
                    this.name(name);
                    this.age(age);
                },

                growUpTwice: function() {
                    this.growUp();
                    this.growUp();
                }
            }
        });
    });

    describe('contructing a new object', function () {

        it("should assign getters and setters + correctly work with constructor", function () {

            var tom = Pet.create({kind: 'Cat', age: 2, name: 'Tom'});

            expect(tom._class).toBe(Pet);

            expect(tom.kind()).toBe('Cat');
            expect(tom.age()).toBe(2);
            expect(tom.name()).toBe('Tom');

            tom.age(23);
            expect(tom.age()).toBe(23);

        });

        it('should correctly call methods', function() {
            var tom = Pet.create({kind: 'Cat', name: 'Tom', age: 1});

            expect(tom.age()).toBe(1);
            tom.growUp();
            expect(tom.age()).toBe(2);
            tom.changeNameAndAge('Kitty', 3);
            expect(tom.name()).toBe('Kitty');
            expect(tom.age()).toBe(3);

        });

        xit('should reject assigning not defined properties', function() {
            // todo: pending
        });

    });

    describe('extending a class', function() {

        it('should extend a class', function() {

            var HomyPet = Pet.extend({
                fields: ['address']
            });

            var tom = HomyPet.create({kind: 'Cat', age: 2, name: 'Tom', address: 'New-York'});

            expect(tom._class).toBe(HomyPet);

            expect(tom.kind()).toBe('Cat');
            expect(tom.age()).toBe(2);
            expect(tom.name()).toBe('Tom');
            expect(tom.address()).toBe('New-York');

        });

    });

    describe('overriding a method', function() {
        it('that was used by another one', function() {

            var tom = Pet.create({kind: 'Cat', name: 'Tom', age: 1});
            expect(tom.age()).toBe(1);
            tom.growUpTwice();
            expect(tom.age()).toBe(3);

            var PetOverrided = Pet.extend({
                methods: {
                    growUp: function() {
                        this.age(this.age() + 2);
                    }
                }
            });

            var pet = PetOverrided.create({kind: 'Cat', name: 'Tom', age: 1});
            expect(pet.age()).toBe(1);
            pet.growUpTwice();
            expect(pet.age()).toBe(5);

        });


    });


});