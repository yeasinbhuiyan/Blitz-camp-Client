import { useEffect, useState } from "react";


const PopularInstructorCard = ({ instructor }) => {
    const [classes, setClasses] = useState([])
    useEffect(() => {

        fetch(`http://localhost:5000/instructor/classes/${instructor.email}`)
            .then(res => res.json())
            .then(data => {
                const classesFilter = data.filter(df => df.status === 'approve')
                console.log(classesFilter)
                const totalStudent = classesFilter.reduce((sum , student)=> student.enrolled + sum, 0)
                // cart.reduce((sum, item) => item.price + sum, 0) 
                setClasses(totalStudent)
                // console.log(data)
            })
    }, [instructor.email])
    return (
        <div className="card bg-base-100 w-full rounded-sm shadow-xl">

            <figure><img className="h-60 w-full" src={instructor?.image} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title text-2xl">{instructor?.name}</h2>


                <p className="font-semibold text-xl">Email : {instructor?.email}</p>
                <p className="font-semibold text-xl">Total Class : {classes}</p>


       

            </div>
        </div>
    );
};

export default PopularInstructorCard;