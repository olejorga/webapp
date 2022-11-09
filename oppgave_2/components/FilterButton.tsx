import { redirect } from "next/dist/server/api-utils"
import { MutableRefObject, SetStateAction, useState } from "react"
import useFilter from "../hooks/useFilter"

type FilterButtonProps = {
    isFirstRender: MutableRefObject<boolean>,
    setFilterMethod: any,
    filterMethod: String
}

const FilterButton = ({isFirstRender, setFilterMethod, filterMethod}:FilterButtonProps) => {

    const handleSelect = (event: any) => {
        console.log(event.target.value)
        setFilterMethod(event.target.value)
        isFirstRender.current = true
    }

    return (
        <section>
            <label htmlFor="noFilter">Ingen<input name="filter" type="radio" id="noFilter" value="" checked={filterMethod == ""} onChange={handleSelect}/></label>
            <label htmlFor="age">Alder<input name="filter" type="radio" id="age" value="age" onChange={handleSelect}/></label>
            <label htmlFor="gender">Kjønn<input name="filter" type="radio" id="gender" value="gender" onChange={handleSelect}/></label>
            <label htmlFor="group">Klasse<input name="filter" type="radio" id="group" value="group" onChange={handleSelect}/></label>
        </section>
    )
}

export default FilterButton
