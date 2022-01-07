import React, { useState } from 'react'
import './BookModal.css'

let findProduct = (arr, productCode) => {
    return arr.find(product => product.code === productCode)
}

function ReturnModal(props) {
    let rentalDays = props.rentalDays
    let productCode = props.productCode
    let [isConfirmed, setIsConfirmed] = useState(false)
    let [mileage, setMileage] = useState(null)
    let [durability, setDurability] = useState(null)

    let modalContent = ''

    let meterEstimation = () => {
        let productObject = findProduct(props.products, productCode)
        let meter = productObject.mileage + (rentalDays * 10)
        return meter
    }

    let measureDurability = () => {
        let productObject = findProduct(props.products, productCode)
        let productType = productObject.type
        let durability = productObject.max_durability

        if (productType === "meter") {
            durability = durability - (2 * rentalDays) - (2 * meterEstimation)    
        }
        else if (productType === "plain") {
            durability = durability - (1 * rentalDays)
        }

        return durability
    }

    let handleConfirm = (e) => {
        e.preventDefault();
        console.log('Confirm return')
        setIsConfirmed(true)
        setMileage(meterEstimation())
        setDurability(measureDurability())
    }

    let handleCancel = (e) => {
        e.preventDefault()
        setIsConfirmed(false)
        handleReturnConfirm()
        props.onReturnModalCancel()
    }

    let handleReturnConfirm = () => {
        props.onHandleReturnConfirm(productCode, mileage, durability)
    }

    if (isConfirmed) {
        modalContent = <div>
                            <h3>Return confirmed!</h3>
                            <button
                                className="toggle-button" 
                                onClick={handleCancel}>
                                    Close
                            </button>
                        </div>
    }
    else if (props.productCode) {
        let productObject = findProduct(props.products, productCode)
        console.log(productObject)
        modalContent = <form>
                        <h2>{ productObject.name }</h2>
                        <h3>{ 'Used Mileage: ' + meterEstimation() }</h3>
                        <h3>{ 'Durability: ' + measureDurability() }</h3>
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
    else if (!props.productCode) {
        modalContent = <>
                            <h3>You need to book a product.</h3>
                            <button
                            className="toggle-button" 
                            onClick={handleCancel}>
                                Cancel
                            </button>
                        </>
        
    }

    if (!props.showReturnModal) {
        return null
    }

    return(
        <div id="myModal" className="modal">            
            <div className="modal-content">
                <h2>Return Modal</h2>
                { modalContent }
            </div>
        </div>
    )
}

export default ReturnModal