import { Stack } from "@mui/joy";
import { useEffect, useState } from "react";
import Input from "@mui/joy/Input";
import { useRef } from "react";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";

interface SearchBarProps {
    onSearch: (searchTerm:string) => void;
}

const SearchBar = (props:SearchBarProps) => {

    const {onSearch} = props;

    const [searchTerm, setSearchTerm] = useState<string>("");

    useEffect(() => {

        onSearch(searchTerm);

    }, [searchTerm]);

    return (
        <Stack direction={"row"} sx={{background:"beige", height:"10%", width:"100%"}} alignItems={"center"} justifyContent={"center"} >
            <Input type="text" onChange={(e) => setSearchTerm(e.target.value)}/>
            <DrillDown/>
        </Stack>
    )

}

export default SearchBar;

const DrillDown = () => {

    const fetchTimeout = useRef<any>();
    const [resources, setResources] = useState<any[]>([]);

    useEffect(() => {

        fetchTimeout.current = setTimeout(() => {

            fetch("https://swapi.dev/api").then(response => response.json()).then(data => {
                setResources(Object.keys(data));
            })

        }, 1000);

        return () => {
            clearTimeout(fetchTimeout.current);
        }

    }, []);

    return(
        <Select placeholder="other Resources">
            {resources.map((resource, index) => {
                return <Option value={resource} key={index}>{resource}</Option>
            })}
        </Select>
    )

}