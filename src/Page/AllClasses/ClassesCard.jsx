import { useContext } from "react";
import { AuthContext } from "../../AuthProviders/AuthProviders";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useStatus from "../../Hook/useStatus";
import useAxiosSecure from "../../Hook/useAxiosSecure";



const ClassesCard = ({ singleClass }) => {
    const { user } = useContext(AuthContext)
    const [axiosSecure] = useAxiosSecure()
    const navigate = useNavigate()
    const { status } = useStatus()

    const { class_image, class_name, instructor_name, instructor_email, available_seats, price, enrolled, feedback } = singleClass


    const handleSelect = (singleClass) => {
        if (!user) {
            return navigate('/login')
        }
        const selectDetails = {
            email: user?.email,
            instructor_name: singleClass.instructor_name,
            instructor_email: singleClass.instructor_email,
            class_name: singleClass.class_name,
            class_id: singleClass._id,
            enrolled: singleClass.enrolled,
            price: singleClass.price,
            available_seats: singleClass.available_seats
        }

        axiosSecure.post('https://blitz-camp-server.vercel.app/select-class', selectDetails)

            .then(data => {
                if (data.data.acknowledged) {
                    Swal.fire(
                        'Selected!',
                        'Successfully Selected this class',
                        'success'
                    )
                }
            })



    }

    return (
        <div className={available_seats === 0 ? `border-2 border-red-500` : ''}>
            <div className="card  w-full bg-base-100  rounded-sm group shadow-xl">

                <figure><img className="h-60 w-full transition group-hover:scale-110" src={class_image} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title text-2xl">{class_name}</h2>
                    <h2 className="card-title">Instructor: {instructor_name}</h2>

                    <p className="font-semibold text-xl">Available Seat : {available_seats}</p>
                    <p className="font-semibold text-xl">Enrolled : {enrolled}</p>
                    <p className="font-semibold text-2xl">Price: <span className="text-yellow-500">${price}</span></p>
                    <div className="card-actions justify-end">
                        <button disabled={status === 'instructor' || status === 'admin' || available_seats === 0} onClick={() => handleSelect(singleClass)} className="btn btn-success">Select</button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ClassesCard;