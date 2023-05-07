import React from "react"

const Cart = () => {
  return <section className="container content-section">
            <h2 className="section-header">购物车</h2>
            <div className="cart-row">
                <span className="cart-item cart-header cart-column">商品</span>
                <span className="cart-price cart-header cart-column">价格</span>
                <span className="cart-quantity cart-header cart-column">数量</span>
            </div>
            <div className="cart-items">
                <div className="cart-row">
                    <div className="cart-item cart-column">
                        <img className="cart-item-image" src="images/01.webp" width="100" height="100" />
                        <span className="cart-item-title">小户型简约现代网红双人三人客厅科技布免洗布艺</span>
                    </div>
                    <span className="cart-price cart-column">￥1020</span>
                    <div className="cart-quantity cart-column">
                        <input className="cart-quantity-input" type="number" />
                        <button className="btn btn-danger" type="button">删除</button>
                    </div>
                </div>
                <div className="cart-row">
                    <div className="cart-item cart-column">
                        <img className="cart-item-image" src="images/02.webp" width="100" height="100"/>
                        <span className="cart-item-title">11全网通4G手机官方iPhonexr</span>
                    </div>
                    <span className="cart-price cart-column">￥4758</span>
                    <div className="cart-quantity cart-column">
                        <input className="cart-quantity-input" type="number" />
                        <button className="btn btn-danger" type="button">删除</button>
                    </div>
                </div>
            </div>
            <div className="cart-total">
                <strong className="cart-total-title">总价</strong>
                <span className="cart-total-price">￥39.97</span>
            </div>
        </section>
}

export default Cart
