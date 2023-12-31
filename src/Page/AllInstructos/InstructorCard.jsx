import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthProviders/AuthProviders";


const InstructorCard = ({ instructor }) => {
    const [classes, setClasses] = useState([])
    const {user} = useContext(AuthContext)
    useEffect(() => {

        fetch(`https://blitz-camp-server.vercel.app/instructor/classes/${instructor.email}`)
            .then(res => res.json())
            .then(data => {
                const classesFilter = data.filter(df => df.status === 'approve')
                setClasses(classesFilter)
                
            })
    }, [instructor.email])


   
    return (
        <div className="card bg-base-100 w-full group rounded-sm shadow-xl">

            <figure><img className="h-60 w-full transition group-hover:scale-110" src={instructor?.image} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title text-2xl">{instructor?.name}</h2>
              
                <p className="font-semibold text-xl">Email : {instructor?.email}</p>
                <p className="font-semibold text-xl">Total Class : {classes?.length}</p>
                <p className="font-semibold text-xl"><span className="font-bold">Class Names</span>


                    <hr className="w-1/3  ms-3 text-black" />


                    <ul className="text--500 list-decimal">{classes && classes.map(className => <li className="text-sm ms-4 my-1" key={className._id}>{className?.class_name},</li>)}</ul></p>
                <div className="card-actions justify-end">
                    <Link to={`/instructor/all-class`} state={{ email: instructor?.email }} ><button className="btn btn-success">See Classes</button></Link>
                </div>
            </div>
        </div>
    );
};

export default InstructorCard;