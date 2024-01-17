import "./BusinessNews.scss";
import axios from "axios";
import React from "react";
import { Button, Card, Pagination } from "react-bootstrap";
import Header from "../Header/Header";
import SpinnerLoading from "../SpinnerLoading/SpinnerLoading";
import Footer from "../Footer/Footer";

const BusinessNews = () => {
  const [spinner, setSpinner] = React.useState(false);
  const [articles, setArticles] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 8;

  /* Get All News */
  React.useEffect(() => {
    const getBusinessNews = async () => {
      setSpinner(true);
      try {
        const response = await axios.get(
          "https://v3.football.api-sports.io/leagues/",
          {
            headers: {
              "x-rapidapi-key": "6bb06592af572ec130509dea4cf1048e",
              "x-rapidapi-host": "v3.football.api-sports.io",
            },
          }
        );
        setArticles(response.data.response);
        console.log(response.data.response)
        setSpinner(false);
      } catch (error) {
        setSpinner(false);
        console.log(error);
      }
    };
    getBusinessNews();
  }, []);

  const totalPages = Math.ceil(articles.length / itemsPerPage);
  const paginationArray = Array.from({ length: totalPages }, (_, i) => i + 1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const articlesToDisplay = articles.slice(startIndex, endIndex);

  const changePage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Header />

      <Pagination size={"sm"} className="pagination">
        <Pagination.Prev
          className="paginationItem"
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {paginationArray.map((page, index) => {
          return (
            <Pagination.Item
              className="paginationItem"
              key={page}
              active={page === currentPage}
              onClick={() => changePage(page)}
            >
              {page}
            </Pagination.Item>
          );
        })}
        <Pagination.Next
          className="paginationItem"
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </Pagination>
      {spinner ? (
        <SpinnerLoading />
      ) : (
        <div className="business-news">
          {articlesToDisplay.map((article, index) => {
            return (
           /*    <Card className="card" key={index}>
                <Card.Img
                  src={article.urlToImage}
                  width={"100%"}
                  height={"50%"}
                />
                <Card.Body className="card-body">
                  <Card.Text>
                    Date :{" "}
                    {article.publishedAt.replace("T", "  -  ").slice(0, -1)}
                  </Card.Text>
                  <Card.Text>Source : {article.source.name}</Card.Text>
                  <Card.Title className="card-img">{article.title}</Card.Title>
                  <Card.Text className="card-text">
                    {article.description}
                  </Card.Text>
                  <Button
                    href={article.url}
                    target="_blank"
                    variant="warning"
                    className="card-button"
                  >
                    READ MORE ...
                  </Button>
                </Card.Body>
                <br />
              </Card> */
              <div></div>
            );
          })}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default BusinessNews;
