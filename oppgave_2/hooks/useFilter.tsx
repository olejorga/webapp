import { useRef, useState } from "react";
import { Student } from "../types";

export default function useFilter() {
    const isFirstRender = useRef(true)
    const [students, setStudents] = useState<Student[] | undefined>(undefined)
    const [filterMethod, setFilterMethod] = useState("")
    
      const generateFilter = (filterMethod: string, students: Student[]): string[] => {
        let currentFilter = [""]
        console.log(filterMethod)
        switch(filterMethod){
          case "age":
              currentFilter[0] = "alder"
              students?.forEach(({ age }) => {
                if (!currentFilter.includes(age.toString())) {
                    currentFilter.push(age.toString())
                  }
              })
              break;
              case "group":
              currentFilter[0] = "klasse";
              students?.forEach(({ group }) => {
                  if (!currentFilter.includes(group.toString())) {
                      currentFilter.push(group.toString())
                    }
                })
              break;
          case "gender":
              currentFilter[0] = "kjønn"
              students?.forEach(({ gender }) => {
                  if (!currentFilter.includes(gender.toString())) {
                      currentFilter.push(gender.toString())
                    }
                })
              break;
          }
          return currentFilter
      }
    
    
    return {
        isFirstRender,
        students,
        setStudents,
        filterMethod,
        setFilterMethod,
        generateFilter
    }
}