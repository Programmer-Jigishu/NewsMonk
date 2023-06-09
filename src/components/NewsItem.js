import React from 'react';

const NewsItem = (props) => {

  const { title, description, link, urlToImage, author, datePublished } = props;
  return (
    <div className="card jigishu-card" style={{margin: "10px"}} >
      <div>
      <img src={!urlToImage ? "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" : urlToImage} className="card-img-top" alt="..." />
      <span className="badge rounded-pill bg-danger" style={{
    position: "absolute",
    top: "0",
    right: "0",
}}>
      By-&nbsp;{author}
        <span class="visually-hidden"></span>
      </span>
      </div>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">on {new Date(datePublished).toLocaleDateString()} at {new Date(datePublished).toLocaleTimeString()} </p>
        <p className="card-text jigishu-description" style={{ fontFamily:"sans-serif"  }}>{description ? (description.length < 150 ? description : description.slice(0, 150) + "...") : ""}</p>
        <a href={link} className="btn btn-primary">Read More...</a>
      </div>



     
    </div>

  );

}

export default NewsItem;
