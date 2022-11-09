import { Students, Student } from "../types";


export default function StudentTable(studentList: Student[]) {

    return (
        <>
            {studentList.map(({id, name, gender, age, group}) => (
                <div key={id}>
                <span id="id">{id}</span>
                <span id="name">{name}</span>
                <span id="gender">{gender}</span>
                <span id="age">{age}</span>
                <span id="group">{group}</span>
            </div>
            ))}
        </>
    )
}