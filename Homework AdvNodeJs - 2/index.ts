console.log("Homework - 2");

enum Gender {
  Male = "male",
  Female = "female",
}

interface Person {
  name: string;
  age: number;
  gender: Gender;
}

const filterByProperty = (
  people: Person[],
  property: string,
  value: string | number
): Person[] => {
  return people.filter((person) => person[property] === value);
};

const personJohn: Person = {
  name: "John Doe",
  age: 24,
  gender: Gender.Male,
};

const personEmma: Person = {
  name: "Emma Raducanu",
  age: 20,
  gender: Gender.Female,
};

const personLeBron: Person = {
  name: "LeBron James",
  age: 38,
  gender: Gender.Male,
};

console.log(
  filterByProperty([personJohn, personEmma, personLeBron], "gender", "male")
);

console.log(
  filterByProperty([personJohn, personEmma, personLeBron], "age", 20)
);
