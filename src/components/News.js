import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import Newsitem from "./Newsitem";
import Spin from "./Spin";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, updatedarticles] = useState([]);
  const [loading, isloading] = useState(false);
  const [page, updatepage] = useState(1);
  const [totalResults, updatedtotalResults] = useState(null);

  const capitalize = (word) => {
    if (!word) return "";
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  // constructor(props) {
  //   super(props);
  //   console.log("this is constructor");
  //   this.state = {
  //     articles: [],
  //     loading: false,
  //     page: 1,
  //     totalResults: null,
  //   };

  // }

  const fetchNews = async () => {
    props.updateProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pagesize=${props.pageSize}`;
    isloading(true);
    props.updateProgress(70);

    let data = await fetch(url);
    props.updateProgress(80);

    data = await data.json();
    props.updateProgress(90);

    updatedarticles(data.articles);
    updatedtotalResults(data.totalResults);
    isloading(false);

    props.updateProgress(100);
  };

  useEffect(() => {
    fetchNews();
    document.title = `${capitalize(props.category)} - News-Trend Web-App`;
  }, []);
  // handleNext = async () => {
  //   // let url = `https://newsapi.org/v2/top-headlines?country=us&category=${
  //   //   this.props.category
  //   // }&apiKey=${props.apiKey}&page=${
  //   //   this.state.page + 1
  //   // }&pagesize=${this.props.pageSize}`;
  //   // this.setState({ loading: true });

  //   // let data = await fetch(url);
  //   // data = await data.json();

  //   // this.setState({
  //   //   articles: data.articles,
  //   //   page: this.state.page + 1,
  //   //   loading: false,
  //   // });

  //   this.setState({ page: this.state.page + 1 });
  //   this.fetchNews();
  // };
  // handlePrev = async () => {
  //   // let url = `https://newsapi.org/v2/top-headlines?country=us&category=${
  //   //   this.props.category
  //   // }&apiKey=${props.apiKey}&page=${
  //   //   this.state.page - 1
  //   // }&pagesize=${this.props.pageSize}`;
  //   // this.setState({ loading: true });

  //   // let data = await fetch(url);
  //   // data = await data.json();

  //   // this.setState({
  //   //   articles: data.articles,
  //   //   page: this.state.page - 1,
  //   //   loading: false,
  //   // });
  //   this.setState({ page: this.state.page - 1 });
  //   this.fetchNews();
  // };
  const fetchMoreData = async () => {
    // this.fetchNews();  not possible because we want to concat the articles

    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${
      props.category
    }&apiKey=${props.apiKey}&page=${page + 1}&pagesize=${props.pageSize}`;
    let data = await fetch(url);
    data = await data.json();

    if (!data.articles || data.articles.length === 0) {
      updatedtotalResults(articles.length);
      return;
    }

    updatedarticles(articles.concat(data.articles));
    updatedtotalResults(data.totalResults);
    updatepage(page + 1);
  };

  return (
    <>
      <div style={{ marginTop: "70px" }}>
        <h1 className=" text-center">
          News-Trend <u>{capitalize(props.category)}</u> category News
        </h1>
        {/* {this.state.loading && <Spin />} */}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
           loader={<Spin />}
         
        >
          <div className="container">
            <div className="row">
              {articles.map((element) => {
                return (
                  <div className="col-md-4 my-3" key={element.url}>
                    <Newsitem
                      title={element.title}
                      description={
                        element.description
                          ? element.description.slice(0, 90)
                          : "unDescripted"
                      }
                      imgUrl={element.urlToImage}
                      url={element.url ? element.url : "/"}
                      author={element.author}
                      publishedAt={element.publishedAt}
                      badge={
                        element.source.name ? element.source.name : "unknown"
                      }
                    />
                  </div>
                );
              })}
            </div>

{/* {loading ? <Spin /> :  articles.length < totalResults && (   <div className="container text-center my-5" onClick={fetchMoreData}><button type="button" className="btn btn-success">Load more..</button></div>)      
} */}
          </div>
        </InfiniteScroll>

        {/* <div className="container d-flex justify-content-between my-4">
          <button
            type="button mx-4"
            className="btn btn-dark"
            disabled={this.state.page <= 1}
            onClick={this.handlePrev}
          >
            &larr; Previous
          </button>
          <button
            type="button mx-4"
            className="btn btn-dark"
            disabled={
              Math.ceil(this.state.totalResults / this.props.pageSize) ===
              this.state.page
            }
            onClick={this.handleNext}
          >
            Next &rarr;
          </button>
        </div> */}
      </div>
    </>
  );
};

News.propTypes = {
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
News.defaultProps = {
  pageSize: 12,
  category: "general",
};
export default News;
