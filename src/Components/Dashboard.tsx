import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import { useEffect, useRef, useState } from 'react';
import Grid from '@mui/joy/Grid';
import Button from '@mui/joy/Button';
import Characters from './Characters';
import SearchBar from './SearchBar';
import Card from '@mui/joy/Card';
import { Skeleton } from '@mui/joy';
import Movies from './Movies';

const Skeletons = () => {


    return (
        <Stack direction={"row"} sx={{width:"100%", height:"fit-content"}} alignItems={"center"} justifyContent={"center"} spacing={1}>
            <Skeleton width={300} height={200} sx={{position:"relative"}}/>
            <Skeleton width={300} height={200} sx={{position:"relative"}}/>
            <Skeleton width={300} height={200} sx={{position:"relative"}}/>
            <Skeleton width={300} height={200} sx={{position:"relative"}}/>
            <Skeleton width={300} height={200} sx={{position:"relative"}}/>

        </Stack>
    )

}

const Dashboard = () => {

    const [movies, setMovies] = useState<any[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const TimeoutFetch = useRef<any>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const url = "https://swapi.dev/api/films"

        TimeoutFetch.current = setTimeout(() => {
            fetch(url).then(response => response.json()).then(data => {
                setMovies(data.results);
                setLoading(false);
            })

        }, 1000);

        return () => {
            clearTimeout(TimeoutFetch.current)
        }

    }, []);

    const onSearch = (searchTerm:string) => {

        setSearchTerm(searchTerm.toUpperCase());

    }


        return (
            <Stack direction={"column"} sx={{background:"white", height:"100%", width:"100%"}} spacing={1} position={"relative"} >
                <SearchBar onSearch={onSearch}/>
                <Stack direction={"column"} sx={{width:"100%", height:"100%", overflow:"auto"}} alignItems={"center"}>
                    {loading ? <Skeletons/> : <Movies movies={movies} setModalOpen={setModalOpen} modalOpen={modalOpen} searchTerm={searchTerm}/>}

                </Stack>
            </Stack>  
        )


}

export default Dashboard;