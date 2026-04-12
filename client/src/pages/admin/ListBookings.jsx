import React, { useEffect, useState } from 'react'
import { dummyBookingData } from '../../assets/assets'
import Title from '../../components/admin/Title'
import { dateFormat } from '../../lib/dateFormat'

function ListBookings() {
    const currency = import.meta.env.VITE_CURRENCY

    const [bookings, setBookings] = useState([])
    const [isLoading, setIsLoading] = useState(true)

   const getBookings = async () => {
    console.log('data:', dummyBookingData)  // add this line
    setBookings(dummyBookingData)
    setIsLoading(false)
}
    useEffect(() => {
        getBookings()
    }, [])

    return !isLoading ? (
        <>
            <Title text1="List" text2="Bookings" />
            <div className="max-w-4xl mt-6 overflow-x-auto">
                <table className="w-full border-collapse rounded-md overflow-hidden text-nowrap">
                    <thead>
                        <tr className="bg-primary/20 text-left text-white">
                            <th className="p-2 font-medium pl-5">User Name</th>
                            <th className="p-2 font-medium">Movie Name</th>
                            <th className="p-2 font-medium">Show Time</th>
                            <th className="p-2 font-medium">Seats</th>
                            <th className="p-2 font-medium">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm font-light text-gray-300">
                        {bookings.map((booking, index) => (
                            <tr key={index} className="border-b border-primary/10 bg-primary/5 even:bg-primary/10">
                                <td className="p-2 pl-5">{booking.user?.name || 'N/A'}</td>
                                <td className="p-2">{booking.show?.movies?.title || 'N/A'}</td>
                                <td className="p-2">{dateFormat(booking.show?.showDateTime)}</td>
                                <td className="p-2">{booking.bookedSeats?.length}</td>
                                <td className="p-2">{currency} {booking.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    ) : (
        <div className="flex items-center justify-center h-screen">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
    )
}

export default ListBookings