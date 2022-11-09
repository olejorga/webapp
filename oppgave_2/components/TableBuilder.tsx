import { useEffect, useRef } from "react"
import useFilter from "../hooks/useFilter"
import { Student } from "../types"
import StudentTable from "./StudentTable"

const classes = [{id: 1, subject: "informasjonssystemer"}, {id: 2, subject: "Informatikk"}, {id: 3, subject: "Digitale medier og design"}]

type TableBuilderProps = {
  students: Student[] | undefined
}

const TableBuilder = ({students}: TableBuilderProps)  => {
    
    console.log(students)
    if(students == undefined) return null
    return (
        <>
        {classes.map(({id, subject}) => (
            <div key={id}>
                <h1>{subject}</h1>
                <ul className="studentTable">
                    <StudentTable students={students} filterMethod={""} />
                </ul>
            </div>
        ))}
        </>
    )
}

export default TableBuilder