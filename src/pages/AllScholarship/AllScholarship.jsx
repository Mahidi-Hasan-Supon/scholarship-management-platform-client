
import React from 'react';
import { useLoaderData } from 'react-router';
import Card from '../ScholarshipCard/Card';

const AllScholarship = () => {
    const scholarships = useLoaderData()
    console.log(scholarships);
    return (
        <div>
           {
            scholarships.map(
                <Card></Card>)
           }
        </div>
    );
};

export default AllScholarship;