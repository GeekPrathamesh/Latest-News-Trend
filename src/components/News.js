import React, { Component } from "react";
import PropTypes from "prop-types";
import Newsitem from "./Newsitem";
import Spin from "./Spin";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static propTypes = {
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  static defaultProps = {
    pageSize: 12,
    category: "general",
  };

  capitalize(word) {
    if (!word) return "";
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  constructor(props) {
    super(props);
    console.log("this is constructor");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: null,
    };
    document.title = `${this.capitalize(
      this.props.category
    )} - News-Trend Web-App`;
  }

  fetchNews = async () => {
    this.props.updateProgress(10)
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    this.setState({ loading: true });
            this.props.updateProgress(70)

    let data = await fetch(url);
        this.props.updateProgress(80)

    data = await data.json();
    this.props.updateProgress(90)

    this.setState({
      articles: data.articles,
      totalResults: data.totalResults,
      loading: false,
    });
        this.props.updateProgress(100)

  };

  componentDidMount() {
    this.fetchNews();
  }

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
  fetchMoreData=async()=> {
    // this.fetchNews();  not possible because we want to concat the articles

    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${
      this.props.category
    }&apiKey=${this.props.apiKey}&page=${
      this.state.page + 1
    }&pagesize=${this.props.pageSize}`;
    let data = await fetch(url);
    data = await data.json();

if (!data.articles || data.articles.length === 0) {
  this.setState({ totalResults: this.state.articles.length });
  return;
}

    this.setState({
      articles: this.state.articles.concat(data.articles),
      totalResults: data.totalResults,
      page: this.state.page + 1,
    });
  }

  render() {
    return (
      <><div style={{marginTop:"70px"}}>
          <h1 className=" text-center">
            News-Trend <u>{this.capitalize(this.props.category)}</u> category
            News
          </h1>
          {/* {this.state.loading && <Spin />} */}
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Spin />}
          >
<div className="container">           <div className="row">
              {this.state.articles.map((element) => {
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
            </div></div> 
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
  }
}

export default News;
