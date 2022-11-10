import { useRef, useState } from "react";
import { Student } from "../types";

export default function useFilter() {
    const isFirstRender = useRef(true)
    const [students, setStudents] = useState<Student[] | undefined>(undefined)
    const [filterMethod, setFilterMethod] = useState("")
    
    const sortStudents = (students: Student[]): Student[] =>{
        // Kode lånt fra https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
        let sortedStudents: Student[]
        switch(filterMethod){ 
          case "age": 
            sortedStudents = students?.sort((a, b) => {
              if(a.age < b.age) return -1
              if(a.age > b.age) return 1
              return 0
            })
            case "gender": 
            sortedStudents = students?.sort((a, b) => {
              if(a.gender.toLowerCase() < b.gender.toLowerCase()) return -1
              if(a.gender.toLowerCase() > b.gender.toLowerCase()) return 1
              return 0
            })
            case "group": 
            sortedStudents = students?.sort((a, b) => {
              if(a.group.toLowerCase() < b.group.toLowerCase()) return -1
              if(a.group.toLowerCase() > b.group.toLowerCase()) return 1
              return 0
            })
            default: 
            sortedStudents = students?.sort((a, b) => {
              if(a.name.toLowerCase() < b.name.toLowerCase()) return -1
              if(a.name.toLowerCase() > b.name.toLowerCase()) return 1
              return 0
            })
          }
          return sortedStudents
      } 
    
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
        sortStudents,
        generateFilter
    }
}