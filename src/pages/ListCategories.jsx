import React, { useState, useEffect } from 'react'
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import Grid from '@mui/material/Grid';

function ListCategories() {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const [problems, setProblems] = useState([]);
    const [categories, SetCategories] = useState([]);
    
    // fetch problems
    useEffect(() => {
        const fetchCategories = async () => {
          const token = localStorage.getItem("userToken");
    
          if (!token) {
            throw new Error("Missing token");
          }
    
          const response = await fetch(`${API_BASE_URL}/problem`, {
            headers: {
              Authorization: `${token}`,
            },
          });
          const data = await response.json();
          setProblems(data);
        };
        fetchCategories();
      }, []);

      //fetch distinct categories from problems 
      useEffect(() => {
        const uniqueCategories = Array.from(
          new Set(problems.flatMap(problem => problem.categories))
        );
        SetCategories(uniqueCategories);
      }, [problems]);

  return (
    <>
    <div className='p-32'>
        <div className='m-8'>
            <Typography gutterBottom variant="h4" component="div">
                Explore Categories
            </Typography>
        </div>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {categories.map((category, index) => (
                <Grid item xs={2} sm={4} md={4} key={index}>
                    <Card sx={{ width: '100%' }}>
                        <CardActionArea>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {category}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            ))}
        </Grid>
    </div>
    </>
  )
}

export default ListCategories
