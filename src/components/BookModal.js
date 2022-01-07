import React, { useState } from 'react'
import './BookModal.css'

let getCurrentDate = () => {
    let today = new Date()
    let dd = today.getDate()
    let mm = today.getMonth() + 1 //As January is 0.
    let yyyy = today.getFullYear()

    if(dd < 10) 
        dd = '0' + dd
    if(mm < 10) 
        mm = '0' + mm
        return (dd + '-' + mm + '-' + yyyy)

}

let findProduct = (arr, productCode) => {
    return arr.find(product => product.code === productCode)
}

function BookModal(props) {
    let [product, setProduct] = useState(props.products[0].code)
    let [toDate, setToDate] = useState(null)
    let [fromDate, setFromDate] = useState(null)
    let [isConfirmed, setIsConfirmed] = useState(false)
    let [bookNow, setBookNow] = useState(false)
    let [bookingConfirmed, setBookingConfirmed] = useState(false)
    let [message, setMessage] = useState('')

    let modalContent = ''

    let options = props.products.map((product, index) => {
        return (
            <option key={index} value={product.code}>{product.name + '\\' + product.code}</option>
        )
    })

    let handleConfirm = (e) => {
        e.preventDefault()
        console.log(numberOfDaysForRent())
        setIsConfirmed(true)
        console.log('Confirming booking')
        
        let days = numberOfDaysForRent() 
        let productObject = findProduct(props.products, product)
        
        let rentalPrice = days * productObject.price
        let text = ''

        if (days > productObject.minimum_rent_period) {
            if (!productObject.discount) {
                let discount = 0
                rentalPrice = rentalPrice - (discount * rentalPrice)
                text = 'Your estimated price is: $' + rentalPrice
                setBookNow(true)
            }
            else {
                rentalPrice = rentalPrice - (!productObject.discount * rentalPrice)
                text = 'Your estimated price is: $' + rentalPrice
                setBookNow(true)
            }
            if (!productObject.discount && productObject.minimum_rent_period) {
                if (days < productObject.minimum_rent_period) {
                    text = 'You need to book ' + productObject.name + '\\' + productObject.code + ' for more than ' + productObject.minimum_rent_period + ' days.'
                }
            }
        }
        
        setMessage(text)
        props.onHandleConfirm(product, days)
    }

    let handleCancel = (e) => {
        e.preventDefault()
        setProduct('')
        setToDate(null)
        setFromDate(null)
        setIsConfirmed(false)
        setBookNow(false)
        props.onBookModalCancel()
    }

    let handleChange = (e) => {
        setProduct(e.target.value)
    }

    let handleToDateChange = (e) => {
        setToDate(e.target.value)
    }

    let handleFromDateChange = (e) => {
        setFromDate(e.target.value)
    }

    let handleConfirmBooking = (e) => {
        setBookingConfirmed(true)
        setBookNow(false)
    }

    let numberOfDaysForRent = () => {
        let to = new Date(toDate)
        let from = new Date(fromDate)

        // To calculate the time difference of two dates
        let diffInTime = from.getTime() - to.getTime();
  
        // To calculate the no. of days between two dates
        var days = diffInTime / (1000 * 3600 * 24)
        return days
    }
    
    if (isConfirmed) {
        modalContent = <div>
                            <p>{message}</p>
                            { bookNow &&
                                <button
                                    className="toggle-button" 
                                    onClick={handleConfirmBooking}>
                                        Confirm Booking
                                </button>
                            }
                            { bookingConfirmed &&
                                <>
                                    <h3>Booking Confirmed!</h3>
                                    <button
                                        className="toggle-button" 
                                        onClick={handleCancel}>
                                            Close
                                    </button>
                                </>
                                
                            }
                        </div>
    }
    else {
        modalContent = <form>
                        <select value={product} onChange={handleChange}>
                                {options}
                            </select>
                            <input 
                                onChange={handleToDateChange}
                                type="date" 
                                id="todate" 
                                name="date"
                                value={toDate}
                                min={getCurrentDate()}></input>
                            <input 
                                onChange={handleFromDateChange}
                                type="date" 
                                id="fromdate" 
                                name="date"
                                value={fromDate}
                                min={getCurrentDate()}></input>
                            <button 
                                onClick={handleConfirm}
                                type="submit"
                                className="toggle-button">
                                    Confirm
                            </button>
                            <button
                                className="toggle-button" 
                                onClick={handleCancel}>
                                    Cancel
                            </button>
                        </form>
    }

    if (!props.showBookModal) {
        return null
    }

    return(
        <div id="myModal" className="modal">            
            <div className="modal-content">
                <h2>Book a product</h2>
                <div>
                    { modalContent }
                </div>
            </div>
        </div>
    )
}

export default BookModal