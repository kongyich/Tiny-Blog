import React, {useEffect} from "react"
import { connect } from "react-redux"
import { bindActionCreators } from 'redux'
import * as cartActions from '../store/actions/cart.action'

const Cart = ({ carts, loadCarts }) => {
    useEffect(() => {
        loadCarts()
    }, [])
  return <section className="container content-section">
            <h2 className="section-header">购物车</h2>
            <div className="cart-row">
                <span className="cart-item cart-header cart-column">商品</span>
                <span className="cart-price cart-header cart-column">价格</span>
                <span className="cart-quantity cart-header cart-column">数量</span>
            </div>
            <div className="cart-items">
            {
                carts.map((item) => {
                    return (
                        <div key={item.id} className="cart-row">
                    <div className="cart-item cart-column">
                        <img className="cart-item-image" src={item.thumbnail} width="100" height="100" />
                        <span className="cart-item-title">{ item.title }</span>
                    </div>
                    <span className="cart-price cart-column">￥{item.price}</span>
                    <div className="cart-quantity cart-column">
                        <input className="cart-quantity-input" type="number" />
                        <button className="btn btn-danger" type="button">删除</button>
                    </div>
                </div>
                    )
                })
            }
                
            </div>
            <div className="cart-total">
                <strong className="cart-total-title">总价</strong>
                <span className="cart-total-price">￥39.97</span>
            </div>
        </section>
}


const mapStateToProps = state => ({
    carts: state.cart,
  })


  const mapDispatchToProps = dispatch => ({
    ...bindActionCreators(cartActions, dispatch)
})
  
  export default connect(mapStateToProps, mapDispatchToProps)(Cart)
