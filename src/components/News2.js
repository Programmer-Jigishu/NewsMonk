import React, { useState, useEffect } from 'react'
import NewsItem from './NewsItem'

import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom';
import InfiniteScroll from "react-infinite-scroll-component";



const News2 = (props) => {

    const { id } = useParams() || { id: null };

    const [language, setLanguage] = useState("en");
    const [articles, setArticles] = useState([]);
    const [nextPages, setNextPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [nextNextPage, setNextNextPage] = useState(null);
    const [numArticles, setNumArticles] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState(null);
    const [category, setCategory] = useState("business,entertainment,politics,world,tourism");


    // next = [0,next,next2,next3,next4,next5]
    // current = next[next.length-1]
    //   


    useEffect(() => {
        const updateComponent = async (item) => {
            //console.log("I am from UpdateComponent useEffect");
            props.reference.current.continuousStart();
            console.log(item);
            setIsLoading(true);
            // if (prevProps.searchQuery !== props.searchQuery) 
            const data = await fetch(`https://newsdata.io/api/1/news?apikey=pub_24055d68feef284a9fa3e4cf430f807bd1a1a&q=${item}&language=${language}`);
            //console.log(data);
            const parsedData = await data.json();

            setArticles(parsedData.results);
            setNextPages([0, parsedData.nextPage]);
            setNumArticles(parsedData.totalResults);
            setCurrentPage(nextPages[0]);
            setIsLoading(false);
            setSearchQuery(item);
            props.reference.current.complete();

        }

        if (props.searchQuery !== "Search" || id) {

            if (id) {
                document.getElementById("newsHeader").textContent="Search Results for:  " + id;
                updateComponent(id);
            } else {
                document.getElementById("newsHeader").textContent="Search Results for:  " + props.searchQuery;
                updateComponent(props.searchQuery);
            }

        }
           // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.searchQuery, id]);


    useEffect(() => {
        const firstLoad = async () => {
            props.reference.current.continuousStart();
            //console.log("I am from firstLoad useEffect");
            setCategory(props.category);
            setIsLoading(true);
            const data = await fetch(`https://newsdata.io/api/1/news?apikey=pub_24055d68feef284a9fa3e4cf430f807bd1a1a&${searchQuery ? "q=" + searchQuery : "category=" + props.category}&country=in&language=${language}`);
            //console.log(data);
            const parsedData = await data.json();

            setNextNextPage(parsedData.nextPage);
            setArticles(parsedData.results);
            setNextPages([0, parsedData.nextPage]);
            setNumArticles(parsedData.totalResults);
            setCurrentPage(nextPages[0]);
            setIsLoading(false);
            props.reference.current.complete();
               // eslint-disable-next-line react-hooks/exhaustive-deps
        }
        !id && firstLoad();
    }, []);



    const previousClick = async () => {
        props.reference.current.continuousStart();
        setIsLoading(true);
        // setCurrentPage(nextPages[nextPages.indexOf(currentPage) - 1]);
        //console.log("I am from previousClick useEffect");
        const newCurrentPage = nextPages[nextPages.indexOf(currentPage) - 1];
        const data = await fetch(`https://newsdata.io/api/1/news?apikey=pub_24055d68feef284a9fa3e4cf430f807bd1a1a&${searchQuery ? "q=" + searchQuery : "category=" + category}&country=in&language=${language}${newCurrentPage ? "&page=" + newCurrentPage : ""}`);
        const parsedData = await data.json();
        setNextNextPage(parsedData.nextPage);
        setCurrentPage(newCurrentPage);
        setArticles(parsedData.results);
        setNextPages(nextPages.splice(0, nextPages.length - 1));
        setIsLoading(false);
        props.reference.current.complete();

    }
    const nextClick = async () => {
        console.log("I am from nextClick and i am triggered");
        props.reference.current.continuousStart();
        setIsLoading(true);
        // Loggging the next page
        //console.log(nextPages.length)
        let newCurrentPage = nextNextPage;
        // Logging the next page
        //console.log("nextPages = ", nextPages);
        //console.log("New Current Page = " + newCurrentPage, typeof (newCurrentPage));
        //console.log("index of Current Page = " + nextPages.indexOf(currentPage));
        try {
            const url = `https://newsdata.io/api/1/news?apikey=pub_24055d68feef284a9fa3e4cf430f807bd1a1a&${searchQuery ? "q=" + searchQuery : "category=" + category}&country=in&language=${language}${newCurrentPage ? "&page=" + newCurrentPage : ""}`;
            const data = await fetch(url);
            const parsedData = await data.json();

            setNextNextPage(parsedData.nextPage);

            setNextPages([...nextPages, parsedData.nextPage]);

            setCurrentPage(newCurrentPage);
            setArticles(parsedData.results);
            setIsLoading(false);
            props.reference.current.complete();
            //console.log(parsedData, "I am in the nextClick Try");
        } catch (error) {
            console.log("Failed to fetch from API!!");
            setIsLoading(false);
        }
    };


    const fetchMoreData = () => {
        console.log("I am from fetchMore and i am triggered");
        props.reference.current.continuousStart();
        setIsLoading(true);
        let newCurrentPage = nextNextPage;
        const nextClickFetchMore = async (newCurrentPage) => {

            try {
                const url = `https://newsdata.io/api/1/news?apikey=pub_24055d68feef284a9fa3e4cf430f807bd1a1a&${searchQuery ? "q=" + searchQuery : "category=" + category}&country=in&language=${language}${newCurrentPage ? "&page=" + newCurrentPage : ""}`;
                const data = await fetch(url);
                const parsedData = await data.json();

                setNextNextPage(parsedData.nextPage);

                setNextPages([...nextPages, parsedData.nextPage]);

                setCurrentPage(newCurrentPage);
                setArticles([...articles, ...parsedData.results]);
                setIsLoading(false);
                props.reference.current.complete();

            } catch (error) {
                console.log("Failed to fetch from API!!");
                setIsLoading(false);
            }
        }

        nextClickFetchMore(newCurrentPage);
    }

    return (
        <>
            <div className='align-content-center align-self-center'>
                {/* {isLoading && <Spinner />} */}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length!==numArticles}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                        <p style={{ textAlign: "center" }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                >

                    <div className="container row">
                        {articles.map((element) => {
                            return (
                                <div key={element.url + element.title.slice(0, 5) + Math.round(Math.random() * 1000)} className="col-md-4">
                                    <NewsItem key={element.link} link={element.link} title={element.title} description={element.description} author={element.source_id} datePublished={element.pubDate} urlToImage={element.image_url} />
                                </div>)
                        })}
                    </div>



                </InfiniteScroll>

            </div>

            {/* ChangePage Buttons */}
            {/* <div className="container d-flex justify-content-between">
                <button disabled={nextPages.length <= 2} onClick={previousClick} className="btn btn-primary">Previous  &#8592;</button>
                <button disabled={nextPages.length === Math.ceil(numArticles / 10)} onClick={nextClick} className="btn btn-primary">Next  &#8594;</button>
            </div> */}
        </>
    )



}
News2.defaultProps = {
    category: "business,entertainment,politics,world,tourism"
}
//set default props type
News2.propTypes = {
    category: PropTypes.string
}




export default News2