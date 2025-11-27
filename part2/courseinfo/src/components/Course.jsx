const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total
        total={
          course.parts.map(part => part.exercises).reduce((sum, num) => sum + num, 0)
        }
      />
    </div>
  )
}

const Header = (props) => <h1>{props.course}</h1>

const Content = ({ parts }) => (
  <div>
    {parts.map(part => <Part key={part.id} part={part} />)}
  </div>
)

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = (props) => <p><b>Number of exercises {props.total}</b></p>

export default Course