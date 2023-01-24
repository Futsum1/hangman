class Person {
    constructor(firstName, lastName) {
      this.firstName = firstName;
      this.lastName = lastName;
    }
    sayHello() {
      console.log(`Hello, I am ${this.firstName} ${this.lastName}`);
    }
  }
  let me = new Person("James", "Garcia")
  console.log(me.sayHello());
  console.log(me.firstNames);
  console.log(me.lastName);
  class Employee extends Person {
    constructor(firstName, lastName, company, wage) {
      super(firstName, lastName)
      this.company = company;
      this.wage = wage;
      this.active = true;
    }
    receiveRaise(newWage) {
      this.wage = newWage;
      console.log(`Your wage is now ${this.wage}`);
    }
    terminate() {
      this.active = false;
      console.log("you have been fired");
    }
  }
  class Manger extends Employee {
    constructor(firstName, lastName, company, wage, department) {
      super(firstName, lastName, company, wage)
      this.department = department;
    }
    giveRaise(employee, newWage){
      employee.receivedRaise(newWage);
    }
  }
  let john = new Employee("John", "Doe", "Google", 1000000)
  let tim =new Manager("Tim", "Jefferson", "Google", 500000, "Engineering");
  tim.giveRaise(john, 400000);
  // console.log(john, "Before");
  // console.log(john, "Starting");
  // john.receiveRaise(2000000);
  // console.log(john, "After")
