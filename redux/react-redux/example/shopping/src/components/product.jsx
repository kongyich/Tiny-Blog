import React from "react"
import { connect } from "react-redux"

const Product = ({ products }) => {
  return  (<section className="container content-section">
  <h2 className="section-header">商品列表</h2>

  <div>
    {products}
  </div>

  <div className="shop-items">
      <div className="shop-item">
          <img className="shop-item-image" src="images/01.webp" />
          <span className="shop-item-title">小户型简约现代网红双人三人客厅科技布免洗布艺</span>
          <div className="shop-item-details">
              <span className="shop-item-price">￥1020</span>
              <button className="btn btn-primary shop-item-button" type="button">加入购物车</button>
          </div>
      </div>
      <div className="shop-item">
          <img className="shop-item-image" src="images/02.webp"/>
          <span className="shop-item-title">11全网通4G手机官方iPhonexr</span>
          <div className="shop-item-details">
              <span className="shop-item-price">￥4758</span>
              <button className="btn btn-primary shop-item-button"type="button">加入购物车</button>
          </div>
      </div>
      <div className="shop-item">
          <img className="shop-item-image" src="images/03.webp"/>
          <span className="shop-item-title">潮休闲网红小西服套装英伦风春装</span>
          <div className="shop-item-details">
              <span className="shop-item-price">￥59</span>
              <button className="btn btn-primary shop-item-button" type="button">加入购物车</button>
          </div>
      </div>
      <div className="shop-item">
          <img className="shop-item-image" src="images/04.webp" />
          <span className="shop-item-title">夏新27英寸超薄曲面高清电脑</span>
          <div className="shop-item-details">
              <span className="shop-item-price">￥369</span>
              <button className="btn btn-primary shop-item-button" type="button">加入购物车</button>
          </div>
      </div>
  </div>
</section>)
}

const mapStateToProps = state => ({
  products: state.products
})

export default connect(mapStateToProps)(Product)
