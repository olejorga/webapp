import { Students, Student } from "../types";

const classes = [{id: 1, subject: "informasjonssystemer"}, {id: 2, subject: "Informatikk"}, {id: 3, subject: "Digitale medier og design"}]

const StudentTable = (students: Student[])  => {
    const studentList = Object.values(students)
    return (
        <>
        {classes.map(({id, subject}) => (
            <div key={id}>
            <h1 >{subject}</h1>
            <ul className="studentTable">
            {studentList.map(({id, name, gender, age, group}: Student) => (
                <li key={id}>
                    <span id="id">{id}</span>
                    <span id="name">{name}</span>
                    <span id="gender">{gender}</span>
                    <span id="age">{age}</span>
                    <span id="group">{group}</span>
                </li>
            ))}
        </ul>
        </div>
       ))}
        </>
    )
}

export default StudentTable

// .filter((student) => {student.group == subject})