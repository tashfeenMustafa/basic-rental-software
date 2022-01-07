import React, { useState } from 'react'
import TableHead from './TableHead.js'
import BookButton from './BookButton.js'
import ReturnButton from './ReturnButton.js'
import Search from './Search.js'
import BookModal from './BookModal.js'
import ReturnModal from './ReturnModal.js'
import './Table.css';

function Table(props) {
    let [products, setProducts] = useState(props.jsonData)
    let [search, setSearch] = useState('')
    let filteredProducts = products.filter((product) => product.name.toLowerCase().includes(search.toLowerCase()))
    let [showBookModal, setShowBookModal] = useState(false)
    let [showReturnModal, setShowReturnModal] = useState(false)
    let [rentalDays, setRentalDays] = useState(0)
    let [productCode, setProductCode] = useState('')

    let row = filteredProducts.map((product, index) => {
        return (
            <tr key={index}>
                <td>{ index + 1 }</td>
                <td>{ product.name }</td>
                <td>{ product.nacodeme }</td>
                <td>{ product.availability ? 'Yes' : 'No' }</td>
                <td>{ product.needing_repair ? 'Yes' : 'No' }</td>
                <td>{ product.durability + '/' + product.max_durability }</td>
                <td>{ product.mileage ? product.mileage : '0' }</td>
            </tr>   
        )
    })

    let onSearch = (value) => {
        console.log(value)
        setSearch(value)
    }

    let onBook = () => {
        console.log('book modal: open')
        setShowBookModal(true)
    }

    let onBookModalCancel = () => {
        console.log('book modal: close')
        setShowBookModal(false)
    }

    let onReturn = () => {
        console.log('return modal: open')
        setShowReturnModal(true)
    }

    let onReturnModalCancel = () => {
        console.log('return modal: close')
        setShowReturnModal(false)
    }

    let onHandleBookingConfirm = (productCode, days) => {
        console.log(productCode, days)
        setRentalDays(days)
        setProductCode(productCode)
    }

    let onHandleReturnConfirm = (productCode, mileage, durability) => {
        console.log(productCode, mileage, durability)
    }

    return (
        <div>
            <Search 
                searchValue={search}
                onSearch={onSearch}
            />
            <table>
                <TableHead />
                <tbody>
                    { row }
                </tbody>
            </table>
            <div>
                <BookButton
                    onBook={onBook} />
                <ReturnButton 
                    onReturn={onReturn} />
            </div>
            <BookModal 
                products={products}
                showBookModal={showBookModal} 
                onBookModalCancel={onBookModalCancel} 
                onHandleConfirm={onHandleBookingConfirm} />
            <ReturnModal 
                products={products}
                productCode={productCode}
                rentalDays={rentalDays}
                showReturnModal={showReturnModal}
                onReturnModalCancel={onReturnModalCancel}
                onHandleReturnConfirm={onHandleReturnConfirm} />
        </div>  
    );
}

export default Table;