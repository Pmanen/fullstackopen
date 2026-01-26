interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescribed extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDescribed {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartDescribed {
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartSpecial extends CoursePartDescribed {
  kind: "special";
  requirements: string[];
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ( { courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <>
      {courseParts.map(part => {
        switch (part.kind) {
          case "basic":
            return (
              <div key={part.name}>
                <p>{part.name} {part.exerciseCount}</p>
                <p>{part.description}</p>
              </div>
            );
          case "group":
            return (
              <div key={part.name}>
                <p>{part.name} {part.exerciseCount} with {part.groupProjectCount} group projects</p>
              </div>
            );
          case "background":
            return (
              <div key={part.name}>
                <p>{part.name} {part.exerciseCount}</p>
                <p>{part.description}</p>
                <p>background material: {part.backgroundMaterial}</p>
              </div>
            );
          case "special":
            return (
              <div key={part.name}>
                <p>{part.name} {part.exerciseCount}</p>
                <p>{part.description}</p>
                <p>requirements: {part.requirements.join(", ")}</p>
              </div>
            )
          default:
            return assertNever(part);
        }
      })}
    </>
  );
}

export default Part;