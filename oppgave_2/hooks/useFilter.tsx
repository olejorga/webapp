import { useRef, useState } from "react";
import { Student } from "../types";

export default function useFilter() {
    const isFirstRender = useRef(true)
    const [students, setStudents] = useState<Student[] | undefined>(undefined)
    const [filterMethod, setFilterMethod] = useState("")
    return {
        isFirstRender,
        students,
        setStudents,
        filterMethod,
        setFilterMethod
    }
}