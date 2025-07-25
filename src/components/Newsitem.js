import React, { Component } from "react";

export default class Newsitem extends Component {
  render() {
    let { title, description, imgUrl, url, author, publishedAt , badge} = this.props;
    return (
      <div>
        <div className="card">
          <div style={{display:"flex",
            justifyContent:"flex-end",
            position:"absolute",
            right:" 0%",
          }}><span className="badge rounded-pill bg-success">
            {badge}
          </span></div>
          <img
            src={
              imgUrl
                ? imgUrl
                : "https://www.citypng.com/public/uploads/preview/transparent-hd-newspaper-news-press-white-icon-701751695035114rnurowkkmr.png"
            }
            className="card-img-top"
            alt="..."
          />

          <div className="card-body">
            <h5 className="card-title">{title ? title : "unTitled"}</h5>
            <p className="card-text">{description}</p>
            <a href={url} className="btn btn-dark btn-sm">
              Read More
            </a>
            <p className="card-text my-2">
              <small className="text-danger">{`by the ${
                author ? author : "unknown"
              } | ${
                publishedAt ? new Date(publishedAt).toGMTString() : ""
              }`}</small>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
