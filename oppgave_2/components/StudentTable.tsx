import { Students, Student } from "../types";


const StudentTable = (props: {students: Student[], filterMethod: string | undefined})  => {
    return (
        <ul>
            {props.students.filter(({group}) => { 
                if(!props.filterMethod) return true
                return group == props.filterMethod
                }).map(({id, name, gender, age, group}: Student) => (
                <li key={id}>
                    <span id="id">{id}</span>
                    <span id="name">{name}</span>
                    <span id="gender">{gender}</span>
                    <span id="age">{age}</span>
                    <span id="group">{group}</span>
                </li>
            ))}
        </ul>
    )
}

export default StudentTable

// .filter((student) => {student.group == subject})